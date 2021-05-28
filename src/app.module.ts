import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorsModule } from './authors/authors.module';

@Module({
  imports: [TypeOrmModule.forRoot(), AuthorsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
