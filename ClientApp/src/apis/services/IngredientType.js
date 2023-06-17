import API_CONFIG from "./baseConfig";

const IngredientTypeApi = {
    getIngredientTypes: async (params) => {
        const response = await fetch(
            `${API_CONFIG.endpoints.ingredientType}?` + new URLSearchParams(params),
            {
                method: "GET",
                headers: API_CONFIG.api.headers,
            }
        );

        return await response.json();
    },

    getIngredientType: async (id) => {
        const response = await fetch(
            `${API_CONFIG.endpoints.ingredientType}/${id}`,
            {
                method: "GET",
                headers: API_CONFIG.api.headers,
            }
        );

        return await response.json();
    },

    updateIngredientType: async (id, params) => {
        const response = await fetch(
            `${API_CONFIG.endpoints.ingredientType}/${id}`,
            {
                method: "PUT",
                headers: API_CONFIG.api.headers,
                body: JSON.stringify(params),
            }
        );

        return response.status;
    },

    createIngredientType: async (params) => {
        const response = await fetch(
            `${API_CONFIG.endpoints.ingredientType}`,
            {
                method: "POST",
                headers: API_CONFIG.api.headers,
                body: JSON.stringify(params),
            }
        );

        return response.status;
    },

    deleteIngredientType: async (id) => {
        const response = await fetch(
            `${API_CONFIG.endpoints.ingredientType}/${id}`,
            {
                method: "DELETE",
                headers: API_CONFIG.api.headers,
            }
        );

        return response.status;
    }
};

export default IngredientTypeApi;
