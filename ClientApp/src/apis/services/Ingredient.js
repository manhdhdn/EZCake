import API_CONFIG from "./baseConfig";

const IngredientApi = {
    getIngredients: async (params) => {
        const response = await fetch(
            `${API_CONFIG.endpoints.ingredient}?` + new URLSearchParams(params),
            {
                method: "GET",
                headers: API_CONFIG.api.headers,
            }
        );

        return await response.json();
    },

    getIngredient: async (id) => {
        const response = await fetch(
            `${API_CONFIG.endpoints.ingredient}/${id}`,
            {
                method: "GET",
                headers: API_CONFIG.api.headers,
            }
        );

        return await response.json();
    },

    updateIngredient: async (id, params) => {
        const response = await fetch(
            `${API_CONFIG.endpoints.ingredient}/${id}`,
            {
                method: "PUT",
                headers: API_CONFIG.api.headers,
                body: JSON.stringify(params),
            }
        );

        return response.status;
    },

    createIngredient: async (params) => {
        const response = await fetch(
            `${API_CONFIG.endpoints.ingredient}`,
            {
                method: "POST",
                headers: API_CONFIG.api.headers,
                body: JSON.stringify(params),
            }
        );

        return response.status;
    },

    deleteIngredient: async (id) => {
        const response = await fetch(
            `${API_CONFIG.endpoints.ingredient}/${id}`,
            {
                method: "DELETE",
                headers: API_CONFIG.api.headers,
            }
        );

        return response.status;
    }
};

export default IngredientApi;
