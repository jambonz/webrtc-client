import SipSession from "./SipSession";

interface SipSessionState {
    id: string;
    sipSession: SipSession;
    startDateTime: Date;
    active: boolean;
    status: string;
    muteStatus?: string;
    iceReady?: boolean;
    endState?: EndState;
    holdState?: HoldState;
}

interface EndState {
    cause: string,
    status: string,
    originator: string,
    description: string
}

interface HoldState {
    status: string,
    originator: string
}

interface ClientAuth {
    username:string;
    password:string;
    name: string;
}

interface ClientOptions {
    pcConfig:PeerConnectionConfig;
    wsUri:string;
}

interface PeerConnectionConfig {
    iceServers: IceServer[];
}

interface IceServer {
    urls : string[];
}

export {
    SipSessionState,
    EndState,
    HoldState,
    ClientAuth,
    ClientOptions,
    PeerConnectionConfig,
    IceServer
}