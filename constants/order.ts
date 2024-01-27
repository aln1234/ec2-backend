export const PAYMENT_METHOD = ["Credit Card", "PayPal", "Cash"] as const;
export const PAYMENT_STATUS = [
  "Paid",
  "Pending",
  "Refunded",
  "Cancelled",
] as const;
export const ORDER_STATUS = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
] as const;
export const ORDER_ADDRESS_TYPE = ["shipping", "billing"] as const;
