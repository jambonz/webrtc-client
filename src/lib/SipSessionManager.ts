import {
    SipSession, SipModel, SipConstants
} from "./index";


export default class SipSessionManager {

    #sessions: SipModel.SipSessionState[];

    constructor() {
        this.#sessions = [];
    }

    activate(session: SipSession) {
        this.#sessions.forEach(state => {
            if (session.id !== state.id) {
                state.active = false;
                session.setActive(false);
            }
        });
    }

    updateSession(field: string, session: SipSession, args: any): void {
        const state: SipModel.SipSessionState = this.getSessionState(session.id);
        if (state) {
            switch (field) {
                case SipConstants.SESSION_RINGING:
                    state.status = args.status;
                    break;
                case SipConstants.SESSION_ANSWERED:
                    state.status = args.status;
                    break;
                case SipConstants.SESSION_FAILED || SipConstants.SESSION_ENDED:
                    state.status = args.status;
                    state.endState = {
                        cause: args.cause,
                        status: args.status,
                        originator: args.endState,
                        description: args.description
                    }
                    break;
                case SipConstants.SESSION_MUTED:
                    state.muteStatus = args.status;
                    break;
                case SipConstants.SESSION_HOLD:
                    state.holdState = {
                        originator: args.originator,
                        status: args.status
                    }
                    break;
                case SipConstants.SESSION_ICE_READY:
                    state.iceReady = true;
                    break;
                case SipConstants.SESSION_ACTIVE:
                    state.active = true;
                    break;
            }
        }
    }

    getSessionState(id: string): SipModel.SipSessionState {
        const state = this.#sessions.find(value => value.id === id);
        if (!state) {
            throw new Error("Session not found");
        }
        return state;
    }

    getSession(id: string): SipSession {
        return this.getSessionState(id).sipSession;
    }



    newSession(session: SipSession): void {
        this.#sessions.push({
            id: session.id,
            sipSession: session,
            startDateTime: new Date(),
            active: true,
            status: 'init',
        });
    }

    get activeSession(): SipSession {
        const state = this.#sessions.find(value => value.active);
        if (state) {
            return state.sipSession;
        }
        if (this.#sessions.length === 0) {
            throw new Error("No sessions");
        }
        return this.#sessions[0].sipSession;
    }

    get count() {
        return this.#sessions.length;
    }
}