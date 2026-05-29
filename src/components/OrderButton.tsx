"use client";

import { useRouter } from "next/navigation";
import { product } from "@/lib/product";

type OrderButtonProps = {
  quantity?: number;
  label?: string;
  className?: string;
};

export function OrderButton({ quantity = 1, label = "Order Now", className = "" }: OrderButtonProps) {
  const router = useRouter();
  const price = quantity >= 2 ? product.comboPrice / quantity : product.offerPrice;
  const total = quantity >= 2 ? product.comboPrice : product.offerPrice * quantity;

  function goToCheckout() {
    const params = new URLSearchParams({
      product: product.name,
      quantity: String(quantity),
      price: String(Math.round(price)),
      total: String(total)
    });
    router.push(`/checkout?${params.toString()}`);
  }

  return (
    <button
      type="button"
      onClick={goToCheckout}
      className={`focus-ring inline-flex min-h-12 items-center justify-center rounded-full bg-forest px-6 py-3 text-sm font-bold text-white shadow-lg shadow-leaf-800/20 transition hover:bg-leaf-700 ${className}`}
    >
      {label}
    </button>
  );
}
