import Cookies from 'js-cookie'

const getUserFromCookie = () => {
    return {
        id: getIdFromCookie(),
        name: getNameFromCookie(),
        token: getTokenFromCookie(),
    }
}

const saveUserToCookie = (id, name, token) => {
    saveIdToCookie(id)
    saveNameToCookie(name)
    saveTokenToCookie(token)
}

const deleteUserFromCookie = () => {
    deleteIdFromCookie()
    deleteNameFromCookie()
    deleteTokenFromCookie()
}

const getTokenFromCookie = () => {
    return Cookies.get('Authorization-Token')
}

const saveTokenToCookie = (token) => {
    Cookies.set('Authorization-Token', token)
}

const deleteTokenFromCookie = () => {
    Cookies.remove('Authorization-Token')
}

const getIdFromCookie = () => {
    return Cookies.get('User-Id')
}

const saveIdToCookie = (id) => {
    Cookies.set('User-Id', id)
}

const deleteIdFromCookie = () => {
    Cookies.remove('User-Id')
}

const getNameFromCookie = () => {
    return Cookies.get('User-Name')
}

const saveNameToCookie = (name) => {
    Cookies.set('User-Name', name)
}

const deleteNameFromCookie = () => {
    Cookies.remove('User-Name')
}

export {
    getTokenFromCookie,
    saveTokenToCookie,
    deleteTokenFromCookie,
    getIdFromCookie,
    saveIdToCookie,
    deleteIdFromCookie,
    getNameFromCookie,
    saveNameToCookie,
    deleteNameFromCookie,
    getUserFromCookie,
    saveUserToCookie,
    deleteUserFromCookie
}