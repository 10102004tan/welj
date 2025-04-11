import { ExceptionFilter, Catch, ArgumentsHost, HttpException, BadRequestException, HttpStatus } from '@nestjs/common';

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

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus
      ? exception.getStatus()
      : HttpStatus.BAD_REQUEST;

    const exceptionResponse = exception.getResponse() as {
      message: string | string[];
    };

    let message = 'Validation failed';
    let errors : string[] = [];

    // Extract validation errors if they exist
    if (typeof exceptionResponse === 'object' && Array.isArray(exceptionResponse.message)) {
      errors = exceptionResponse.message;
    }

    // Format the response
    response.status(status).json({
      statusCode: status,
      message,
      errors,
    });
  }
}
