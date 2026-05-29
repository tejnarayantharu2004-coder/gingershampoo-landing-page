"use client";

import Image from "next/image";
import { Minus, Plus, ShieldCheck, Truck } from "lucide-react";
import { useMemo, useState } from "react";
import { formatPrice, product } from "@/lib/product";
import { OrderButton } from "./OrderButton";

export function ProductShowcase() {
  const [active, setActive] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const total = useMemo(() => (quantity >= 2 ? product.comboPrice : product.offerPrice * quantity), [quantity]);
  const priceEach = quantity >= 2 ? product.comboPrice / quantity : product.offerPrice;

  return (
    <section id="order" className="bg-white py-16 sm:py-20">
      <div className="section-shell grid items-center gap-10 lg:grid-cols-[1.03fr_.97fr]">
        <div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-leaf-100 bg-[#fbfff8] shadow-premium">
            <Image src={product.images[active]} alt={`${product.name} view ${active + 1}`} fill sizes="(min-width: 1024px) 48vw, 100vw" className="object-contain p-6" />
          </div>
          <div className="mt-4 grid grid-cols-5 gap-3">
            {product.images.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => setActive(index)}
                className={`focus-ring aspect-square overflow-hidden rounded-xl border bg-white ${active === index ? "border-forest ring-2 ring-leaf-200" : "border-leaf-100"}`}
                aria-label={`Show product image ${index + 1}`}
              >
                <Image src={image} alt="" width={180} height={180} className="h-full w-full object-contain p-2" />
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-leaf-100 bg-[#fbfff8] p-6 shadow-premium sm:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-forest">{product.brandName}</p>
          <h2 className="mt-3 text-3xl font-black text-ink sm:text-4xl">{product.name}</h2>
          <p className="mt-4 text-base leading-7 text-ink/70">{product.description}</p>

          <div className="mt-6 flex flex-wrap items-end gap-3">
            <span className="text-4xl font-black text-forest">{formatPrice(product.offerPrice)}</span>
            <span className="pb-1 text-lg font-bold text-ink/40 line-through">{formatPrice(product.price)}</span>
            <span className="rounded-full bg-ginger px-3 py-1 text-sm font-bold text-white">Combo {formatPrice(product.comboPrice)}</span>
          </div>

          <ul className="mt-6 space-y-3">
            {product.benefits.slice(0, 4).map((benefit) => (
              <li key={benefit} className="flex gap-3 text-sm font-semibold text-ink/75">
                <ShieldCheck className="mt-0.5 h-5 w-5 flex-none text-forest" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>

          <div className="mt-7 rounded-2xl border border-leaf-100 bg-white p-4">
            <div className="flex items-center justify-between gap-4">
              <span className="font-bold text-ink">Quantity</span>
              <div className="flex h-11 items-center rounded-full border border-leaf-200 bg-leaf-50">
                <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="focus-ring grid h-11 w-11 place-items-center rounded-full" aria-label="Decrease quantity">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-10 text-center font-black">{quantity}</span>
                <button type="button" onClick={() => setQuantity(quantity + 1)} className="focus-ring grid h-11 w-11 place-items-center rounded-full" aria-label="Increase quantity">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="mt-4 grid gap-2 text-sm text-ink/70">
              <div className="flex justify-between"><span>Price per piece</span><strong>{formatPrice(Math.round(priceEach))}</strong></div>
              <div className="flex justify-between"><span>Delivery fee</span><strong>Free</strong></div>
              <div className="flex justify-between border-t border-leaf-100 pt-3 text-lg text-ink"><span>Total</span><strong>{formatPrice(total)}</strong></div>
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <OrderButton quantity={quantity} label="Purchase Now" className="w-full sm:w-auto" />
            <OrderButton quantity={quantity} label="Buy Now" className="w-full bg-ginger hover:bg-orange-600 sm:w-auto" />
          </div>
          <div className="mt-5 flex items-center gap-2 text-sm font-bold text-forest">
            <Truck className="h-5 w-5" />
            Cash On Delivery available across Nepal
          </div>
        </div>
      </div>
    </section>
  );
}
