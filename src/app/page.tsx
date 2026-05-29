import Image from "next/image";
import { CheckCircle2, HeartHandshake, Leaf, PackageCheck, PhoneCall, Sparkles, Truck } from "lucide-react";
import { Header } from "@/components/Header";
import { OrderButton } from "@/components/OrderButton";
import { ProductShowcase } from "@/components/ProductShowcase";
import { FaqAccordion } from "@/components/FaqAccordion";
import { formatPrice, product } from "@/lib/product";

export default function HomePage() {
  return (
    <main>
      <Header />
      <Hero />
      <ProductShowcase />
      <Benefits />
      <Testimonials />
      <Faq />
      <FinalCta />
    </main>
  );
}

function Hero() {
  return (
    <section className="overflow-hidden bg-[radial-gradient(circle_at_75%_20%,#dff8d3_0,#fbfdf8_38%,#ffffff_100%)] py-14 sm:py-20">
      <div className="section-shell grid items-center gap-10 lg:grid-cols-[1fr_.9fr]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-leaf-200 bg-white px-4 py-2 text-sm font-bold text-forest shadow-sm">
            <Leaf className="h-4 w-4" />
            {product.tagline}
          </div>
          <h1 className="mt-6 max-w-3xl text-4xl font-black leading-[1.05] text-ink sm:text-6xl">
            {product.name} for cleaner scalp, smoother hair, and stronger-looking roots
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/72">{product.subheadline}</p>
          <p className="mt-4 max-w-2xl leading-7 text-ink/68">{product.description}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <OrderButton label="Purchase Now" className="w-full sm:w-auto" />
            <OrderButton label="Order Now" className="w-full bg-ginger hover:bg-orange-600 sm:w-auto" />
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {product.trustPoints.map((point) => (
              <div key={point} className="rounded-2xl border border-leaf-100 bg-white/80 p-3 text-center text-sm font-bold text-ink shadow-sm">
                {point}
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[520px]">
          <div className="absolute inset-x-8 bottom-6 h-24 rounded-full bg-ginger/18 blur-3xl" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] border border-leaf-100 bg-white shadow-premium">
            <Image src={product.images[0]} alt={product.name} fill priority sizes="(min-width: 1024px) 45vw, 100vw" className="object-contain p-5" />
          </div>
          <div className="absolute -bottom-4 left-4 right-4 rounded-3xl border border-leaf-100 bg-white/95 p-4 shadow-premium backdrop-blur">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-ink/60">Today&apos;s offer</p>
                <p className="text-2xl font-black text-forest">{formatPrice(product.offerPrice)}</p>
              </div>
              <div className="text-right text-sm font-bold text-ink/65">
                <span className="line-through">{formatPrice(product.price)}</span>
                <p className="text-ginger">Combo {formatPrice(product.comboPrice)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  const icons = [CheckCircle2, Sparkles, Leaf, HeartHandshake, PackageCheck];

  return (
    <section id="benefits" className="bg-[#f6fbf2] py-16 sm:py-20">
      <div className="section-shell">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-forest">Why buy this product</p>
          <h2 className="mt-3 text-3xl font-black text-ink sm:text-5xl">Daily hair care that feels clean, gentle, and premium</h2>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {product.benefits.map((benefit, index) => {
            const Icon = icons[index] || CheckCircle2;
            return (
              <div key={benefit} className="rounded-3xl border border-leaf-100 bg-white p-5 shadow-sm">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-leaf-100 text-forest">
                  <Icon className="h-6 w-6" />
                </div>
                <p className="mt-4 text-base font-bold leading-7 text-ink">{benefit}</p>
              </div>
            );
          })}
        </div>
        <div className="mt-10 flex justify-center">
          <OrderButton label="Buy Now" />
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section id="testimonials" className="bg-white py-16 sm:py-20">
      <div className="section-shell">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-forest">Customer stories</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-black text-ink sm:text-5xl">Trusted by customers who want softer, fresher hair</h2>
          </div>
          <OrderButton label="Order Now" />
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {product.testimonials.map((testimonial) => (
            <article key={testimonial.author} className="rounded-3xl border border-leaf-100 bg-[#fbfff8] p-6 shadow-sm">
              <div className="text-ginger">★★★★★</div>
              <h3 className="mt-4 text-xl font-black text-ink">{testimonial.title}</h3>
              <p className="mt-3 leading-7 text-ink/70">{testimonial.quote}</p>
              <p className="mt-5 font-black text-forest">{testimonial.author}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section id="faq" className="bg-[#f6fbf2] py-16 sm:py-20">
      <div className="section-shell">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-forest">FAQ</p>
          <h2 className="mt-3 text-3xl font-black text-ink sm:text-5xl">Questions before ordering</h2>
        </div>
        <FaqAccordion />
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="bg-forest py-16 text-white sm:py-20">
      <div className="section-shell grid items-center gap-8 md:grid-cols-[1fr_auto]">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-leaf-200">Cash On Delivery</p>
          <h2 className="mt-3 text-3xl font-black sm:text-5xl">Order {product.name} today and pay only after delivery</h2>
          <div className="mt-6 flex flex-wrap gap-3 text-sm font-bold text-leaf-100">
            <span className="inline-flex items-center gap-2"><Truck className="h-4 w-4" /> Fast delivery</span>
            <span className="inline-flex items-center gap-2"><PhoneCall className="h-4 w-4" /> Confirmation call</span>
            <span className="inline-flex items-center gap-2"><PackageCheck className="h-4 w-4" /> Easy order process</span>
          </div>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
          <OrderButton label="Purchase Now" className="bg-white text-forest hover:bg-leaf-50" />
          <OrderButton quantity={2} label="Combo Offer" className="bg-ginger hover:bg-orange-600" />
        </div>
      </div>
    </section>
  );
}
