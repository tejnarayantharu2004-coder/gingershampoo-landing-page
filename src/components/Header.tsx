import Image from "next/image";
import Link from "next/link";
import { product } from "@/lib/product";
import { OrderButton } from "./OrderButton";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-leaf-100/80 bg-white/90 backdrop-blur">
      <div className="section-shell flex min-h-20 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <Image src={product.logo} alt={product.brandName} width={220} height={75} className="h-12 w-auto object-contain" priority />
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-semibold text-ink/70 md:flex">
          <a href="#benefits" className="hover:text-forest">Benefits</a>
          <a href="#testimonials" className="hover:text-forest">Reviews</a>
          <a href="#faq" className="hover:text-forest">FAQ</a>
        </nav>
        <OrderButton label="Purchase Now" className="hidden md:inline-flex" />
      </div>
    </header>
  );
}
