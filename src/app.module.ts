import { Module, Req } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [

    ConfigModule.forRoot({
      envFilePath:".env",
      isGlobal:true
    }),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory: async (configService:ConfigService) => ({
        type:'mysql',
        host:configService.getOrThrow<string>("DB_HOST"),
        username:configService.getOrThrow<string>("DB_USERNAME"),
        port:configService.getOrThrow<number>("PORT"),
        password:configService.getOrThrow<string>("DB_PASSWORD"),
        database:configService.getOrThrow<string>("DB_NAME"),
        entities:[__dirname + "/**/*.entity{.ts,.js}"],
        synchronize:true
      }),
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver:ApolloDriver,
      useFactory:async(configService:ConfigService) => ({
        autoSchemaFile: join(process.cwd(),'src/schema.gql'),
        playground:configService.getOrThrow('GRAPHQL_PLAYGROUND'),
        context:({req,resp}) => ({req,resp})
      }),
      imports:[ConfigModule],
      inject:[ConfigService]

    }),
    UserModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
