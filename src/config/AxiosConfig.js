import axios from 'axios'
import { getTokenFromCookie } from '../helper/AuthUtil'

axios.defaults.baseURL = process.env.REACT_APP_API_URL

axios.interceptors.request.use(
    async config => {
        return handleRequest(config)
    },
    error => {
        return Promise.reject(error)
    }
)

const handleRequest = (config) => {
    const auth = getTokenFromCookie()
    if (auth) {
        config.headers = {
            'Authorization': auth
        }
    }
    return config
}

axios.interceptors.response.use(
    response => {
        return response
    },
    error => {
        if (error.response && error.response.status !== 404) {
            // notification.error({
            //     message: (error.response.data && error.response.data.detail) || error.code ||'Unknown Subject',
            //     description: (error.response.data && error.response.data.detail) || error.message || 'Unknown detail',
            //     duration: 5
            // })
        } else if (!error.response) {
            // notification.error({
            //     message: 'NETWORK_ERROR',
            //     description: 'Something went wrong. Please try again later.',
            //     duration: 5
            // })
        }
        return Promise.reject(error)
    }
)

export { axios }