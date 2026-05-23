export interface PurchaseOrderItemModel {
  productId: string;
  productName: string;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
}

export interface PurchaseOrderModel {
  id: string;
  placedAt: string;
  totalAmount: number;
  items: PurchaseOrderItemModel[];
}
