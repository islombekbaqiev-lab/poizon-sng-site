type BreadcrumbItem = { name: string; item: string }
type FaqItem = { q: string; a: string }

export function wrapGraph(nodes: any[]) {
  return { "@context": "https://schema.org", "@graph": nodes }
}

export function breadcrumbList(items: BreadcrumbItem[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: it.name,
      item: it.item,
    })),
  }
}

export function faqPage(items: FaqItem[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  }
}

export function howTo(name: string, description: string, steps: { title: string; body: string }[]) {
  return {
    "@type": "HowTo",
    name,
    description,
    step: steps.map((s) => ({
      "@type": "HowToStep",
      name: s.title,
      text: s.body,
    })),
  }
}

export function itemList(name: string, description: string, items: { url: string; name: string }[]) {
  return {
    "@type": "ItemList",
    name,
    description,
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: it.url,
      name: it.name,
    })),
  }
}

export function productLd(args: {
  name: string
  brand: string
  image?: string | null
  description: string
  priceRUB: number
  sellerName: string
}) {
  return {
    "@type": "Product",
    name: args.name,
    brand: { "@type": "Brand", name: args.brand },
    image: args.image || undefined,
    description: args.description,
    offers: {
      "@type": "Offer",
      priceCurrency: "RUB",
      price: args.priceRUB,
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: args.sellerName },
    },
  }
}

