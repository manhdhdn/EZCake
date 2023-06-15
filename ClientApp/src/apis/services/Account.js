import API_CONFIG from "./baseConfig";

const AccountApi = {
    getAccounts: async (params) => {
        const response = await fetch(
            `${API_CONFIG.endpoints.account}?` + new URLSearchParams(params),
            {
                method: "GET",
                headers: API_CONFIG.api.headers,
            }
        );

        return await response.json();
    },

    getAccount: async (params) => {
        const response = await fetch(
            `${API_CONFIG.endpoints.account}/id?` + new URLSearchParams(params),
            {
                method: "GET",
                headers: API_CONFIG.api.headers,
            }
        );

        return await response.json();
    },

    updateAccount: async (id, params) => {
        const response = await fetch(
            `${API_CONFIG.endpoints.account}/${id}`,
            {
                method: "PUT",
                headers: API_CONFIG.api.headers,
                body: JSON.stringify(params),
            }
        );

        return response.status;
    },

    createAccount: async (params) => {
        const response = await fetch(
            `${API_CONFIG.endpoints.account}`,
            {
                method: "POST",
                headers: API_CONFIG.api.headers,
                body: JSON.stringify(params),
            }
        );

        return response.status;
    },

    deleteAccount: async (id) => {
        const response = await fetch(
            `${API_CONFIG.endpoints.account}/${id}`,
            {
                method: "DELETE",
                headers: API_CONFIG.api.headers,
            }
        );

        return response.status;
    }
};

export default AccountApi;