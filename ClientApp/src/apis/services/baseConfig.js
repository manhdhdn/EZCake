const API_CONFIG = {
    api: {
        headers: {
            accept: "*/*",
            "Content-Type": "application/json-patch+json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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
        ingredient: "api/ingredients",
        review: "api/reviews",
        momo: "api/momo",
    },
    context: [
        "/api/accounts",
        "/api/shippingInformations",
        "/api/cakes",
        "/api/ingredientTypes",
        "/api/cakeIngredients",
        "/api/orderDetails",
        "/api/orders",
        "/api/ingredients",
        "/api/reviews",
        "/api/momo",
    ]
};

export default API_CONFIG;
