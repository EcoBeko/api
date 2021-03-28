import { ArgumentsHost } from "@nestjs/common";
import { Response, Request } from "express";

export class GenericExceptionFilter {
  private response: Response;
  private request: Request;

  protected fromContext(host: ArgumentsHost) {
    const context = host.switchToHttp();
    this.response = context.getResponse<Response>();
    this.request = context.getRequest<Request>();

    return {
      response: this.response,
      request: this.request,
    };
  }

  protected sendError(statusCode: number, message: any) {
    this.response
      .status(statusCode)
      .json({
        successful: false,
        statusCode,
        message,
        timestamp: new Date().toISOString(),
        path: this.request.url,
      })
      .end();
  }
}
