import {CacheInterceptor, CacheModule, Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {GithubModule} from "./api/github/github.module";
import {DiscordModule} from "./api/discord/discord.module";
import {APP_INTERCEPTOR} from "@nestjs/core";
import {CommonModule} from "./api/common/common.module";

const appCacheInterceptor = {
  provide: APP_INTERCEPTOR,
  useClass: CacheInterceptor,
}

@Module({
  imports: [DiscordModule, GithubModule, CommonModule, CacheModule.register()],
  controllers: [AppController],
  providers: [AppService, appCacheInterceptor],
})
export class AppModule {}
