import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { ValidateCustomerAccountMiddleware } from './middlewares/validate-customer-account.middleware';
import { ValidateCustomerMiddleware } from './middlewares/validate-customer.middleware';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService],
})
// export class CustomersModule {}

// Implementando Middleware
export class CustomersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateCustomerMiddleware, ValidateCustomerAccountMiddleware)
      .exclude(
        {
          path: '/customers/create',
          method: RequestMethod.POST,
        },
        {
          path: '/customers',
          method: RequestMethod.GET,
        },
      )
      .forRoutes(CustomersController);
  }
}

/*
  Middleware que invoca a todas las rutas de customers
  consumer.apply(ValidateCustomerMiddleware).forRoutes(CustomersController);
*/

/*
Middleware para incluir solo algunas rutas

export class CustomersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidateCustomerMiddleware).forRoutes(
      {
        path: 'customers/search/:id', // middleware solo para esta ruta
        method: RequestMethod.GET,
      },
      {
        path: 'customers/:id',
        method: RequestMethod.GET,
      },
    );
  }
}

*/
