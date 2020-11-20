import * as axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    withCredentials: true,
    headers: {
        "API-KEY": "1faabac0-949b-4309-be48-4fe87bb8dbb5"
    }
})

export const profileApi = {
    getProfile(userId) {
        return instance.get(`/profile/${userId}`)
            .then(response => response.data)
    },
    saveProfile(formData) {
        return instance.put('/profile', formData)
            .then(response => response.data)
    },
    getStatus(userId) {
        return instance.get(`/profile/status/${userId}`)
            .then(response => response.data)
    },
    updateStatus(status) {
        return instance.put('/profile/status', {status: status})
            .then(response => response.data)
    },
    savePhoto(photo) {
        const formData = new FormData();
        formData.append("image", photo)
        return instance.put('/profile/photo', formData)
            .then(response => response.data)
    }
}

export const authApi = {
    me() {
        return instance.get('/auth/me')
            .then(response => response.data)
    },
    logIn(loginData) {
        return instance.post('/auth/login', loginData)
            .then(response => response.data)
    },
    logOut() {
        return instance.delete('/auth/login')
            .then(response => response.data)
    },
    getCaptchaUrl() {
        return instance.get('/security/get-captcha-url')
            .then(response => {
               return response.data
            })
    }
}

export const usersApi = {
    getUsers(pageSize, pageNumber) {
        return instance.get(`/users?count=${pageSize}&page=${pageNumber}`)
            .then(response => response.data)
    },
    getFriends() {
        return instance.get('/users?count=99&friend=true')
            .then(response => response.data)
    },
    unfollowUser(userId) {
        return instance.delete(`/follow/${userId}`)
            .then(response => response.data)
    },
    followUser(userId) {
        return instance.post(`/follow/${userId}`)
            .then(response => response.data)
    }
}

export const dialogsApi = {
    startDialog(userId) {
        return instance.put(`/dialogs/${userId}`)
            .then(response => response.data)
    },
    getDialogs() {
        return instance.get('/dialogs')
            .then(response => response.data)
    },
    sendMessage(userId, messageBody) {

        return instance.post(`/dialogs/${userId}/messages`, {body: messageBody})
            .then(response => response.data)
    },
    getMessages(userId, messagesPage, messagesCount) {
        return instance.get(`/dialogs/${userId}/messages/?page=${messagesPage}&count=${messagesCount}`)
            .then(response => response.data)
    }
}