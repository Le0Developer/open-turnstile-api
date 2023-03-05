
import { TurnstileObject } from "turnstile-types";

import execute from "./execute";
import getResponse from "./getResponse";
import implicitRender from "./implicitRender";
import ready from "./ready";
import remove from "./remove";
import render from "./render";
import reset from "./reset";


const api: any = {};

if(flagApiExecute) api.execute = execute;
if(flagApiGetResponse) api.getResponse = getResponse;
if(flagApiImplicitRender) api.implicitRender = implicitRender;
if(flagApiReady) api.ready = ready;
if(flagApiRemove) api.remove = remove;
if(flagApiRender) api.render = render;
if(flagApiReset) api.reset = reset;

export default api as TurnstileObject;
