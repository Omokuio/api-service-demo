const router = require('express').Router();
const SSOTokenRoutes = require('./ssoTokens.route');
const UserRoutes = require('./users.route');

// routes registration
router.use('/sso-tokens', SSOTokenRoutes);
router.use('/users', UserRoutes);

module.exports = router;