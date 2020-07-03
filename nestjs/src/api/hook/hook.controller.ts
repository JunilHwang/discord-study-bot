import {Controller} from "@nestjs/common";
import {HookService} from "./hook.service";

@Controller('/api/github/hook')
export class HookController {
  constructor(private readonly hookService: HookService) {
  }
}