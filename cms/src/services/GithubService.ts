import { DefaultBody } from 'domain/src'
import $http from 'axios'

const BASE_URL: string = '/api/github'
const AUTH_URL: string = `${BASE_URL}/auth`
const LOGOUT_URL: string = `${BASE_URL}/logout`
const REPOS_URL: string = `${BASE_URL}/repos`
const HOOKS_URL: string = `${BASE_URL}/hooks`

export const fetchAuth = ({ id, password }: DefaultBody) =>
  $http.post(AUTH_URL, { id, password })
       .then(response => response.data)

export const logout = () =>
  $http.post(LOGOUT_URL)
       .then(response => response.data)

export const fetchRepos = (id: string) =>
  $http.get(`${REPOS_URL}/${id}`)
       .then(response => response.data)

export const fetchHooks = (urls: string) =>
  $http.get(HOOKS_URL, { params: { urls } })
       .then(response => response.data)