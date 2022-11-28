import axios from 'axios'
export const sendUserData = async (userData) => {
    try {
        const response = await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB427ES2UTBk-cJ8oW1zhQeBNDjf-QrMGM" ,userData)
        if(response.status === "200" || response.status === 200) {
            return response
        }
    }catch(error) {
        return error
    }
};

export const fetchUserData = async (userData) => {
    try {
        const response = await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB427ES2UTBk-cJ8oW1zhQeBNDjf-QrMGM" ,userData)
        if(response.status === "200" || response.status === 200) {
            return response
        }
    }catch(error) {
        return error
    }
};

export const addTimerData  = async (timerData, userId) => {
    try {
        const endPoint = "taskTime" + userId + ".json";
        const response = await axios.put(`https://react-task-time-authentication-default-rtdb.firebaseio.com/${endPoint}` ,timerData)
        if(response.status === "200" || response.status === 200) {
            return response?.data
        }
    }catch(error) {
        return error
    }
};


export const getTimerData  = async (userId) => {
    try {
        const endPoint = "taskTime" + userId + ".json";
        const response = await axios.get(`https://react-task-time-authentication-default-rtdb.firebaseio.com/${endPoint}`)
        if(response.status === "200" || response.status === 200) {
            return response?.data
        }
    }catch(error) {
        return error
    }
};


