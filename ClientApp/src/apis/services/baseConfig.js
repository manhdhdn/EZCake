const API_CONFIG = {
    api: {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")) && JSON.parse(localStorage.getItem("user")).stsTokenManager.accessToken}`,
        },
    },
    endpoints: {
        account: "api/accounts",
        shippingInformation: "api/shippingInformations",
        cake: "api/cakes",
        ingredientType: "api/ingredientTypes",
    },
    context: [
        "/api/accounts",
        "/api/shippingInformations",
        "/api/cakes",
        "/api/ingredientTypes",
    ]
};

export default API_CONFIG;
