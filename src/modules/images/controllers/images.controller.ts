import { Protected } from "@/core/decorators/protected.decorator";
import {
  Body,
  Controller,
  Inject,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { ImagesService } from "../services/images.service";
import path from "path";

const root = path.resolve(__dirname, "../../../../public");
const tempDir = path.join(root, "temp");

@Protected()
@ApiTags("images")
@Controller("images")
export class ImagesController {
  @Inject(ImagesService)
  private readonly service: ImagesService;

  @Post("/")
  @ApiOperation({
    summary: "Create or rewrite new image",
  })
  @ApiResponse({ status: 201, description: "Created" })
  @UseInterceptors(FileInterceptor("file", { dest: tempDir }))
  public async addImage(
    @UploadedFile() file: Express.Multer.File,
    @Body("path") filePath: string,
    @Body("name") name: string,
  ) {
    return this.service.addImage(file, filePath, name);
  }
}
