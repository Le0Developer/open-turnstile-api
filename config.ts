export default {
    flagValidation: "true", // enable option validation
    flagApi: "true", // enable turnstile api at all
    flagApiExecute: "true", // enable turnstile.execute
    flagApiGetResponse: "true", // enable turnstile.getResponse
    flagApiImplicitRender: "true", // enable turnstile.implicitRender
    flagApiReady: "true", // enable turnstile.ready
    flagApiRemove: "true", // enable turnstile.remove
    flagApiRender: "true", // enable turnstile.render
    flagApiReset: "true", // enable turnstile.reset
    flagApiContainerAllowWidgetId: "true", // allow passing widget id as container
    flagApiContainerAllowSelector: "true", // allow passing query selector as container (requires Element to work)
    flagApiContainerAllowElement: "true", // allow passing HTMLElement as container
    flagApiContainerAllowNothing: "true", // allow passing nothing as container (uses first currently rendered widget)
    flagCompatRecaptcha: "true", // recaptcha compatibility code
    flagCompatHCaptcha: "false", // NOT STANDARD - hcaptcha compatibility code
    flagImplicitRendering: "true", // enable implicit rendering
    flagInputElement: "true", // enable input element code
    flagLegacySitekey: "true", // enable legacy sitekey code (adds legacy input name)
    flagQueryParameters: "true", // enable query parameter parsing
    flagQueryParameterOnLoadWithAPI: "false", // NOT STANDARD - call onload callback with api
}