import { Injectable } from "@nestjs/common";
import path from "path";
import fs from "fs";

const root = path.resolve(__dirname, "../../../../public");
const tempDir = path.join(root, "temp");

@Injectable()
export class ImagesService {
  public async addImage(
    file: Express.Multer.File,
    filePath: string,
    name: string,
  ) {
    const extension = file.originalname.slice(
      file.originalname.lastIndexOf("."),
    );
    const fullName = name + extension;
    const dirPath = path.join(root, filePath);

    if (!fs.existsSync(dirPath)) {
      await fs.promises.mkdir(dirPath, {
        recursive: true,
      });
    }

    await fs.promises.rename(
      path.join(tempDir, file.filename),
      path.join(dirPath, fullName),
    );

    return {
      successful: true,
      path: path.join(filePath, fullName),
    };
  }
}
