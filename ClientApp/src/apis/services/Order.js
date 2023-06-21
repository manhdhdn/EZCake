import API_CONFIG from "./baseConfig";

const OrderApi = {
    getOrders: async (params) => {
        const response = await fetch(
            `${API_CONFIG.endpoints.order}?` + new URLSearchParams(params),
            {
                method: "GET",
                headers: API_CONFIG.api.headers,
            }
        );

        return await response.json();
    },

    getOrder: async (id) => {
        const response = await fetch(
            `${API_CONFIG.endpoints.order}/${id}`,
            {
                method: "GET",
                headers: API_CONFIG.api.headers,
            }
        );

        return await response.json();
    },

    updateOrder: async (id, params) => {
        const response = await fetch(
            `${API_CONFIG.endpoints.order}/${id}`,
            {
                method: "PUT",
                headers: API_CONFIG.api.headers,
                body: JSON.stringify(params),
            }
        );

        return response.status;
    },

    createOrder: async (params) => {
        const response = await fetch(
            `${API_CONFIG.endpoints.order}`,
            {
                method: "POST",
                headers: API_CONFIG.api.headers,
                body: JSON.stringify(params),
            }
        );

        console.log(response);
        console.log(await response.json());

        return response.status;
    },

    deleteOrder: async (id) => {
        const response = await fetch(
            `${API_CONFIG.endpoints.order}/${id}`,
            {
                method: "DELETE",
                headers: API_CONFIG.api.headers,
            }
        );

        return response.status;
    }
};

export default OrderApi;
