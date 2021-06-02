const config = require ("../config");
const axios = require ("axios");
const jwt = require ("jsonwebtoken");

class ApiClient {

    static get UserTokenHeaderName () {
        return "X-USER-TOKEN";
    }

    static async makeRequest (path, method = "get", data = null, parameters = null, userTokenValue = null, isPublic = false) {
        try {
            const additionlHeaders = {};
            if (userTokenValue) {
                additionlHeaders ["X-SSO-TOKEN"] = userTokenValue;
            }

            return (await axios ({
                baseURL: config.OMOKUIO_API_URL,
                method,
                url: path,
                data,
                params: parameters,
                headers: {
                    "X-API-TOKEN": isPublic ? null : jwt.sign({ 
                        data: {
                            "api-key": config.OMOKUIO_API_KEY,
                            requestBody: data,
                            requestQueries: parameters,
                        },
                        receiver: config.API_SERVICE_RECEIVER,
                    }, 
                    config.OMOKUIO_API_SECRET, { 
                        algorithm: 'HS512',
                        audience: config.API_SERVICE_AUDIENCE,
                    }),
                    ...additionlHeaders,
                },
            })).data;
        } catch (e) {
            console.error ("API-ERROR", e.response.status, e.message, e.response.data.message || "");
            return null;
        }
    };

}

module.exports = ApiClient;