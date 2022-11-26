import axios from "axios";

export default async (accessToken) => {
    const headers = {
        Authorization: `Bearer ${accessToken}`,
    };
    const response = await axios({
        method: "GET",
        headers,
        url: "https://kapi.kakao.com/v2/user/me",
    })
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            console.log(error);
        });

    return response;
};
