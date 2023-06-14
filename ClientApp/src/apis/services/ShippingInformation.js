import API_CONFIG from "./baseConfig";

const ShippingInformationApi = {
    getShippingInformations: async (params) => {
        const response = await fetch(
            `${API_CONFIG.endpoints.shippingInformation}?` + new URLSearchParams(params),
            {
                method: "GET",
                headers: API_CONFIG.api.headers,
            }
        );

        return await response.json();
    },

    getShippingInformation: async (id) => {
        const response = await fetch(
            `${API_CONFIG.endpoints.shippingInformation}/${id}`,
            {
                method: "GET",
                headers: API_CONFIG.api.headers,
            }
        );

        return await response.json();
    },

    updateShippingInformation: async (id, params) => {
        const response = await fetch(
            `${API_CONFIG.endpoints.shippingInformation}/${id}`,
            {
                method: "PUT",
                headers: API_CONFIG.api.headers,
                body: JSON.stringify(params),
            }
        );

        return response.status;
    },

    createShippingInformation: async (params) => {
        const response = await fetch(
            `${API_CONFIG.endpoints.shippingInformation}`,
            {
                method: "POST",
                headers: API_CONFIG.api.headers,
                body: JSON.stringify(params),
            }
        );

        return response.status;
    },

    deleteShippingInformation: async (id) => {
        const response = await fetch(
            `${API_CONFIG.endpoints.shippingInformation}/${id}`,
            {
                method: "DELETE",
                headers: API_CONFIG.api.headers,
            }
        );

        return response.status;
    }
};

export default ShippingInformationApi;
