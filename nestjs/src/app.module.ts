import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {DiscordModule} from "./api/discord/discord.module";
import {HookModule} from "./api/hook/hook.module";

@Module({
  imports: [DiscordModule, HookModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
