import { Order } from '../entities/order.entity';
import { Purchase } from '../entities/purchase.entity';

export type CreatePurchaseOrder = (purchase: Purchase) => Order;
