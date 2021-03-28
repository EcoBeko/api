import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import { DatabaseError as PGException } from "pg-protocol";
import { GenericExceptionFilter } from "./generic-exception.filter";

@Catch(PGException)
export class PGExceptionFilter extends GenericExceptionFilter
  implements ExceptionFilter {
  catch(exception: PGException, host: ArgumentsHost) {
    this.fromContext(host);

    let message = "";
    try {
      message = JSON.parse(exception.message);
    } catch (error) {
      message = exception.message;
    }
    const statusCode = HttpStatus.BAD_REQUEST;

    Logger.error(message);
    this.sendError(statusCode, message);
  }
}
