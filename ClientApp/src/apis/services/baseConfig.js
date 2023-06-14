const API_CONFIG = {
    api: {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")) && JSON.parse(localStorage.getItem("user")).stsTokenManager.accessToken}`,
        },
    },
    endpoints: {
        account: "api/accounts",
        accountShipping: "api/accountShippings",
        shippingInformation: "api/shippingInformations",
    },
    context: [
        "/api/accounts",
        "/api/accountShippings",
        "/api/shippingInformations"
    ]
};

export default API_CONFIG;
