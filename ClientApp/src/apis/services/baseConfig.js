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
        cakeIngredient: "api/cakeIngredients",
        orderDetail: "api/orderDetails",
        order: "api/orders",
    },
    context: [
        "/api/accounts",
        "/api/shippingInformations",
        "/api/cakes",
        "/api/ingredientTypes",
        "/api/cakeIngredients",
        "/api/orderDetails",
        "/api/orders",
    ]
};

export default API_CONFIG;
