import {Module, MutationAction, VuexModule} from "vuex-module-decorators";
import Cookies from "js-cookie";
import {DefaultBody, GithubPrivateUser} from "domain/src";
import {githubService} from '@/services';

@Module({
  namespaced: true
})
export class userStore extends VuexModule {
  userInfo: GithubPrivateUser|null = null

  get accessToken (): string {
    return Cookies.get('access_token') || '';
  }

  @MutationAction
  async SET_USER_INFO ({ id, password }: DefaultBody) {
    const userInfo: GithubPrivateUser = await githubService.fetchAuth({ id, password });
    return { userInfo };
  }
}