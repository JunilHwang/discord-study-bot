import {Action, Module, Mutation, VuexModule} from 'vuex-module-decorators'
import {GithubHook, GithubTinyRepository} from 'domain/src'
import {githubService} from '@/services'

@Module({
  namespaced: true
})
export class githubStore extends VuexModule {
  repos: GithubTinyRepository[] = []
  hooks: GithubHook[] = []

  @Mutation
  public SET_REPOS (repos: GithubTinyRepository[]) {
    this.repos = repos;
  }

  @Mutation
  public SET_HOOKS (hooks: GithubHook[]) {
    this.hooks = hooks;
  }

  get selectedHook (): GithubHook|null {
    if (this.hooks.length === 0) return null;
    return this.hooks[0];
  }

  @Action({ commit: 'SET_REPOS' })
  public async FETCH_REPOS (id: string): Promise<GithubTinyRepository[]> {
    return await githubService.fetchRepos(id)
  }

  @Action({ commit: 'SET_HOOKS' })
  public async FETCH_HOOKS (repos: GithubTinyRepository[]): Promise<GithubHook[]> {
    const urls: string = repos.map(v => v.hooks_url).join(',');
    return await githubService.fetchHooks(urls);
  }
}