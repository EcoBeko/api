import { Module } from "@nestjs/common";
import { EcoProjectsController } from "./controllers/eco-projects.controller";
import { EcoProjectsService } from "./services/eco-projects.service";

@Module({
  controllers: [EcoProjectsController],
  providers: [EcoProjectsService],
})
export class EcoProjectsModule {}
