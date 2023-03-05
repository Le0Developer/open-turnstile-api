import { TurnstileOptions } from "turnstile-types";


export let widgets = new Map<string, Widget>();

export enum WidgetState {
    Loading,
    Loaded,
}

export interface Widget {
    id: string;
    options: TurnstileOptions;
    state: WidgetState,
    token: string;
    queue: Array<any>;
    mode?: "managed" | "non-interactive" | "invisible";
}
