import { DefaultBody } from 'domain/src'
import $http from 'axios'

const BASE_URL: string = '/api/github'
const AUTH_URL: string = `${BASE_URL}/auth`

export const fetchAuth = ({ id, password }: DefaultBody) =>
  $http.post(AUTH_URL, { id, password })
       .then(response => response.data);