import API_CONFIG from "./baseConfig";

const OrderDetailApi = {
    getOrderDetails: async (params) => {
        const response = await fetch(
            `${API_CONFIG.endpoints.orderDetail}?` + new URLSearchParams(params),
            {
                method: "GET",
                headers: API_CONFIG.api.headers,
            }
        );

        return await response.json();
    },

    getOrderDetail: async (id) => {
        const response = await fetch(
            `${API_CONFIG.endpoints.orderDetail}/${id}`,
            {
                method: "GET",
                headers: API_CONFIG.api.headers,
            }
        );

        return await response.json();
    },

    updateOrderDetail: async (id, params) => {
        const response = await fetch(
            `${API_CONFIG.endpoints.orderDetail}/${id}`,
            {
                method: "PUT",
                headers: API_CONFIG.api.headers,
                body: JSON.stringify(params),
            }
        );

        return response.status;
    },

    createOrderDetail: async (params) => {
        const response = await fetch(
            `${API_CONFIG.endpoints.orderDetail}`,
            {
                method: "POST",
                headers: API_CONFIG.api.headers,
                body: JSON.stringify(params),
            }
        );

        return response.status;
    },

    deleteOrderDetail: async (id) => {
        const response = await fetch(
            `${API_CONFIG.endpoints.orderDetail}/${id}`,
            {
                method: "DELETE",
                headers: API_CONFIG.api.headers,
            }
        );

        return response.status;
    }
};

export default OrderDetailApi;
