import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { OpportunitiesModule } from './opportunities/opportunities.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    OpportunitiesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
