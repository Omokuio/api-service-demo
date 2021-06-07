const config = require('../config');

const router = require('express').Router();
const { SSOToken } = require ('../middlewares/token.middleware');
const ApiClient = require ("../helpers/api-client.helper");

router.post(
  '/', 
  async (req, res, next) => {
    const ssoToken = await ApiClient.makeRequest ("/merchants/sso-tokens", "post", {
      applicationId: config.APPLICATION_ID,
    });
    if (!ssoToken || !ssoToken.id) {
      return next (new Error ("Error creating a new sso-token!"));
    }

    res.status(201).json({
      id: ssoToken.id,
      applicationId: ssoToken.applicationId,
      token: ssoToken.token,
      status: ssoToken.status.toUpperCase (),
      expiration: ssoToken.expiration,
    });
  }
);

router.get(
  '/', 
  SSOToken (), 
  async (req, res) => {
    const ssoToken = req.ssoToken;

    res.status(201).json({
      id: ssoToken.id,
      applicationId: ssoToken.applicationId,
      token: ssoToken.token,
      status: ssoToken.status.toUpperCase (),
      expiration: ssoToken.expiration,
    });
  }
);

module.exports = router;