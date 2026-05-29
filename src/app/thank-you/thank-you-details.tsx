"use client";

import { useSearchParams } from "next/navigation";
import { formatPrice, product } from "@/lib/product";

export function ThankYouDetails() {
  const params = useSearchParams();
  const productName = params.get("product") || product.name;
  const quantity = params.get("quantity") || "1";
  const total = Number(params.get("total") || product.offerPrice);
  const orderId = params.get("orderId");

  return (
    <div className="mx-auto mt-8 max-w-md rounded-3xl border border-leaf-100 bg-leaf-50 p-5 text-left">
      <Detail label="Order ID" value={orderId || "Confirmed"} />
      <Detail label="Product ordered" value={productName} />
      <Detail label="Quantity" value={quantity} />
      <Detail label="Total price" value={formatPrice(total)} />
      <Detail label="Payment method" value="Cash On Delivery" />
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-leaf-200 py-3 last:border-0">
      <span className="text-ink/65">{label}</span>
      <strong className="text-right text-ink">{value}</strong>
    </div>
  );
}
