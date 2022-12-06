/**
 * do ip check in global
 * run another check in local to verify network
 * if the check fails, tell user to select a valid network
 */

import axios from "axios"

const checkUserAllowed = async () => {
    try {
        const res = await axios.get('https://tvanywhereonline.com/cm/api/auth/', {
            headers: {
                'Password': 'tva12345#',
                'Username': 'tva'
            }
        })
        if (!res.data.valid) window.location.replace("/out-of-region")
    } catch (e) {
        window.location.replace("/out-of-region")
    }
}

export default checkUserAllowed