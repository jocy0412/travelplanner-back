import axios from "axios";

export default async (accessToken) => {
    const headers = {
        Authorization: `Bearer ${accessToken}`,
    };
    try {
        const response = await axios({
            method: "GET",
            headers,
            url: "https://kapi.kakao.com/v2/user/me",
        });

        return response.data;
    } catch (error) {
        console.log(error);
    }
};
