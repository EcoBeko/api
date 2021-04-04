import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import { GenericExceptionFilter } from "./generic-exception.filter";

@Catch()
export class AllExceptionFilter extends GenericExceptionFilter
  implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    this.fromContext(host);

    const message = exception.message;
    const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

    Logger.error(`[AllExceptionFilter] ${message}`, exception.stack);
    this.sendError(statusCode, message);
  }
}
