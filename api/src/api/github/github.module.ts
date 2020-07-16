import {Module} from "@nestjs/common";
import {DiscordModule} from "../discord/discord.module";
import {GithubController} from "./github.controller";
import {GithubHookService} from "./github.hook.service";
import {GithubService} from "./github.service";
import {GithubFacade} from "./github.facade";

@Module({
  imports: [ DiscordModule ],
  providers: [ GithubFacade, GithubHookService, GithubService ],
  controllers: [ GithubController ],
})
export class GithubModule {};
