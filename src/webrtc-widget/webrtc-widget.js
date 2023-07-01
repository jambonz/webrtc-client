import { LitElement, html, css } from 'lit';
import "./phone"

class ChatWidget extends LitElement {
  static get styles() {
    return css`
    .chat-widget-container {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 1000;
      display: flex;
      flex-direction: column-reverse;
      align-items: flex-end;
    }
    
    .chat-icon-button {
      background-color: green;
      color: white;
      border: none;
      cursor: pointer;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      font-size: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      z-index: 1010; /* Make sure the button is above the chat form */
    }
    
    .chat-icon-button:hover {
      background-color: #e1e1e1;
      transform: scale(1.05);
    }
    
    .chat-icon-button:before,
    .chat-icon-button:after {
      content: "";
      display: block;
      position: absolute;
      width: 1em;
      height: 1em;
      top: 50%;
      left: 50%;
      transform-origin: center center;
      text-align: center;
      line-height: 1;
      font-size: 24px;
    }
    
    .chat-icon-button:before {
      content: "📞";
      opacity: 1;
    }
    
    .chat-icon-button:after {
      content: "×";
      
      opacity: 0;
    }
    
    .chat-widget-container.form-visible .chat-icon-button:before {
      animation: rotateHide 0.3s forwards;
    }
    
    .chat-widget-container.form-visible .chat-icon-button:after {
      animation: rotateShow 0.3s forwards;
    }
    
    .chat-widget-container:not(.form-visible) .chat-icon-button:before {
      animation: rotateShow 0.3s forwards;
    }
    
    .chat-widget-container:not(.form-visible) .chat-icon-button:after {
      animation: rotateHide 0.3s forwards;
    }
    
    @keyframes rotateHide {
      0% {
        opacity: 1;
        transform: translate(-50%, -50%) rotate(0deg);
      }
      50% {
        opacity: 0;
        transform: translate(-50%, -50%) rotate(90deg);
      }
      100% {
        opacity: 0;
        transform: translate(-50%, -50%) rotate(180deg);
      }
    }
    
    @keyframes rotateShow {
      0% {
        opacity: 0;
        transform: translate(-50%, -50%) rotate(-180deg);
      }
      50% {
        opacity: 0;
        transform: translate(-50%, -50%) rotate(-90deg);
      }
      100% {
        opacity: 1;
        transform: translate(-50%, -50%) rotate(0deg);
      }
    }
    
    .chat-form {
      position: absolute;
      bottom: 60px; /* Set space between button and form to prevent overlap */
      background-color: #f1f1f1;
      border-radius: 5px;
      padding: 20px;
      width: 250px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      opacity: 0;
      max-height: 0;
      overflow: hidden;
    
      /* Animation styles */
      transition: opacity 0.3s ease-in-out, max-height 0.3s ease-in-out, transform 0.3s ease-in-out, width 0.3s ease-in-out;
      transform-origin: bottom right;
      transform: scaleX(0) scaleY(0);
      background-color: var(--bg-color);
      border-radius: 20px;
      padding: 8px 15px; 
    }

    .hidden {
      display: none;
    }
    
    .chat-widget-container.form-visible .chat-form {
      opacity: 1;
      max-height: 500px; /* Adjust based on your desired maximum height */
    
      /* Animation styles */
      transform: scaleX(1) scaleY(1);
    }
    `;
  }

  static get properties() {
    return {
      isFormVisible: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.isFormVisible = false;
  }

  toggleFormVisibility() {
    this.isFormVisible = !this.isFormVisible;
  }

  render() {
    return html`
      <div class="chat-widget-container ${this.isFormVisible ? 'form-visible' : ''}">
        <button @click="${this.toggleFormVisibility}" class="chat-icon-button"></button>
        <div class="chat-form ${this.isFormVisible ? "":"hidden"}">
          <phone-element .props=${{caller:'xhoaluu'}}></phone-element>
        </div>
      </div>
    `;
  }
}

customElements.define('webrtc-widget', ChatWidget);