const router = require('express').Router();
const { SSOToken } = require ('../middlewares/token.middleware');
const ApiClient = require ("../helpers/api-client.helper");

router.get(
  '/', 
  SSOToken ("success"), 
  async (req, res) => {
    const ssoToken = req.ssoToken;

    const userStatus = await ApiClient.makeRequest ("/merchants/users/status", "get", null, null, ssoToken.token);
    if (!userStatus || !userStatus.userId) {
      return next (new Error ("Error loading the user status!"));
    }
    const userDetails = await ApiClient.makeRequest ("/merchants/users/details", "get", null, null, ssoToken.token);
    if (!userDetails || !userDetails.userId) {
      return next (new Error ("Error loading the user details!"));
    }

    res.status(201).json({
      ...userStatus,
      ...userDetails,
    });
  }
);

module.exports = router;