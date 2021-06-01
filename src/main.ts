import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: false,
            forbidNonWhitelisted: true,
            forbidUnknownValues: false,
            disableErrorMessages: false,
            validationError: {
                value: true,
                target: true,
            },
            transform: true,
        }),
    );
    await app.listen(3000);
}
bootstrap();
