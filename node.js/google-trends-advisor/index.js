// Please configure these variables with your own credentials (never publish them!)
const OMOKUIO_API_KEY = "XXX";
const OMOKUIO_API_SECRET = "XXX";
const OMOKUIO_API_URL = "https://api-service.omoku.io";

// 3rd party dependencies
const googleTrends = require ("google-trends-api");
const axios = require ("axios");
const jwt = require ("jsonwebtoken");

// wrapper to enable asynchronous methods
setTimeout (async () => {
    try {

        // Request google trends data for keyword "IOTA"
        const trends = await googleTrends.interestOverTime ({
            keyword: "IOTA",
        });

        // Calculate average trend of the available data
        let averageTrend = 0;
        for (let i = 1; i < trends.default.timelineData.length - 1; i++) {
            averageTrend += trends.default.timelineData [i].value - trends.default.timelineData [i-1].value;
        }

        // Decide, if we should buy or sell IOTA
        const shouldWeBuyIOTA = averageTrend > 0;

        // Method to create api-request with credentials 
        const makeRequest = async (path, method = "get", data = null, parameters = null, isPublic = false) => {
            try {
                return (await axios ({
                    baseURL: OMOKUIO_API_URL,
                    method,
                    url: path,
                    data,
                    params: parameters,
                    headers: {
                        "X-API-TOKEN": isPublic ? null : jwt.sign({ 
                            data: {
                                "api-key": OMOKUIO_API_KEY,
                                requestBody: data,
                                requestQueries: parameters,
                            },
                            receiver: "ApiService",
                        }, 
                        OMOKUIO_API_SECRET, { 
                            algorithm: 'HS512',
                            audience: "omoku",
                        }),
                    },
                })).data;
            } catch (e) {
                console.error ("API-ERROR", e.response.status, e.message);
                return null;
            }
        };

        // --- Make all the relevant requests to the omoku.io:api --- //
        // Fetch user's details
        const userDetails = await makeRequest ("/private/users/details");
        // Fetch available payment-methods
        const paymentMethods = await makeRequest ("/public/payment-methods", "get", null, null, true);
        // Fetch iota-details
        const iotaDetails = await makeRequest ("/private/details/MIOTA");
        const iotaDetail = iotaDetails [0];
        // Fetch sepa-details
        const sepaDetails = await makeRequest ("/private/details/SEPA");
        const sepaDetail = sepaDetails.find (sD => sD.isVerified === true);
        // Create contract
        const contract = await makeRequest ("/private/contracts", "post", {
            amount: userDetails.limits.daily.availableEUR,
            incomingPaymentMethodId: paymentMethods.find (pM => pM.key === (shouldWeBuyIOTA ? "SEPA" : "MIOTA")).id,
            incomingPaymentDetailId: (shouldWeBuyIOTA ? sepaDetail : iotaDetail).id,
            outgoingPaymentMethodId: paymentMethods.find (pM => pM.key === (shouldWeBuyIOTA ? "MIOTA" : "SEPA")).id,
            outgoingPaymentDetailId: (shouldWeBuyIOTA ? iotaDetail : sepaDetail).id,
        });

        // --- LOG all the relevant information for the user --- //
        console.log ("========== TRADING ADVISOR ==========");
        console.log ("Trend analytics:", (averageTrend >= 0 ? "+ " : "- ") + averageTrend + " avg. trend");
        console.log ("Decision:", shouldWeBuyIOTA ? "BUY" : "SELL");
        console.log ("---");
        console.log ("Personal limit:", userDetails.limits.daily.availableEUR, "/", userDetails.limits.daily.limitEUR, "EUR");
        console.log ("---");
        console.log ("Payment reference:", contract.reference);
        console.log ("Payment details for creating your order:");
        console.log (JSON.stringify (contract.details, "\t", 4));    
        
    } catch (e) {
        console.error ("ERROR", e);
    }
});