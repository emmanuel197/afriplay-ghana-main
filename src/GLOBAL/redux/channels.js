import axios from "axios";
import Cookies from "universal-cookie";
import interceptResponse from "../../utils/interceptResponse";
import { fetchChannelCategoriesReducer, fetchChannelsReducer } from "./slice/moviesSlice";

const cookies = new Cookies();
const user_info = cookies.get("user_info")

export const fetchChannelEPGInfo = async (channels) => {
    if (!channels) return;

    try {
        const { access_token, operator_uid } = user_info.data.data;
        const response = await axios.get(
            `https://ott.tvanywhereafrica.com:28182/api/client/v2/${operator_uid}/shows/grid?channels=${channels}`
            ,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );
        if (response.data.status === "ok")
        return response.data.data;
    } catch (e) {
        if (e.response?.status === 404) {
            return; // do nothing
        }
        console.warn(e.message); // optional: log other errors
    }
};

export const fetchChannels = async (dispatch) => {
    try {
        const { access_token, user_id, operator_uid } = user_info.data.data;

        interceptResponse()

        const packageIds = [];

        const packages = await axios.get(
            `https://ott.tvanywhereafrica.com:28182/api/client/v1/${operator_uid}/users/${user_id}/packages?device_class=desktop`,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            }
        );

        [...packages.data.data].forEach((item) => {
            return packageIds.push(item.id);
        });

        const packagesString = packageIds.join(',')

        const response = await axios.get(
            `https://ott.tvanywhereafrica.com:28182/api/client/v2/${operator_uid}/channels?packages=${packagesString}`,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            }
        )

        if (response.data.status === "error") return;
        console.log(response.data.data)
        if (response.data.status === "ok") dispatch(fetchChannelsReducer(response.data.data))

    } catch (error) {
        // console.log(error)
    }
}

export const fetchChannelCategories = async (dispatch) => {

    try {

        const { access_token, operator_uid } = user_info.data.data;

        interceptResponse()

        const response = await axios.get(
            `https://ott.tvanywhereafrica.com:28182/api/client/v1/${operator_uid}/categories/channels`,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            }
        )

        // console.warn('channel categories', response.data.data)

        if (response.data.status === "error") return;

        if (response.data.status === "ok") dispatch(fetchChannelCategoriesReducer(response.data.data))

    } catch (error) {
        // console.log(error)
    }
}

// export const fetchChannelInfo = async (channelId) => {

//     // console.warn('channel Id', channelId)

//     try {


//         const { access_token, operator_uid } = user_info.data.data;

//         interceptResponse()

//         const response = await axios.get(
//             `https://ott.tvanywhereafrica.com:28182/api/client/v1/${operator_uid}/channels/${channelId}`,
//             {
//                 headers: {
//                     Authorization: `Bearer ${access_token}`
//                 }
//             }
//         )
//             console.log(response.data.status)
//         if (response.data.status === "error")  {
//             // console.log(response.date)
//             return {
           
//             }
//         }
       

//         if (response.data.status === "ok") {

//             // let _ = response.data.data.filter(vod => {
//             // console.log(".....", )

//             // })

//             if (response.data.data) {
//                 // console.log(response.data.data)
//                 return  response.data.data
//             }
            
//         }

//     } catch (error) {
//         // console.log(error)
//     }
// }

export const fetchChannelInfo = async (channelId) => {
    try {
        const { access_token, operator_uid } = user_info.data.data;
        interceptResponse();

        const response = await axios.get(
            `https://ott.tvanywhereafrica.com:28182/api/client/v1/${operator_uid}/channels/${channelId}`,
            {
                headers: { Authorization: `Bearer ${access_token}` }
            }
        );

        // Handle HTTP status codes
        if (response.status === 404) {  // Explicit check for 404
            console.warn(`Channel ${channelId} not found`);
            return null; // or undefined/empty object
        }

        if (response.data.status === "error") {
            console.warn("API returned error status");
            return null;
        }

        if (response.data.status === "ok" && response.data.data) {
            return response.data.data;
        }

    } catch (error) {
        // Handle Axios errors (including 404)
        if (error.response && error.response.status === 404) {
            console.warn(`Channel ${channelId} not found (404)`);
            return null;
        }
        console.error("Error fetching channel:", error);
        return null;
    }
};