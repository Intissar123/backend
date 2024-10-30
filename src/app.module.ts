import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { ArticlesModule } from './articles/articles.module';
import { TvasModule } from './tvas/tvas.module';
import { CategoriesModule } from './categories/categories.module';
import { SubCategoryModule } from './sub-category/sub-category.module';
import { ServicesModule } from './services/services.module';
import { ServiceCategoryModule } from './service-category/service-category.module';
//import { ServiceSubCategoryModule } from './service-sub-category/service-sub-category.module';
import { DevisModule } from './devis/devis.module';
import { FactureModule } from './facture/facture.module';

import { DepotModule } from './depot/depot.module';

import { FournisseurModule } from './fournisseur/fournisseur.module';
import { CmdfournisseurModule } from './cmdfournisseur/cmdfournisseur.module';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';
import { CouponModule } from './coupon/coupon.module';


@Module({
  imports: [UsersModule, ConfigModule.forRoot({ isGlobal: true }), ArticlesModule, TvasModule, CategoriesModule, SubCategoryModule, ServicesModule, ServiceCategoryModule, DevisModule, FactureModule, DepotModule, FournisseurModule, CmdfournisseurModule, AuthModule, OrderModule, CouponModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
