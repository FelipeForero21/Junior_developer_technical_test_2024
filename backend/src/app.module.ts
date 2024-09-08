import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config'; 
import { CorralsModule } from './corrals/corrals.module';
import { AnimalsModule } from './animals/animals.module';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true, 
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT) || 5432, 
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      synchronize: true, 
      autoLoadEntities: true,
      ssl: {
        rejectUnauthorized: false, 
      },
    }),
    CorralsModule,
    AnimalsModule,
  ],
})
export class AppModule {}