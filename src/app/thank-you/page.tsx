import { Suspense } from "react";
import Link from "next/link";
import { CheckCircle2, Home } from "lucide-react";
import { ThankYouDetails } from "./thank-you-details";

export default function ThankYouPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_top,#dff8d3_0,#fbfdf8_38%,#ffffff_100%)] px-4 py-12">
      <section className="w-full max-w-2xl rounded-[32px] border border-leaf-100 bg-white p-6 text-center shadow-premium sm:p-10">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-leaf-100 text-forest">
          <CheckCircle2 className="h-9 w-9" />
        </div>
        <h1 className="mt-6 text-4xl font-black text-ink">Thank you for your order!</h1>
        <p className="mt-4 text-lg leading-8 text-ink/70">Our sales representative will call you soon to confirm your order.</p>
        <Suspense fallback={<div className="mt-8 rounded-2xl bg-leaf-50 p-5">Loading order details...</div>}>
          <ThankYouDetails />
        </Suspense>
        <Link href="/" className="focus-ring mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-bold text-white hover:bg-leaf-700">
          <Home className="h-4 w-4" />
          Back to Home
        </Link>
      </section>
    </main>
  );
}
