import {Module, Mutation, MutationAction, VuexModule} from "vuex-module-decorators";
import Cookies from "js-cookie";
import {DefaultBody, GithubPrivateUser} from "domain/src";
import {githubService} from '@/services';

@Module({
  namespaced: true
})
export class userStore extends VuexModule {
  userInfo: GithubPrivateUser|null = JSON.parse(localStorage.getItem('userInfo') || 'null')

  get accessToken (): string {
    return Cookies.get('access_token') || '';
  }

  @MutationAction
  public async SET_USER_INFO ({ id, password }: DefaultBody) {
    const userInfo: GithubPrivateUser = await githubService.fetchAuth({ id, password });
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    return { userInfo };
  }

  @Mutation
  public LOGOUT () {
    Cookies.remove('access_token');
    localStorage.removeItem('userInfo');
    this.userInfo = null;
  }
}