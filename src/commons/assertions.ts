import { BadRequestException } from '@nestjs/common';

export class Assert {
    static isTrue(expression: boolean, message?: string): void {
        if (!expression) {
            Assert.throwException(message);
        }
    }

    static notNull(object: any, message?: string): void {
        if (!object) {
            Assert.throwException(message);
        }
    }

    static isNull(object: any, message?: string): void {
        if (object) {
            Assert.throwException(message);
        }
    }

    private static throwException(message?: string): void {
        throw new BadRequestException(message);
    }
}
