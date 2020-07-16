import {Module, Mutation, MutationAction, VuexModule} from 'vuex-module-decorators'
import Cookies from 'js-cookie'
import {DefaultBody, GithubPrivateUser} from 'domain/src'
import {githubService} from '@/services'

@Module({
  namespaced: true
})
export class userStore extends VuexModule {
  userInfo: GithubPrivateUser|null = JSON.parse(localStorage.getItem('userInfo') || 'null')
  token: string = Cookies.get('access_token') || ''

  get id (): string {
    return this.userInfo?.login || ''
  }

  @MutationAction
  public async SET_USER_INFO ({ id, password }: DefaultBody) {
    const userInfo: GithubPrivateUser = await githubService.fetchAuth({ id, password })
    const token: string = Cookies.get('access_token') || ''
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
    return { userInfo, token }
  }

  @Mutation
  public LOGOUT () {
    Cookies.remove('access_token')
    localStorage.removeItem('userInfo')
    this.token = ''
    this.userInfo = null
  }
}