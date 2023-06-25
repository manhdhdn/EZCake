import API_CONFIG from "./baseConfig";

const PaymentApi = {
    getPayments: async (params) => {
        const response = await fetch(
            `${API_CONFIG.endpoints.payment}?` + new URLSearchParams(params),
            {
                method: "GET",
                headers: API_CONFIG.api.headers,
            }
        );

        return await response.json();
    },

    getPayment: async (id) => {
        const response = await fetch(
            `${API_CONFIG.endpoints.payment}/${id}`,
            {
                method: "GET",
                headers: API_CONFIG.api.headers,
            }
        );

        return await response.json();
    },

    updatePayment: async (id, params) => {
        const response = await fetch(
            `${API_CONFIG.endpoints.payment}/${id}`,
            {
                method: "PUT",
                headers: API_CONFIG.api.headers,
                body: JSON.stringify(params),
            }
        );

        return response.status;
    },

    createPayment: async (params) => {
        const response = await fetch(
            `${API_CONFIG.endpoints.payment}`,
            {
                method: "POST",
                headers: API_CONFIG.api.headers,
                body: JSON.stringify(params),
            }
        );

        return response.status;
    },

    deletePayment: async (id) => {
        const response = await fetch(
            `${API_CONFIG.endpoints.payment}/${id}`,
            {
                method: "DELETE",
                headers: API_CONFIG.api.headers,
            }
        );

        return response.status;
    }
};

export default PaymentApi;
