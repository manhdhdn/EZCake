import API_CONFIG from "./baseConfig";

const CakeApi = {
    getCakes: async (params) => {
        const response = await fetch(
            `${API_CONFIG.endpoints.cake}?` + new URLSearchParams(params),
            {
                method: "GET",
                headers: API_CONFIG.api.headers,
            }
        );

        return await response.json();
    },

    getCake: async (id) => {
        const response = await fetch(
            `${API_CONFIG.endpoints.cake}/${id}`,
            {
                method: "GET",
                headers: API_CONFIG.api.headers,
            }
        );

        return await response.json();
    },

    updateCake: async (id, params) => {
        const response = await fetch(
            `${API_CONFIG.endpoints.cake}/${id}`,
            {
                method: "PUT",
                headers: API_CONFIG.api.headers,
                body: JSON.stringify(params),
            }
        );

        return response.status;
    },

    createCake: async (params) => {
        const response = await fetch(
            `${API_CONFIG.endpoints.cake}`,
            {
                method: "POST",
                headers: API_CONFIG.api.headers,
                body: JSON.stringify(params),
            }
        );

        return response.status;
    },

    deleteCake: async (id) => {
        const response = await fetch(
            `${API_CONFIG.endpoints.cake}/${id}`,
            {
                method: "DELETE",
                headers: API_CONFIG.api.headers,
            }
        );

        return response.status;
    }
};

export default CakeApi;
