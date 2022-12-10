import Cookies from 'universal-cookie'

const accessToken = 'accessToken'
const userName = 'userName'

export function getAccessToken() {
  return new Cookies().get(accessToken)
}

export function setAccessToken(token, options = {}) {
  return new Cookies().set(accessToken, token, options)
}

export function removeAccessToken() {
  if (getAccessToken()) {
    return new Cookies().remove(accessToken)
  }
}

export function getUserName() {
  return new Cookies().get(userName)
}

export function setUserName(token, options = {}) {
  return new Cookies().set(userName, token, options)
}

export function removeUserName() {
  if (getUserName()) {
    return new Cookies().remove(userName)
  }
}
