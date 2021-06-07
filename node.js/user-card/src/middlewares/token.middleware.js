const ApiClient = require ("../helpers/api-client.helper");

const SSOToken = ((status = null) => async (req, res, next) => {
    // Check if x-user-token header exists
    if (!req.header (ApiClient.UserTokenHeaderName)) {
        return next (new Error ("The \"" + ApiClient.UserTokenHeaderName + "\" header is missing!"));
    }

    // Check if sso-token is valid
    const ssoToken = await ApiClient.makeRequest ("/merchants/sso-tokens/" + encodeURIComponent (req.header (ApiClient.UserTokenHeaderName)), "get");
    if (!ssoToken || !ssoToken.id) {
      return next (new Error ("Error receiving status of the sso-token! Maybe the token is invalid?"));
    }

    // Check if status is valid
    if (status && ssoToken.status.toUpperCase () !== status.toUpperCase ()) {
        return next (new Error ("The sso-token has invalid status! Status \"" + status.toUpperCase () + "\" is required but \"" + ssoToken.status.toUpperCase () + "\" is given."));
    }

    // Store the ssoToken for this request
    req.ssoToken = ssoToken;

    return next ();
});
  
module.exports = {
    SSOToken,
};
