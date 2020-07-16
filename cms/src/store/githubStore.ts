import {Action, Module, Mutation, MutationAction, VuexModule} from 'vuex-module-decorators'
import Cookies from 'js-cookie'
import {DefaultBody, GithubCommonRequest, GithubPrivateUser, GithubTinyRepository} from 'domain/src'
import {githubService} from '@/services'

@Module({
  namespaced: true
})
export class githubStore extends VuexModule {
  repos: GithubTinyRepository[] = []

  @Mutation
  SET_REPOS (repos: GithubTinyRepository[]) {
    this.repos = repos
    console.log(repos);
  }

  @Action({ commit: 'SET_REPOS' })
  public async FETCH_REPOS (id: string): Promise<GithubTinyRepository[]> {
    return await githubService.fetchRepos(id)
  }
}