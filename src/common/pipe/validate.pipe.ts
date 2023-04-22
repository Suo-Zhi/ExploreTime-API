import { HttpException, HttpStatus, ValidationError, ValidationPipe } from '@nestjs/common';

export class ValidatePipe extends ValidationPipe {
    protected flattenValidationErrors(errors: ValidationError[]): string[] {
        let msg = {};
        errors.forEach((error) => {
            msg[error.property] = Object.values(error.constraints);
        });

        throw new HttpException(
            {
                code: HttpStatus.UNPROCESSABLE_ENTITY,
                message: msg,
            },
            HttpStatus.UNPROCESSABLE_ENTITY,
        );
    }
}
