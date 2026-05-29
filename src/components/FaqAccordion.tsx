"use client";

import { ChevronDown } from "lucide-react";
import { product } from "@/lib/product";

export function FaqAccordion() {
  return (
    <div className="mx-auto max-w-3xl divide-y divide-leaf-100 rounded-3xl border border-leaf-100 bg-white shadow-premium">
      {product.faqs.map((faq, index) => (
        <details key={faq.question} className="group p-5" open={index === 0}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-ink">
            {faq.question}
            <ChevronDown className="h-5 w-5 flex-none text-forest transition group-open:rotate-180" />
          </summary>
          <p className="mt-3 leading-7 text-ink/70">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
