import API_CONFIG from "./baseConfig";

const AccountShippingApi = {
    getAccountShippings: async (params) => {
        const response = await fetch(
            `${API_CONFIG.endpoints.accountShipping}?` + new URLSearchParams(params),
            {
                method: "GET",
                headers: API_CONFIG.api.headers,
            }
        );

        return await response.json();
    },

    getAccountShipping: async (id) => {
        const response = await fetch(
            `${API_CONFIG.endpoints.accountShipping}/${id}`,
            {
                method: "GET",
                headers: API_CONFIG.api.headers,
            }
        );

        return await response.json();
    },

    updateAccountShipping: async (id, params) => {
        const response = await fetch(
            `${API_CONFIG.endpoints.accountShipping}/${id}`,
            {
                method: "PUT",
                headers: API_CONFIG.api.headers,
                body: JSON.stringify(params),
            }
        );

        return response.status;
    },

    createAccountShipping: async (params) => {
        const response = await fetch(
            `${API_CONFIG.endpoints.accountShipping}`,
            {
                method: "POST",
                headers: API_CONFIG.api.headers,
                body: JSON.stringify(params),
            }
        );

        return response.status;
    },

    deleteAccountShipping: async (id) => {
        const response = await fetch(
            `${API_CONFIG.endpoints.accountShipping}/${id}`,
            {
                method: "DELETE",
                headers: API_CONFIG.api.headers,
            }
        );

        return response.status;
    }
};

export default AccountShippingApi;
