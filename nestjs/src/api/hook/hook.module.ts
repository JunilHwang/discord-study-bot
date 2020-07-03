import {Module} from "@nestjs/common";
import {HookService} from "./hook.service";
import {DiscordModule} from "../discord/discord.module";
import {HookController} from "./hook.controller";

@Module({
  imports: [ DiscordModule ],
  providers: [ HookService ],
  controllers: [ HookController ],
})
export class HookModule {};