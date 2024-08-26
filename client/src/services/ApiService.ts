import instance from "../lib/axiosConfig";

export const getData = async () => {
    try {
        const token = JSON.parse(localStorage.getItem("authToken")!)
        const headers = {
            Authorization: `Bearer ${token.access_token}`,
            'Content-Type': 'application/json',
        };
        const response = await instance.get("/get-data", { headers: headers })
        return response
    } catch (error) {
        throw error
    }

};
