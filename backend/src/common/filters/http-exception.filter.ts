import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';

//HttpException
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // Get the HTTP context
    const response = ctx.getResponse(); // Get the response object
    const status = exception.getStatus(); // Get the status code from the exception

    response.status(status).json({
      statusCode: status,
      message: exception.message,
      stack: exception.stack, // Include the stack trace for debugging (optional)
    });
  }
}
