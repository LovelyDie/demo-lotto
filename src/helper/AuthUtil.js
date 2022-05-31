import Cookies from 'js-cookie'

const getTokenFromCookie = () => {
    return Cookies.get('Authorization-Token')
}

const saveTokenToCookie = (token) => {
    Cookies.set('Authorization-Token', token)
}

const deleteTokenFromCookie = () => {
    Cookies.remove('Authorization-Token')
}

export { getTokenFromCookie, saveTokenToCookie, deleteTokenFromCookie }