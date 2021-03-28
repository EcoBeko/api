import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from "@nestjs/common";
import { GenericExceptionFilter } from "./generic-exception.filter";

@Catch(HttpException)
export class HttpExceptionFilter extends GenericExceptionFilter
  implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    this.fromContext(host);

    const message = exception.getResponse();
    const statusCode = exception.getStatus();

    if (statusCode >= 500) {
      Logger.error(message);
    }

    this.sendError(statusCode, message);
  }
}
