import { Purchase } from '../entities/purchase.entity';

export class PurchaseDetailsDto {
    email: string;

    address: string;

    total: number;

    hasCoupon: boolean;

    totalFinal: number;

    constructor(purchase: Purchase) {
        this.email = purchase.email;
        this.address = purchase.getAddressFormatted();
        this.total = purchase.order.getTotal();
        this.hasCoupon = !!purchase.discount;
        this.totalFinal = this.hasCoupon
            ? Number((this.total - Number((this.total * purchase.discount) / 100)).toFixed(2))
            : null;
    }
}
