export type Testimonial = {
  title: string;
  quote: string;
  author: string;
};

export type Faq = {
  question: string;
  answer: string;
};

export const product = {
  brandName: "Kesh Care Nepal",
  name: "Ginger Shampoo",
  tagline: "कम Hair Fall, बढी Shine",
  headline: "Natural ginger care for cleaner scalp and stronger-looking hair",
  subheadline:
    "A premium Cash On Delivery shampoo offer for hair fall, dandruff, oily scalp, frizz, weak roots, and dull hair.",
  description:
    "Ginger Shampoo is a natural hair care solution made to help reduce hair fall, dandruff, excess oil, and frizz while supporting healthy hair growth. Enriched with ginger extract, it refreshes the scalp, strengthens hair roots, and keeps hair clean, soft, and manageable.",
  bestFor: "Hair fall, dandruff, oily scalp, frizzy hair, weak roots, and dull hair.",
  price: 200,
  offerPrice: 149,
  comboPrice: 300,
  currency: "Rs",
  deliveryFee: 0,
  images: [
    "/products/ginger-shampoo-1.png",
    "/products/ginger-shampoo-2.png",
    "/products/ginger-shampoo-3.png",
    "/products/ginger-shampoo-4.png",
    "/products/ginger-shampoo-5.png"
  ],
  logo: "/kesh-care-nepal-logo.png",
  benefits: [
    "Helps reduce hair fall by supporting stronger hair roots",
    "Helps control dandruff and keeps the scalp cleaner",
    "Controls excess oil for a fresh, non-greasy scalp",
    "Reduces frizz and makes hair smoother and more manageable",
    "Supports healthy hair growth with regular use"
  ],
  trustPoints: ["Cash on Delivery", "Fast delivery", "Customer support", "Easy order process"],
  testimonials: [
    {
      title: "Hair fall kam भएको महसुस भयो.",
      quote:
        "पहिले कपाल धेरै झर्थ्यो, तर Ginger Shampoo प्रयोग गरेपछि कपाल झर्ने समस्या कम भएको जस्तो लाग्यो। कपाल पनि पहिलेभन्दा soft र manageable भएको छ.",
      author: "Anita, Kathmandu"
    },
    {
      title: "Dandruff र oily scalp मा राम्रो लाग्यो.",
      quote:
        "मेरो scalp धेरै oily हुन्थ्यो र dandruff पनि थियो। यो shampoo प्रयोग गरेपछि scalp fresh feel भयो र dandruff पनि control भएको जस्तो लाग्यो.",
      author: "Sujan, Butwal"
    },
    {
      title: "Frizzy hair smooth भयो.",
      quote:
        "मेरो कपाल dry र frizzy थियो। Ginger Shampoo प्रयोग गरेपछि कपाल comb गर्न सजिलो भयो र smooth देखिन थाल्यो.",
      author: "Ritika, Pokhara"
    },
    {
      title: "Natural smell र clean feel मन पर्‍यो.",
      quote:
        "यो shampoo को smell strong छैन, natural type को छ। Wash गरेपछि hair fresh, clean र हल्का feel हुन्छ.",
      author: "Nisha, Chitwan"
    },
    {
      title: "Regular use गर्दा कपाल healthier देखियो.",
      quote:
        "मैले केही हप्ता regular use गरेँ। कपाल पहिलेभन्दा shiny र healthy-looking देखिन थाल्यो। Daily use को लागि राम्रो लाग्यो.",
      author: "Prakash, Bhairahawa"
    }
  ] satisfies Testimonial[],
  faqs: [
    {
      question: "What is Ginger Shampoo used for?",
      answer:
        "Ginger Shampoo is used to help reduce hair fall, dandruff, oily scalp, and frizz. It also supports stronger, healthier-looking hair with regular use."
    },
    {
      question: "Is Ginger Shampoo good for hair fall?",
      answer:
        "Yes, Ginger Shampoo may help reduce hair fall by keeping the scalp clean and supporting stronger hair roots. For best results, use it regularly."
    },
    {
      question: "Can Ginger Shampoo help control dandruff?",
      answer:
        "Yes, it helps clean the scalp and may reduce dandruff caused by excess oil, dirt, and scalp buildup."
    },
    {
      question: "Is this shampoo suitable for oily scalp?",
      answer:
        "Yes, Ginger Shampoo is suitable for oily scalp. It helps remove excess oil and gives a fresh, clean feeling after wash."
    },
    {
      question: "Does Ginger Shampoo help with frizzy hair?",
      answer:
        "Yes, it can help make hair smoother, softer, and easier to manage, which may reduce frizz."
    },
    {
      question: "How often should I use Ginger Shampoo?",
      answer:
        "You can use it 2-3 times a week, or as needed depending on your hair type and scalp condition."
    },
    {
      question: "Is Ginger Shampoo suitable for both men and women?",
      answer:
        "Yes, Ginger Shampoo can be used by both men and women who are facing hair fall, dandruff, oily scalp, or rough/frizzy hair."
    }
  ] satisfies Faq[]
};

export function formatPrice(value: number) {
  return `${product.currency} ${value.toLocaleString("en-NP")}`;
}
