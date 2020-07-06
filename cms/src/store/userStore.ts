import {Module, VuexModule} from "vuex-module-decorators";
import Cookies from "js-cookie";

@Module
export class userStore extends VuexModule {
  token: string = Cookies.get("access_token") || ''
}