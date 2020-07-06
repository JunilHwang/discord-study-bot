import {Module} from "@nestjs/common";
import {GithubHookService} from "./github.hook.service";
import {DiscordModule} from "../discord/discord.module";
import {GithubController} from "./github.controller";
import {GithubFacade} from "./github.facade";

@Module({
  imports: [ DiscordModule ],
  providers: [ GithubFacade, GithubHookService ],
  controllers: [ GithubController ],
})
export class GithubModule {};
