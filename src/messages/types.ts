
export interface TurnstileMessage {
    source: "cloudflare-challenge";
    widgetId: string;
    event: string;
}

export interface InitTurnstileMessage extends TurnstileMessage {
    event: "init";
    mode: "managed" | "invisible" | "non-interactive";
}

export interface CompleteTurnstileMessage extends TurnstileMessage {
    event: "complete";
    token: string;
}

export interface FailTurnstileMessage extends TurnstileMessage {
    event: "fail";
    code?: string;
}

export interface TokenExpiredTurnstileMessage extends TurnstileMessage {
    event: "tokenExpired";
    token: string;
}

export interface RefreshRequestTurnstileMessage extends TurnstileMessage {
    event: "refreshRequest";
}

export interface InteractiveBeginTurnstileMessage extends TurnstileMessage {
    event: "interactiveBegin";
}

export interface InteractiveTimeoutTurnstileMessage extends TurnstileMessage {
    event: "interactiveTimeout";
}

export interface InteractiveEndTurnstileMessage extends TurnstileMessage {
    event: "interactiveEnd";
}

export interface RequestExtraParametersTurnstileMessage extends TurnstileMessage {
    event: "requestExtraParams";
}
