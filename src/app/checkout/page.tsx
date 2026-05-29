import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BadgeCheck, LockKeyhole, Truck } from "lucide-react";
import { CheckoutForm } from "@/components/CheckoutForm";
import { product } from "@/lib/product";

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-[#f6fbf2]">
      <div className="section-shell py-6">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-forest">
          <ArrowLeft className="h-4 w-4" />
          Back to product
        </Link>
      </div>
      <section className="section-shell grid gap-10 pb-16 lg:grid-cols-[.85fr_1.15fr]">
        <aside className="lg:sticky lg:top-8 lg:self-start">
          <div className="rounded-[28px] border border-leaf-100 bg-white p-6 shadow-premium">
            <Image src={product.logo} alt={product.brandName} width={260} height={86} className="h-16 w-auto object-contain" priority />
            <div className="mt-6 aspect-[4/5] overflow-hidden rounded-3xl bg-leaf-50">
              <Image src={product.images[0]} alt={product.name} width={620} height={780} className="h-full w-full object-contain p-5" />
            </div>
            <h1 className="mt-6 text-3xl font-black text-ink">Complete your COD order</h1>
            <p className="mt-3 leading-7 text-ink/70">Fill in your details and our sales representative will call you soon to confirm your order.</p>
            <div className="mt-6 grid gap-3 text-sm font-bold text-forest">
              <span className="inline-flex items-center gap-2"><Truck className="h-5 w-5" /> Cash On Delivery</span>
              <span className="inline-flex items-center gap-2"><BadgeCheck className="h-5 w-5" /> Product details auto-filled</span>
              <span className="inline-flex items-center gap-2"><LockKeyhole className="h-5 w-5" /> Secure server-side submission</span>
            </div>
          </div>
        </aside>
        <div>
          <CheckoutForm />
        </div>
      </section>
    </main>
  );
}
