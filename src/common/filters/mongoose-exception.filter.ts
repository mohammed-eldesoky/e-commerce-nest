import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Error as MongooseError, mongo } from 'mongoose';

@Catch()
export class MongooseExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errors: any = [];

    //  Mongoose Validation Error
    if (exception instanceof MongooseError.ValidationError) {
      status = HttpStatus.BAD_REQUEST;
      message = 'Validation failed';
      errors = Object.keys(exception.errors).map((key) => ({
        field: key,
        message: exception.errors[key].message,
      }));
    }

    //  Invalid ObjectId or wrong field type
    else if (exception instanceof MongooseError.CastError) {
      status = HttpStatus.BAD_REQUEST;
      message = `Invalid value for ${exception.path}: ${exception.value}`;
    }

    //  Duplicate key error (email already exists)
    else if (exception instanceof mongo.MongoServerError && exception.code === 11000) {
      status = HttpStatus.CONFLICT;
      message = 'Duplicate key error';
      const field = Object.keys(exception.keyValue)[0];
      errors = [
        {
          field,
          message: `${field} "${exception.keyValue[field]}" already exists`,
        },
      ];
    }

    //  Other known Mongoose error
    else if (exception instanceof MongooseError) {
      status = HttpStatus.BAD_REQUEST;
      message = exception.message;
    }

    //  Unknown error (log it for debugging)
    else {
      console.error(' Unknown Error:', exception);
      message = exception.message || message;
    }

    response.status(status).json({
      statusCode: status,
      message,
      errors,
    });
  }
}
