export type BrandData = {
  slug: string
  name: string
  nameRu: string
  tagline: string
  description: string
  models: { name: string; priceCny: string; priceRub: string; note?: string }[]
  sizeGuideSlug?: string
  keywords: string[]
  faq: { q: string; a: string }[]
  relatedBrands: string[]
}

export const BRANDS: BrandData[] = [
  {
    slug: "nike",
    name: "Nike",
    nameRu: "Найк",
    tagline: "Оригинальные кроссовки Nike с Poizon",
    description:
      "Покупайте оригинальные кроссовки Nike с платформы Poizon (得物) с доставкой в Россию, Казахстан и СНГ. Air Force 1, Air Max, Dunk, Jordan — все модели с сертификатом подлинности.",
    models: [
      { name: "Nike Air Force 1 Low White",    priceCny: "480–580 ¥",  priceRub: "~8 500 ₽" },
      { name: "Nike Dunk Low Retro",            priceCny: "550–700 ¥",  priceRub: "~10 000 ₽" },
      { name: "Nike Air Max 90",                priceCny: "580–750 ¥",  priceRub: "~10 500 ₽" },
      { name: "Nike Air Max 270",               priceCny: "520–680 ¥",  priceRub: "~9 500 ₽" },
      { name: "Nike ACG Mountain Fly",          priceCny: "580–780 ¥",  priceRub: "~10 500 ₽" },
      { name: "Nike Cortez",                    priceCny: "400–520 ¥",  priceRub: "~7 500 ₽" },
    ],
    sizeGuideSlug: "nike",
    keywords: [
      "купить Nike с Poizon", "Nike Россия оригинал", "Nike Air Force 1 цена",
      "Nike Dunk купить Россия", "найк кроссовки оригинал доставка",
      "Nike Poizon得物 СНГ", "купить найк дешево оригинал",
    ],
    faq: [
      {
        q: "Как купить Nike с Poizon в Россию?",
        a: "Напишите нам в Telegram @PoizonAdvisor — укажите модель, цвет и размер. Проверим наличие на Poizon, рассчитаем итоговую цену с доставкой и пришлём реквизиты. Авиадоставка 3–5 дней.",
      },
      {
        q: "Nike на Poizon — это оригинал?",
        a: "Да. Poizon (得物) — официальная платформа аутентификации. Каждый товар проходит многоступенчатую проверку: стежка, подошва, бирки, коробка. Вы получаете сертификат с QR-кодом.",
      },
      {
        q: "Почему Nike на Poizon дешевле чем в России?",
        a: "Китайский рынок Nike крупнее европейского — бренд ставит цены ниже. Плюс нет накруток российских дистрибьюторов. Nike AF1 в России — 12 000–16 000 ₽, на Poizon — 8 000–9 000 ₽ с доставкой.",
      },
      {
        q: "Какой размер брать в Nike?",
        a: "Air Force 1 идёт большемеркой — берите на 0.5 меньше своего. Dunk — по размеру. Подробная размерная сетка Nike на нашем сайте.",
      },
    ],
    relatedBrands: ["jordan", "adidas", "new-balance"],
  },
  {
    slug: "adidas",
    name: "Adidas",
    nameRu: "Адидас",
    tagline: "Оригинальные кроссовки Adidas с Poizon",
    description:
      "Adidas Samba, Campus, Gazelle, Ultraboost и Yeezy — все модели с платформы Poizon (得物) с доставкой в Россию и СНГ. Оригинал с сертификатом подлинности.",
    models: [
      { name: "Adidas Samba OG",          priceCny: "500–650 ¥",  priceRub: "~9 000 ₽" },
      { name: "Adidas Campus 00s",         priceCny: "480–600 ¥",  priceRub: "~8 500 ₽" },
      { name: "Adidas Gazelle",            priceCny: "450–580 ¥",  priceRub: "~8 000 ₽" },
      { name: "Adidas Ultraboost 22",      priceCny: "620–800 ¥",  priceRub: "~11 000 ₽" },
      { name: "Adidas Stan Smith",         priceCny: "380–500 ¥",  priceRub: "~7 000 ₽" },
      { name: "Adidas Forum Low",          priceCny: "420–560 ¥",  priceRub: "~7 800 ₽" },
    ],
    sizeGuideSlug: "adidas",
    keywords: [
      "купить Adidas с Poizon", "Adidas Samba купить Россия", "Adidas Campus 00s цена",
      "адидас оригинал доставка", "Adidas Gazelle купить СНГ",
      "Adidas Россия оригинал", "купить адидас дешево",
    ],
    faq: [
      {
        q: "Какой размер брать в Adidas Samba?",
        a: "Samba OG имеет узкую колодку — берите на 0.5 размера больше своего. Campus 00s — по размеру, Gazelle — по размеру или +0.5 при широкой стопе.",
      },
      {
        q: "Есть ли Yeezy на Poizon?",
        a: "Да, Yeezy 350, 700, 500 присутствуют на Poizon. Все проходят аутентификацию. Цены зависят от модели и цвета — напишите нам с конкретным артикулом.",
      },
      {
        q: "Сколько стоит Adidas Samba с доставкой в Россию?",
        a: "Adidas Samba OG на Poizon: 500–650 ¥ + авиадоставка ~200 ¥ + наша комиссия. Итого около 9 000–11 000 ₽ до двери. В российских магазинах — 14 000–20 000 ₽.",
      },
      {
        q: "Adidas на Poizon — оригинал или реплика?",
        a: "Только оригинал. Poizon — аутентификационная платформа с обязательной экспертизой каждого товара перед отправкой. Каждый заказ получает сертификат с QR-кодом для проверки.",
      },
    ],
    relatedBrands: ["nike", "new-balance", "puma"],
  },
  {
    slug: "jordan",
    name: "Jordan",
    nameRu: "Джордан",
    tagline: "Оригинальные Jordan с Poizon — Air Jordan 1, 4, 11",
    description:
      "Air Jordan 1, 4, 11, Jordan Low и все ретро-коллаборы с платформы Poizon (得物). Доставка в Россию, Казахстан и СНГ. Каждый товар с сертификатом подлинности.",
    models: [
      { name: "Air Jordan 1 Low",          priceCny: "550–750 ¥",  priceRub: "~10 000 ₽" },
      { name: "Air Jordan 1 Mid",          priceCny: "600–800 ¥",  priceRub: "~11 000 ₽" },
      { name: "Air Jordan 1 High OG",      priceCny: "750–1 200 ¥", priceRub: "~14 000 ₽" },
      { name: "Air Jordan 4 Retro",        priceCny: "900–1 500 ¥", priceRub: "~17 000 ₽" },
      { name: "Air Jordan 11 Retro",       priceCny: "850–1 300 ¥", priceRub: "~16 000 ₽" },
      { name: "Jordan Spizike Low",        priceCny: "500–680 ¥",  priceRub: "~9 500 ₽" },
    ],
    sizeGuideSlug: "jordan",
    keywords: [
      "купить Jordan с Poizon", "Air Jordan 1 цена Россия", "Jordan купить оригинал",
      "джордан кроссовки доставка", "Air Jordan 4 купить СНГ",
      "Jordan Россия оригинал", "Air Jordan Low купить",
    ],
    faq: [
      {
        q: "Какой размер брать в Air Jordan 1?",
        a: "Jordan 1 High и Mid — по размеру или +0.5 при широкой стопе. Jordan 1 Low — по размеру. Подробная размерная сетка Jordan на нашем сайте.",
      },
      {
        q: "Air Jordan 4 есть на Poizon?",
        a: "Да, Jordan 4 (White Cement, Military Black, Red Thunder и другие ретро) есть на Poizon. Цена: 900–1 500 ¥ в зависимости от релиза.",
      },
      {
        q: "В чём разница Jordan 1 Low, Mid и High?",
        a: "Low — низкий борт, классика. Mid — средний, чуть больше поддержки. High OG — оригинальный баскетбольный силуэт с высоким голенищем. High OG — самые коллекционируемые и дорогие.",
      },
      {
        q: "Сколько стоит Air Jordan 1 с доставкой в Россию?",
        a: "Jordan 1 Low: 550–750 ¥ + доставка ~200 ¥ + комиссия = ~10 000–13 000 ₽. Jordan 1 High OG на хайповых цветах дороже. В Russia — 20 000–35 000 ₽ в ресейле.",
      },
    ],
    relatedBrands: ["nike", "adidas", "new-balance"],
  },
  {
    slug: "new-balance",
    name: "New Balance",
    nameRu: "Нью Баланс",
    tagline: "Оригинальные New Balance с Poizon — 990, 550, 2002R",
    description:
      "New Balance 990, 550, 2002R, 1906R и другие модели с платформы Poizon (得物). Made in USA серия, коллаборы. Доставка в Россию и СНГ с сертификатом подлинности.",
    models: [
      { name: "New Balance 550 White Navy", priceCny: "480–620 ¥",  priceRub: "~8 500 ₽" },
      { name: "New Balance 990v6 Grey",     priceCny: "720–900 ¥",  priceRub: "~13 000 ₽", note: "Made in USA" },
      { name: "New Balance 2002R",          priceCny: "580–750 ¥",  priceRub: "~10 500 ₽" },
      { name: "New Balance 1906R",          priceCny: "560–720 ¥",  priceRub: "~10 000 ₽" },
      { name: "New Balance 327",            priceCny: "440–580 ¥",  priceRub: "~8 000 ₽" },
      { name: "New Balance 574",            priceCny: "380–500 ¥",  priceRub: "~7 000 ₽" },
    ],
    sizeGuideSlug: "new-balance",
    keywords: [
      "купить New Balance с Poizon", "New Balance 550 купить Россия",
      "New Balance 990 цена", "NB 2002R купить СНГ",
      "нью баланс оригинал доставка", "New Balance Made in USA купить",
    ],
    faq: [
      {
        q: "New Balance 990 Made in USA — это действительно американское производство?",
        a: "Да, New Balance 990 (v3, v5, v6) собирается на заводах в Массачусетсе, США. Это один из немногих массовых кроссовок с реальной американской сборкой. На Poizon присутствуют оригинальные Made in USA версии.",
      },
      {
        q: "New Balance 550 или 990 — что выбрать?",
        a: "550 — низкий баскетбольный силуэт, streetwear, узкая колодка. 990 — массивный dad-shoe, широкая колодка, для комфорта. Подробное сравнение в нашем блоге.",
      },
      {
        q: "Какой размер брать в New Balance?",
        a: "NB 550 — берите +0.5 от вашего размера (узкая колодка). NB 990, 574 — по размеру, иногда идут на 0.5 больше у узконогих.",
      },
    ],
    relatedBrands: ["nike", "asics", "hoka"],
  },
  {
    slug: "asics",
    name: "Asics",
    nameRu: "Асикс",
    tagline: "Оригинальные Asics с Poizon — Gel-Kayano, Gel-Nimbus, GT-2160",
    description:
      "Asics Gel-Kayano 14, GT-2160, Gel-Nimbus и другие модели с Poizon (得物). Японский бренд с культовыми силуэтами — доставка в Россию и СНГ.",
    models: [
      { name: "Asics Gel-Kayano 14",       priceCny: "520–700 ¥",  priceRub: "~9 500 ₽" },
      { name: "Asics GT-2160",             priceCny: "480–650 ¥",  priceRub: "~9 000 ₽" },
      { name: "Asics Gel-Nimbus 9",        priceCny: "500–680 ¥",  priceRub: "~9 200 ₽" },
      { name: "Asics Gel-1130",            priceCny: "450–600 ¥",  priceRub: "~8 300 ₽" },
      { name: "Asics Gel-NYC",             priceCny: "480–640 ¥",  priceRub: "~9 000 ₽" },
    ],
    sizeGuideSlug: undefined,
    keywords: [
      "купить Asics с Poizon", "Asics Gel-Kayano 14 цена Россия",
      "Asics GT-2160 купить", "асикс оригинал доставка",
      "Asics Россия оригинал", "Gel-Kayano купить СНГ",
    ],
    faq: [
      {
        q: "Asics Gel-Kayano 14 — для бега или для улицы?",
        a: "Исторически беговая модель, но Kayano 14 стал streetwear-иконой. Сейчас это один из самых модных silhouttes в категории Y2K running. Для реального бега лучше Kayano современных серий.",
      },
      {
        q: "Какой размер брать в Asics?",
        a: "Asics идёт по размеру или +0.5 — зависит от модели. Gel-Kayano 14 и GT-2160 рекомендуем брать +0.5 от вашего стандартного размера.",
      },
    ],
    relatedBrands: ["new-balance", "hoka", "salomon"],
  },
  {
    slug: "salomon",
    name: "Salomon",
    nameRu: "Саломон",
    tagline: "Оригинальные Salomon с Poizon — XT-6, Speedcross, ACS Pro",
    description:
      "Salomon XT-6, XT-6 GTX, Speedcross 5, ACS Pro и другие трейл-силуэты с Poizon (得物). Лучший выбор для русской зимы — доставка в Россию и СНГ.",
    models: [
      { name: "Salomon XT-6",              priceCny: "620–850 ¥",  priceRub: "~11 500 ₽" },
      { name: "Salomon XT-6 GTX",          priceCny: "700–950 ¥",  priceRub: "~13 000 ₽", note: "GORE-TEX" },
      { name: "Salomon Speedcross 5",       priceCny: "500–700 ¥",  priceRub: "~9 500 ₽" },
      { name: "Salomon ACS Pro",           priceCny: "680–900 ¥",  priceRub: "~12 500 ₽" },
      { name: "Salomon Pulsar Trail",      priceCny: "580–780 ¥",  priceRub: "~10 500 ₽" },
    ],
    sizeGuideSlug: "salomon",
    keywords: [
      "купить Salomon с Poizon", "Salomon XT-6 купить Россия",
      "Salomon XT-6 цена", "саломон оригинал доставка",
      "Salomon GTX зима купить", "Salomon XT купить СНГ",
    ],
    faq: [
      {
        q: "Salomon XT-6 подходит для зимы?",
        a: "Да. Contagrip-подошва держит на льду и снегу. Для настоящей влагозащиты берите версию XT-6 GTX с мембраной GORE-TEX. Обычный XT-6 — для сухой зимы.",
      },
      {
        q: "Какой размер брать в Salomon XT-6?",
        a: "Salomon идёт по размеру, но колодка немного уже стандартной. При широкой стопе берите +0.5.",
      },
    ],
    relatedBrands: ["hoka", "asics", "new-balance"],
  },
  {
    slug: "hoka",
    name: "Hoka",
    nameRu: "Хока",
    tagline: "Оригинальные Hoka с Poizon — Clifton, Bondi, Speedgoat",
    description:
      "Hoka Clifton 9, Bondi 8, Speedgoat 5 и другие модели с максимальной амортизацией с Poizon (得物). Доставка в Россию и СНГ.",
    models: [
      { name: "Hoka Clifton 9",            priceCny: "680–880 ¥",  priceRub: "~12 500 ₽" },
      { name: "Hoka Bondi 8",              priceCny: "750–950 ¥",  priceRub: "~13 500 ₽" },
      { name: "Hoka Speedgoat 5",          priceCny: "700–900 ¥",  priceRub: "~13 000 ₽" },
      { name: "Hoka Kawana 2",             priceCny: "620–820 ¥",  priceRub: "~11 500 ₽" },
    ],
    sizeGuideSlug: "hoka",
    keywords: [
      "купить Hoka с Poizon", "Hoka Clifton 9 цена Россия",
      "Hoka Bondi купить", "хока оригинал доставка",
      "Hoka Россия оригинал", "купить хока дешево",
    ],
    faq: [
      {
        q: "Hoka Clifton или Bondi — что выбрать?",
        a: "Clifton легче и более для бега. Bondi максимально толстая подошва — лучше для долгой ходьбы по городу. Оба греют стопу зимой за счёт EVA-подошвы.",
      },
      {
        q: "Какой размер брать в Hoka?",
        a: "Hoka идёт немного большемеркой — берите -0.5 от вашего стандартного или точно по размеру.",
      },
    ],
    relatedBrands: ["salomon", "asics", "new-balance"],
  },
  {
    slug: "puma",
    name: "Puma",
    nameRu: "Пума",
    tagline: "Оригинальные Puma с Poizon — Suede, Speedcat, Palermo",
    description:
      "Puma Suede, Speedcat, Palermo, RS-X и другие модели с Poizon (得物) с доставкой в Россию и СНГ.",
    models: [
      { name: "Puma Speedcat OG",          priceCny: "450–600 ¥",  priceRub: "~8 000 ₽" },
      { name: "Puma Palermo",              priceCny: "400–540 ¥",  priceRub: "~7 500 ₽" },
      { name: "Puma Suede Classic",        priceCny: "350–480 ¥",  priceRub: "~6 500 ₽" },
      { name: "Puma RS-X",                 priceCny: "420–560 ¥",  priceRub: "~7 800 ₽" },
    ],
    sizeGuideSlug: "puma",
    keywords: [
      "купить Puma с Poizon", "Puma Speedcat купить Россия",
      "Puma Palermo цена", "пума оригинал доставка",
      "Puma Россия оригинал", "Puma Suede купить",
    ],
    faq: [
      {
        q: "Puma Speedcat — почему стал популярным?",
        a: "Speedcat — гоночная модель Puma 90-х, ставшая модной через коллаборации и streetwear-тренд на low-profile силуэты. Очень плоская подошва — специфика Formula 1.",
      },
      {
        q: "Какой размер брать в Puma?",
        a: "Puma в целом идёт по размеру. Speedcat и Suede могут быть немного узкими — при широкой стопе +0.5.",
      },
    ],
    relatedBrands: ["adidas", "nike", "vans"],
  },
  {
    slug: "converse",
    name: "Converse",
    nameRu: "Конверс",
    tagline: "Оригинальные Converse с Poizon — Chuck 70, Run Star",
    description:
      "Converse Chuck Taylor, Chuck 70, Run Star Hike и другие модели с Poizon (得物). Классические кеды с доставкой в Россию и СНГ.",
    models: [
      { name: "Converse Chuck 70 Hi",      priceCny: "350–480 ¥",  priceRub: "~6 500 ₽" },
      { name: "Converse Chuck Taylor Low", priceCny: "300–420 ¥",  priceRub: "~5 800 ₽" },
      { name: "Converse Run Star Hike",    priceCny: "420–580 ¥",  priceRub: "~7 800 ₽" },
      { name: "Converse Chuck 70 Ox",      priceCny: "340–460 ¥",  priceRub: "~6 300 ₽" },
    ],
    sizeGuideSlug: "converse",
    keywords: [
      "купить Converse с Poizon", "Converse Chuck 70 цена Россия",
      "конверс оригинал доставка", "Converse Россия",
      "купить конверс дешево оригинал",
    ],
    faq: [
      {
        q: "Converse Chuck Taylor и Chuck 70 — в чём разница?",
        a: "Chuck 70 — премиум версия: более толстая резиновая подошва, лучший холст, дополнительный слой подкладки. Chuck Taylor All Star — базовая классика, тоньше и легче.",
      },
      {
        q: "Какой размер брать в Converse?",
        a: "Converse идёт большемеркой — берите на 1 размер меньше вашего стандартного (например если носите 43 — берите 42 в Converse).",
      },
    ],
    relatedBrands: ["vans", "nike", "puma"],
  },
  {
    slug: "vans",
    name: "Vans",
    nameRu: "Ванс",
    tagline: "Оригинальные Vans с Poizon — Old Skool, Authentic, Sk8-Hi",
    description:
      "Vans Old Skool, Authentic, Sk8-Hi, Era и коллаборы с платформы Poizon (得物). Классика скейтбординга с доставкой в Россию и СНГ.",
    models: [
      { name: "Vans Old Skool",            priceCny: "300–420 ¥",  priceRub: "~5 800 ₽" },
      { name: "Vans Authentic",            priceCny: "260–380 ¥",  priceRub: "~5 200 ₽" },
      { name: "Vans Sk8-Hi",               priceCny: "340–460 ¥",  priceRub: "~6 300 ₽" },
      { name: "Vans Era",                  priceCny: "280–400 ¥",  priceRub: "~5 500 ₽" },
    ],
    sizeGuideSlug: "vans",
    keywords: [
      "купить Vans с Poizon", "Vans Old Skool цена Россия",
      "ванс оригинал доставка", "Vans Россия оригинал",
      "купить ванс дешево", "Vans Sk8-Hi купить",
    ],
    faq: [
      {
        q: "Какой размер брать в Vans?",
        a: "Vans идут по размеру или +0.5. Old Skool и Authentic — стандартная колодка. Sk8-Hi немного больше — берите по размеру.",
      },
      {
        q: "Vans на Poizon — есть коллаборы?",
        a: "Да, на Poizon есть коллаборы Vans × Supreme, Vans × WTAPS и другие. Цены от 600 ¥ в зависимости от релиза.",
      },
    ],
    relatedBrands: ["converse", "puma", "nike"],
  },
]

export function getBrandBySlug(slug: string): BrandData | undefined {
  return BRANDS.find((b) => b.slug === slug)
}
