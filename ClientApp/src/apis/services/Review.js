import API_CONFIG from "./baseConfig";

const ReviewApi = {
    getReviews: async (params) => {
        const response = await fetch(
            `${API_CONFIG.endpoints.review}?` + new URLSearchParams(params),
            {
                method: "GET",
                headers: API_CONFIG.api.headers,
            }
        );

        return await response.json();
    },

    getReview: async (id) => {
        const response = await fetch(
            `${API_CONFIG.endpoints.review}/${id}`,
            {
                method: "GET",
                headers: API_CONFIG.api.headers,
            }
        );

        return await response.json();
    },

    updateReview: async (id, params) => {
        const response = await fetch(
            `${API_CONFIG.endpoints.review}/${id}`,
            {
                method: "PUT",
                headers: API_CONFIG.api.headers,
                body: JSON.stringify(params),
            }
        );

        return response.status;
    },

    createReview: async (params) => {
        const response = await fetch(
            `${API_CONFIG.endpoints.review}`,
            {
                method: "POST",
                headers: API_CONFIG.api.headers,
                body: JSON.stringify(params),
            }
        );

        return response.status;
    },

    deleteReview: async (id) => {
        const response = await fetch(
            `${API_CONFIG.endpoints.review}/${id}`,
            {
                method: "DELETE",
                headers: API_CONFIG.api.headers,
            }
        );

        return response.status;
    }
};

export default ReviewApi;
