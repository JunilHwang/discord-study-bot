import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {GithubModule} from "./api/hook/hook.module";
import {DiscordModule} from "./api/discord/discord.module";

@Module({
  imports: [DiscordModule, GithubModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
