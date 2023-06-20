import API_CONFIG from "./baseConfig";

const CakeIngredientApi = {
    getCakeIngredients: async (params) => {
        const response = await fetch(
            `${API_CONFIG.endpoints.cakeIngredient}?` + new URLSearchParams(params),
            {
                method: "GET",
                headers: API_CONFIG.api.headers,
            }
        );

        return await response.json();
    },

    getCakeIngredient: async (id) => {
        const response = await fetch(
            `${API_CONFIG.endpoints.cakeIngredient}/${id}`,
            {
                method: "GET",
                headers: API_CONFIG.api.headers,
            }
        );

        return await response.json();
    },

    updateCakeIngredient: async (id, params) => {
        const response = await fetch(
            `${API_CONFIG.endpoints.cakeIngredient}/${id}`,
            {
                method: "PUT",
                headers: API_CONFIG.api.headers,
                body: JSON.stringify(params),
            }
        );

        return response.status;
    },

    createCakeIngredient: async (params) => {
        const response = await fetch(
            `${API_CONFIG.endpoints.cakeIngredient}`,
            {
                method: "POST",
                headers: API_CONFIG.api.headers,
                body: JSON.stringify(params),
            }
        );

        return response.status;
    },

    deleteCakeIngredient: async (id) => {
        const response = await fetch(
            `${API_CONFIG.endpoints.cakeIngredient}/${id}`,
            {
                method: "DELETE",
                headers: API_CONFIG.api.headers,
            }
        );

        return response.status;
    }
};

export default CakeIngredientApi;
