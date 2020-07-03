import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {HookModule} from "./api/hook/hook.module";
import {DiscordModule} from "./api/discord/discord.module";

@Module({
  imports: [DiscordModule, HookModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
