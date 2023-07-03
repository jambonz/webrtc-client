import {LitElement, html, css} from 'lit-element';
import {SipUA} from "../lib";
import {SipConstants} from "../lib";

class Phone extends LitElement {
    static styles = css`
      .number-display {
        margin: auto;
        width: 200px;
        padding: 20px;
        border: solid 1px #333;
        border-radius: 5px;
        text-align: center;
        font-size: 20px;
        background-color: #f1f1f1;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
      }

      .number-input-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;
      }

      .number-label {
        width: 20%;
        text-align: right;
        padding-right: 10px;
        font-weight: bold;
      }

      .number-input {
        width: 70%;
        padding: 5px;
        border: none;
        border-radius: 3px;
        box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
      }

      .dial-pad {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
        max-width: 200px;
        margin: auto;
        margin-top: 20px;
      }

      .num-button,
      .call-button {
        padding: 10px;
        background-color: #fafafa;
        border: none;
        border-radius: 5px;
        text-align: center;
        font-size: 20px;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }

      .num-button:hover,
      .call-button:hover {
        background-color: #e1e1e1;
        transform: scale(1.05);
      }

      .call-button {
        margin-top: 20px;
        background-color: green;
        color: white;
      }
    `;

    static get properties() {
        return {
            props: {type: Object},
            toNumber: {type: String}
        };
    }

    constructor() {
        super();
        this.props = {};
        this.toNumber = '';
        this.sipClient = this._createSipClient();
    }

    render() {
        return html`
            <div class="number-display">
                <div class="number-input-container">
                    <label class="number-label">From</label>
                    <input type="text" class="number-input" placeholder="Enter number here" disabled
                           .value="${this.props.caller}"/>
                </div>
                <div class="number-input-container">
                    <label class="number-label">To</label>
                    <input type="text" class="number-input" placeholder="Enter number here" .value="${this.toNumber}"
                           @input="${this._handleInput}"/>
                </div>
            </div>

            <div class="dial-pad">
                ${Array(12).fill(0).map((_, index) => {
                    let displayNum;
                    if (index === 9) displayNum = "*";
                    else if (index === 10) displayNum = 0;
                    else if (index === 11) displayNum = "#";
                    else displayNum = index + 1; // 1-9

                    return html`
                        <button
                                class="num-button"
                                @click="${() => this._handleClick(displayNum)}"
                        >
                            ${displayNum}
                        </button>
                    `;
                })}
            </div>

            <button class="call-button" @click="${this._handleCall}">
                Call
            </button>
        `;
    }

    _createSipClient() {
        const client = {
            username: "xxx@jambonz.org",
            password: "1234",
            name: "Antony Jukes"
        }
        const settings = {
            pcConfig: {
                iceServers: [{urls: ['stun:stun.l.google.com:19302']}],
            },
            wsUri: "wss://foo.jambonz.org:8443",
        };
        const sipUA = new SipUA(client, settings);
        sipUA.on(SipConstants.UA_CONNECTING, args => {
            console.log(SipConstants.UA_CONNECTING, args);
        });
        sipUA.on(SipConstants.UA_REGISTERED, args => {
            console.log(SipConstants.UA_REGISTERED, args);
        });
        sipUA.on(SipConstants.UA_UNREGISTERED, args => {
            console.log(SipConstants.UA_UNREGISTERED, args);
        });
        sipUA.start();
    }

    _handleClick(num) {
        this.toNumber += num;
    }

    _handleCall() {
        console.log(`Calling...`);
        this.sipClient.call(this.toNumber, '121241231');
    }

    _handleInput(event) {
        this.toNumber = event.target.value;
    }
}

customElements.define('phone-element', Phone);