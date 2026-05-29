"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useMemo, useState } from "react";
import { formatPrice, product } from "@/lib/product";

type FieldErrors = Record<string, string[] | undefined>;

function CheckoutFormInner() {
  const router = useRouter();
  const params = useSearchParams();
  const quantity = Math.max(1, Number(params.get("quantity") || 1));
  const pricePerPiece = Math.max(1, Number(params.get("price") || product.offerPrice));
  const totalPrice = Math.max(1, Number(params.get("total") || pricePerPiece * quantity));
  const productName = params.get("product") || product.name;
  const [errors, setErrors] = useState<FieldErrors>({});
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const orderSummary = useMemo(
    () => ({ productName, quantity, pricePerPiece, totalPrice }),
    [productName, quantity, pricePerPiece, totalPrice]
  );

  async function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrors({});
    setMessage("");

    const form = new FormData(event.currentTarget);
    const payload = {
      fullName: String(form.get("fullName") || ""),
      phone: String(form.get("phone") || ""),
      email: String(form.get("email") || ""),
      location: String(form.get("location") || ""),
      ...orderSummary
    };

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        setErrors(data.errors || {});
        setMessage(data.message || "Order submission failed. Please try again.");
        return;
      }

      const thankYouParams = new URLSearchParams({
        product: data.order.productName,
        quantity: String(data.order.quantity),
        total: String(data.order.totalPrice),
        orderId: data.order.orderId
      });
      router.push(`/thank-you?${thankYouParams.toString()}`);
    } catch {
      setMessage("Unable to submit your order right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function fieldError(name: string) {
    return errors[name]?.[0];
  }

  return (
    <form onSubmit={submitOrder} className="grid gap-5 rounded-[28px] border border-leaf-100 bg-white p-6 shadow-premium sm:p-8">
      {message ? <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">{message}</div> : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full Name" name="fullName" error={fieldError("fullName")} />
        <Field label="Phone Number" name="phone" error={fieldError("phone")} />
      </div>
      <Field label="Email Address" name="email" type="email" error={fieldError("email")} />
      <label className="grid gap-2">
        <span className="text-sm font-bold text-ink">Exact Location</span>
        <textarea name="location" rows={4} placeholder="Kindly share your exact location" className="focus-ring resize-none rounded-2xl border border-leaf-200 bg-leaf-50 px-4 py-3" />
        {fieldError("location") ? <span className="text-sm font-semibold text-red-600">{fieldError("location")}</span> : null}
      </label>

      <div className="rounded-2xl border border-leaf-100 bg-leaf-50 p-4">
        <h2 className="text-lg font-black text-ink">Order Summary</h2>
        <div className="mt-4 grid gap-3 text-sm">
          <SummaryRow label="Product Name" value={productName} />
          <SummaryRow label="Quantity" value={String(quantity)} />
          <SummaryRow label="Price Per Piece" value={formatPrice(pricePerPiece)} />
          <SummaryRow label="Delivery Fee" value="Free" />
          <SummaryRow label="Total Price" value={formatPrice(totalPrice)} strong />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="focus-ring min-h-14 rounded-full bg-forest px-6 py-4 text-base font-black text-white shadow-lg shadow-leaf-800/20 transition hover:bg-leaf-700 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Submitting Order..." : "Order Now"}
      </button>
    </form>
  );
}

function Field({ label, name, type = "text", error }: { label: string; name: string; type?: string; error?: string }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-bold text-ink">{label}</span>
      <input name={name} type={type} className="focus-ring h-12 rounded-2xl border border-leaf-200 bg-leaf-50 px-4" />
      {error ? <span className="text-sm font-semibold text-red-600">{error}</span> : null}
    </label>
  );
}

function SummaryRow({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={`flex justify-between gap-4 ${strong ? "border-t border-leaf-200 pt-3 text-lg" : ""}`}>
      <span className="text-ink/65">{label}</span>
      <strong className="text-right text-ink">{value}</strong>
    </div>
  );
}

export function CheckoutForm() {
  return (
    <Suspense fallback={<div className="rounded-3xl bg-white p-8 shadow-premium">Loading checkout...</div>}>
      <CheckoutFormInner />
    </Suspense>
  );
}
