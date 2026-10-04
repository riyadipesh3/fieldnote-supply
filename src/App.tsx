import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'

/* ===========================================================================
   FIELDNOTE SUPPLY - outdoor and field goods storefront.

   Every number in CATALOG is sample catalogue data for the template, marked
   at the point of use. Yellow appears exactly three ways in this file: the
   filled newsletter band, the button resting hover state, and two solid stock
   chips. It is always a fill under near-black text and never a dot, a pip, a
   hairline, or a tint behind white type.
   ========================================================================= */

/* Scroll reveal uses IntersectionObserver, never a scroll listener, and
   collapses to fully visible under prefers-reduced-motion. */
function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          io.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

/* Section heading. Stacked vertically, never a split header. */
function SectionHead({
  kicker,
  title,
  body,
}: {
  kicker?: string
  title: string
  body?: string
}) {
  return (
    <div className="max-w-2xl">
      {kicker ? <p className="micro mb-5">{kicker}</p> : null}
      <h2 className="display display-md">{title}</h2>
      {body ? <p className="lede mt-6">{body}</p> : null}
    </div>
  )
}

/* Sample catalogue data. Prices are USD, deliberately round but not uniform.
   Pack and shelter weights below are illustrative sample specifications. */
const CATALOG = [
  {
    id: 'ridgeline',
    name: 'Ridgeline 2P Shelter',
    price: 329,
    cat: 'Shelter',
    note: 'Freestanding, packed weight 1.4 kg with stakes',
    stock: null as null | 'low' | 'out',
    seed: 'fieldnote-ridgeline-shelter-pitched-on-rock',
    alt: 'Two person tent pitched on a rocky ridge at first light',
  },
  {
    id: 'kestrel',
    name: 'Kestrel 35 Pack',
    price: 248,
    cat: 'Packs',
    note: '35 litres, load lifters, rain cover in the lid',
    stock: 'low' as const,
    seed: 'fieldnote-kestrel-backpack-on-trail-edge',
    alt: 'Loaded hiking backpack resting on a grassy trail edge',
  },
  {
    id: 'hearth',
    name: 'Hearth 400 Stove',
    price: 84,
    cat: 'Kitchen',
    note: '400 ml tank, piezo start, folds into its own case',
    stock: null,
    seed: 'fieldnote-camp-stove-and-pot-on-rock',
    alt: 'Small camping stove with a pot boiling on a flat rock',
  },
  {
    id: 'bivvy',
    name: 'Bivvy Ground Sheet',
    price: 74,
    cat: 'Shelter',
    note: 'Taped corners, cut two metres long, packs to the size of a paperback',
    stock: 'out' as const,
    seed: 'fieldnote-ground-sheet-and-stakes-on-mud',
    alt: 'Ground sheet and folding stakes laid out flat on mud',
  },
  {
    id: 'drift',
    name: 'Drift Rain Jacket',
    price: 198,
    cat: 'Clothing',
    note: 'Three layer, taped seams, two pit zips, hood drops into the collar',
    stock: 'low' as const,
    seed: 'fieldnote-rain-jacket-hanging-from-a-hook',
    alt: 'Rain jacket hanging from a hook against a plain wall',
  },
  {
    id: 'sling',
    name: 'Sling Pouch 4L',
    price: 58,
    cat: 'Packs',
    note: 'Waxed canvas, cross strap, fits a map and a bar',
    stock: null,
    seed: 'fieldnote-canvas-sling-pouch-on-a-map',
    alt: 'Small waxed canvas pouch lying on top of a folded paper map',
  },
  {
    id: 'cup',
    name: 'Field Cup, 300 ml',
    price: 16,
    cat: 'Kitchen',
    note: 'Titanium, stacks inside itself, no coating to flake',
    stock: null,
    seed: 'fieldnote-titanium-cup-next-to-a-camp-mug',
    alt: 'Titanium camp cup standing beside a folded cloth',
  },
  {
    id: 'spares',
    name: 'Buckle and Zip Kit',
    price: 9,
    cat: 'Spares',
    note: 'Four side release buckles, one zip, and a length of webbing',
    stock: null,
    seed: 'fieldnote-replacement-buckles-and-zip-on-workbench',
    alt: 'Replacement buckles and a zip laid out on a workbench',
  },
]

const CATEGORIES = [
  {
    name: 'Packs',
    count: 26,
    seed: 'fieldnote-category-packs-in-a-row',
    alt: 'A row of canvas and nylon packs hanging on a wall rail',
  },
  {
    name: 'Shelter',
    count: 18,
    seed: 'fieldnote-category-shelter-in-the-rain',
    alt: 'Tent fabric and guy lines in heavy rain on a hillside',
  },
  {
    name: 'Kitchen',
    count: 31,
    seed: 'fieldnote-category-kitchen-on-a-camp-table',
    alt: 'Camp cookware laid out on a folding camp table',
  },
  {
    name: 'Clothing',
    count: 12,
    seed: 'fieldnote-category-clothing-on-a-drying-line',
    alt: 'Rain shells drying on a line strung between two trees',
  },
]

const SHIPPING = [
  {
    q: 'When does an order leave the building',
    a: 'Orders placed before 11am on a weekday ship the same afternoon. Anything after that goes out the next working day, including orders placed over the weekend.',
  },
  {
    q: 'How long does delivery take',
    a: 'Ground delivery is three to five working days inside the continental United States. Express is next working day if you order before 11am, and costs more at checkout.',
  },
  {
    q: 'Do you ship outside the United States',
    a: 'We ship to Canada, the United Kingdom, Ireland, Germany, the Netherlands, and Japan. Customs duty is charged by the destination country, not by us, so nothing arrives with a bill attached.',
  },
  {
    q: 'What is the returns process',
    a: 'Send anything back within thirty days in a condition you would be willing to receive it in. We pay the return label. Refunds are issued to the original payment method within five working days of the parcel arriving.',
  },
  {
    q: 'What if something arrives broken',
    a: 'Photograph the damage before you unpack the rest, email the pictures, and we will replace the item on the next shipping day. No return required for anything that left here damaged.',
  },
]

const NAV = ['Shop', 'Categories', 'Warranty', 'Shipping']

function money(n: number) {
  return `$${n.toLocaleString('en-US')}`
}

export default function App() {
  const [navOpen, setNavOpen] = useState(false)
  const [open, setOpen] = useState<number | null>(0)
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [cart, setCart] = useState<Record<string, number>>({})
  const [added, setAdded] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [signing, setSigning] = useState(false)
  const [signed, setSigned] = useState(false)
  const timers = useRef<number[]>([])

  /* Catalogue skeleton stands in for the initial fetch, then clears. */
  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 420)
    return () => window.clearTimeout(t)
  }, [])

  useEffect(() => {
    const t = timers.current
    return () => t.forEach((id) => window.clearTimeout(id))
  }, [])

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0)

  const results = CATALOG.filter((p) => {
    const q = query.trim().toLowerCase()
    if (!q) return true
    return (
      p.name.toLowerCase().includes(q) ||
      p.cat.toLowerCase().includes(q) ||
      p.note.toLowerCase().includes(q)
    )
  })

  function addToCart(id: string) {
    setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }))
    setAdded(id)
    const t = window.setTimeout(() => setAdded(null), 1400)
    timers.current.push(t)
  }

  function onSubscribe(e: React.FormEvent) {
    e.preventDefault()
    const value = email.trim()
    if (!value) {
      setEmailError('Enter an email address.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      setEmailError('That address is missing something. Check for a typo.')
      return
    }
    setEmailError('')
    setSigning(true)
    const t = window.setTimeout(() => {
      setSigning(false)
      setSigned(true)
    }, 700)
    timers.current.push(t)
  }

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-[var(--color-ink)] focus:px-4 focus:py-2 focus:text-[var(--color-canvas)]"
      >
        Skip to content
      </a>

      {/* -------------------------------------------------------------- */}
      {/* NAV - one line at desktop, 72px, condensed away at md            */}
      {/* -------------------------------------------------------------- */}
      <header className="sticky top-0 z-40 border-b border-[var(--color-hairline)] bg-[var(--color-canvas)]/95 backdrop-blur-sm">
        <div className="shell flex h-[72px] items-center justify-between gap-6">
          <a
            href="#top"
            className="font-display text-[1.25rem] font-semibold tracking-[-0.01em] text-[var(--color-ink)] uppercase"
          >
            Fieldnote Supply
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-[0.9375rem] font-medium text-[var(--color-body)] transition-colors hover:text-[var(--color-ink)]"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="#shop"
              className="hidden items-center gap-2 text-[0.9375rem] font-medium text-[var(--color-ink)] md:flex"
            >
              Cart
              <span
                aria-hidden="true"
                className={`grid h-6 min-w-6 place-items-center px-1 font-mono text-[0.6875rem] ${
                  cartCount > 0
                    ? 'bg-[var(--color-accent)] text-[var(--color-on-accent)]'
                    : 'border border-[var(--color-hairline)] text-[var(--color-mute)]'
                }`}
              >
                {cartCount}
              </span>
              <span className="sr-only">items in cart</span>
            </a>
            <a href="#shop" className="btn btn-primary hidden lg:inline-flex">
              Shop the range
            </a>

            <button
              type="button"
              aria-label={navOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={navOpen}
              aria-controls="mobile-nav"
              onClick={() => setNavOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center border border-[var(--color-hairline)] text-[var(--color-ink)] md:hidden"
            >
              <span className="flex w-4 flex-col gap-[4px]">
                <span
                  className={`h-px w-full bg-[var(--color-ink)] transition-transform duration-200 ${
                    navOpen ? 'translate-y-[2.5px] rotate-45' : ''
                  }`}
                />
                <span
                  className={`h-px w-full bg-[var(--color-ink)] transition-transform duration-200 ${
                    navOpen ? '-translate-y-[2.5px] -rotate-45' : ''
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        {navOpen ? (
          <div id="mobile-nav" className="border-t border-[var(--color-hairline)] md:hidden">
            <nav className="shell flex flex-col py-4">
              {NAV.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setNavOpen(false)}
                  className="border-b border-[var(--color-hairline)] py-3.5 text-[1rem] font-medium text-[var(--color-ink)] last:border-b-0"
                >
                  {item}
                </a>
              ))}
              <a
                href="#shop"
                onClick={() => setNavOpen(false)}
                className="btn btn-primary mt-5 w-full"
              >
                Shop the range
              </a>
            </nav>
          </div>
        ) : null}
      </header>

      <main id="main">
        {/* ------------------------------------------------------------ */}
        {/* HERO - asymmetric split over a product photograph, 4 elements */}
        {/* ------------------------------------------------------------ */}
        <section id="top" className="shell pt-16 pb-14 md:pt-24 md:pb-20">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
            <div className="lg:col-span-8">
              <p className="micro mb-6">Established 2014</p>
              <h1 className="display display-xl">
                Made to be repaired,
                <br />
                not replaced.
              </h1>
              <p className="lede mt-7">
                Bags, shelters, and tools for people who go out in bad weather and
                would rather fix what they own.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a href="#shop" className="btn btn-primary">
                  Shop new arrivals
                </a>
                <a href="#warranty" className="btn btn-secondary">
                  Read the warranty
                </a>
              </div>
            </div>

            <div className="lg:col-span-4">
              <Reveal>
                <div className="frame aspect-3/4 w-full">
                  <img
                    src="https://picsum.photos/seed/fieldnote-waxed-pack-on-a-workbench/1000/1333"
                    alt="Waxed canvas backpack open on a workbench with repair kit beside it"
                    loading="eager"
                    width={1000}
                    height={1333}
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/* CATEGORIES - asymmetric block, one tall tile beside two      */}
        {/* ------------------------------------------------------------ */}
        <section id="categories" className="border-t border-[var(--color-hairline)] py-20 md:py-28">
          <div className="shell">
            <Reveal>
              <SectionHead
                title="Shop by category"
                body="Everything is stocked in one place, so a buckle replacement ships the same week as the pack it belongs to."
              />
            </Reveal>

            {/* Spans are 7/5 then 5/7. Auto placement therefore fills row one as
                7+5 and row two as 5+7, so the block is asymmetric and has no
                empty cell. Row heights are fixed in pairs to match those rows. */}
            <div className="mt-14 grid gap-x-7 gap-y-11 lg:grid-cols-12">
              {CATEGORIES.map((c, i) => (
                <Reveal
                  key={c.name}
                  delay={i * 70}
                  className={
                    i === 0
                      ? 'lg:col-span-7 lg:h-[440px]'
                      : i === 1
                        ? 'lg:col-span-5 lg:h-[440px]'
                        : i === 2
                          ? 'lg:col-span-5 lg:h-[360px]'
                          : 'lg:col-span-7 lg:h-[360px]'
                  }
                >
                  <a href="#shop" className="group flex h-full flex-col">
                    <div className="frame aspect-4/3 w-full flex-1 lg:aspect-auto">
                      <img
                        src={`https://picsum.photos/seed/${c.seed}/${i % 2 === 0 ? 1300 : 1100}/${
                          i % 2 === 0 ? 975 : 900
                        }`}
                        alt={c.alt}
                        loading="lazy"
                        width={i % 2 === 0 ? 1300 : 1100}
                        height={i % 2 === 0 ? 975 : 900}
                        className="group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="mt-4 flex items-baseline justify-between gap-4">
                      <h3 className="font-display text-[1.25rem] font-semibold uppercase tracking-[-0.005em] text-[var(--color-ink)]">
                        {c.name}
                      </h3>
                      <span className="font-mono text-[0.75rem] text-[var(--color-mute)]">
                        {c.count} items
                      </span>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/* SHOP - filterable product grid with prices, skeleton and empty */}
        {/* ------------------------------------------------------------ */}
        <section id="shop" className="border-t border-[var(--color-hairline)] py-20 md:py-28">
          <div className="shell">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <Reveal>
                <SectionHead
                  title="Best sellers and new stock"
                  body="Prices include tax where you live. Spare parts are listed alongside the gear they fit, not hidden in a separate section."
                />
              </Reveal>

              <Reveal delay={90} className="w-full lg:w-80">
                <label
                  htmlFor="shop-search"
                  className="label block"
                >
                  Search the range
                </label>
                <input
                  id="shop-search"
                  name="shop-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  aria-describedby="shop-search-hint"
                  placeholder="Shelter, packs, spares"
                  className="field mt-2"
                />
                <p id="shop-search-hint" className="mt-2 text-[0.8125rem] text-[var(--color-mute)]">
                  Filters the list as you type.
                </p>
              </Reveal>
            </div>

            {loading ? (
              <div
                role="status"
                aria-live="polite"
                className="mt-14 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4"
              >
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i}>
                    <div className="skeleton aspect-square w-full" />
                    <div className="skeleton mt-4 h-4 w-2/3" />
                    <div className="skeleton mt-2.5 h-3 w-1/2" />
                  </div>
                ))}
                <span className="sr-only">Loading the catalogue</span>
              </div>
            ) : results.length === 0 ? (
              <div className="mt-14 border border-[var(--color-hairline)] bg-[var(--color-surface)] p-10 text-center md:p-16">
                <h3 className="display display-md">Nothing matches that yet</h3>
                <p className="lede mx-auto mt-4">
                  We stock a small range and add to it slowly. Try a shorter word, or
                  ask us directly.
                </p>
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="btn btn-primary mt-8"
                >
                  Clear search
                </button>
              </div>
            ) : (
              <ul className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
                {results.map((p, i) => (
                  <Reveal key={p.id} delay={(i % 4) * 70}>
                    <li className="flex h-full flex-col">
                      <div className="frame aspect-square w-full">
                        <img
                          src={`https://picsum.photos/seed/${p.seed}/800/800`}
                          alt={p.alt}
                          loading="lazy"
                          width={800}
                          height={800}
                        />
                      </div>

                      <div className="mt-5 flex items-start justify-between gap-3">
                        <h3 className="font-display text-[1.0625rem] font-semibold leading-tight tracking-[-0.005em] text-[var(--color-ink)] uppercase">
                          {p.name}
                        </h3>
                        <span className="shrink-0 font-display text-[1.0625rem] font-semibold text-[var(--color-ink)]">
                          {money(p.price)}
                        </span>
                      </div>

                      <p className="mt-2.5 flex-1 text-[0.9375rem] leading-relaxed text-[var(--color-body)]">
                        {p.note}
                      </p>

                      <div className="mt-5 flex items-center justify-between gap-3">
                        {p.stock === 'low' ? (
                          <span className="bg-[var(--color-accent)] px-2 py-1 text-[0.6875rem] font-semibold tracking-[0.06em] text-[var(--color-on-accent)] uppercase">
                            Low stock
                          </span>
                        ) : (
                          <span className="text-[0.75rem] text-[var(--color-mute)]">
                            {p.cat}
                          </span>
                        )}

                        {p.stock === 'out' ? (
                          <button
                            type="button"
                            disabled
                            className="btn border-[var(--color-hairline)] text-[var(--color-mute)]"
                          >
                            Sold out
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => addToCart(p.id)}
                            className="btn btn-secondary"
                          >
                            {added === p.id ? 'Added' : 'Add to cart'}
                          </button>
                        )}
                      </div>
                    </li>
                  </Reveal>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/* WARRANTY - feature comparison as two column cards            */}
        {/* ------------------------------------------------------------ */}
        <section
          id="warranty"
          className="border-t border-[var(--color-hairline)] py-20 md:py-28"
        >
          <div className="shell">
            <Reveal>
              <SectionHead
                kicker="Service and warranty"
                title="What we do after the sale"
                body="Most outdoor gear gets replaced when it fails. Four commitments that are cheaper for us to keep."
              />
            </Reveal>

            <div className="mt-14 grid gap-5 md:grid-cols-2">
              {[
                {
                  t: 'Five years of free repairs',
                  d: 'Seams, stitching, buckles, zips, and poles are repaired at no charge for five years from the day it ships. Send it in and we return it within a week of it arriving.',
                },
                {
                  t: 'Parts sold on their own',
                  d: 'Buckles, zip sliders, webbing, pole sections, and stove jets are stocked separately and priced at cost, so a ten dollar part saves a two hundred dollar repair.',
                },
                {
                  t: 'No membership, no tiers',
                  d: 'Everyone gets the same warranty, the same shipping rates, and the same returns window. There is nothing to sign up for and nothing to spend more to unlock.',
                },
                {
                  t: 'Spare parts kept in stock',
                  d: 'We hold parts for everything we have ever sold. A buckle from a 2016 pack still fits, which is the whole reason we keep them.',
                },
              ].map((c, i) => (
                <Reveal key={c.t} delay={i * 70}>
                  <article className="h-full border border-[var(--color-hairline)] bg-[var(--color-surface)] p-7 md:p-9">
                    <h3 className="display display-md">{c.t}</h3>
                    <p className="mt-4 max-w-[46ch] text-[0.9375rem] leading-relaxed text-[var(--color-body)]">
                      {c.d}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/* SHIPPING - accordion disclosure, not a spec table            */}
        {/* ------------------------------------------------------------ */}
        <section
          id="shipping"
          className="border-t border-[var(--color-hairline)] py-20 md:py-28"
        >
          <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-4">
              <h2 className="display display-lg">
                Shipping
                <br />
                and returns
              </h2>
              <p className="lede mt-6">
                No tracking games and no restocking fee. If an order was not what you
                expected, sending it back is straightforward.
              </p>
              <a href="#shop" className="btn btn-secondary mt-8">
                Back to the range
              </a>
            </Reveal>

            <div className="lg:col-span-8">
              {SHIPPING.map((row, i) => {
                const isOpen = open === i
                return (
                  <Reveal key={row.q} delay={i * 50}>
                    <div className="border-t border-[var(--color-hairline)] last:border-b">
                      <h3>
                        <button
                          id={`ship-btn-${i}`}
                          type="button"
                          onClick={() => setOpen(isOpen ? null : i)}
                          aria-expanded={isOpen}
                          aria-controls={`ship-panel-${i}`}
                          className="flex w-full items-center justify-between gap-6 py-6 text-left"
                        >
                          <span className="font-display text-[1.125rem] font-semibold tracking-[-0.005em] text-[var(--color-ink)] uppercase">
                            {row.q}
                          </span>
                          <span
                            aria-hidden="true"
                            className="relative grid h-6 w-6 shrink-0 place-items-center border border-[var(--color-hairline)]"
                          >
                            <span className="absolute h-px w-2.5 bg-[var(--color-ink)]" />
                            <span
                              className={`absolute h-2.5 w-px bg-[var(--color-ink)] transition-transform duration-200 ${
                                isOpen ? 'scale-y-0' : ''
                              }`}
                            />
                          </span>
                        </button>
                      </h3>
                      <div
                        id={`ship-panel-${i}`}
                        className="acc-panel"
                        data-open={isOpen}
                        role="region"
                        aria-labelledby={`ship-btn-${i}`}
                      >
                        <div>
                          <p className="max-w-[62ch] pb-7 text-[0.9375rem] leading-relaxed text-[var(--color-body)]">
                            {row.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/* NEWSLETTER - filled yellow band, near-black text throughout   */}
        {/* ------------------------------------------------------------ */}
        <section className="band">
          <div className="shell py-16 md:py-20">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
              <Reveal className="lg:col-span-6">
                <h2 className="display display-lg">
                  One letter a month.
                  <br />
                  Restock news and repair clinics.
                </h2>
                <p className="lede mt-6">
                  Free ground shipping on orders over fifty dollars. One email a month,
                  unsubscribe from any of them.
                </p>
              </Reveal>

              <Reveal delay={90} className="lg:col-span-6">
                {signed ? (
                  <div className="border-2 border-[var(--color-on-accent)] p-8">
                    <h3 className="display display-md">You are on the list</h3>
                    <p className="mt-3 text-[0.9375rem] text-[var(--color-on-accent)]">
                      We sent a confirmation to {email.trim()}. Open it to finish signing
                      up, otherwise nothing will arrive.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSigned(false)
                        setEmail('')
                      }}
                      className="btn btn-band mt-7 border-[var(--color-on-accent)]"
                    >
                      Use another address
                    </button>
                  </div>
                ) : (
                  <form onSubmit={onSubscribe} noValidate className="grid gap-5">
                    <div className="grid gap-2">
                      <label
                        htmlFor="news-email"
                        className="text-[0.875rem] font-semibold text-[var(--color-on-accent)]"
                      >
                        Email address
                      </label>
                      <input
                        id="news-email"
                        name="news-email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value)
                          if (emailError) setEmailError('')
                        }}
                        aria-invalid={emailError ? 'true' : 'false'}
                        aria-describedby={`news-hint${emailError ? ' news-error' : ''}`}
                        className="field"
                      />
                      <p id="news-hint" className="text-[0.8125rem] text-[var(--color-on-accent)]/75">
                        We use this for the monthly letter and order updates. Nothing
                        else.
                      </p>
                      {emailError ? (
                        <p
                          id="news-error"
                          role="alert"
                          className="text-[0.8125rem] font-semibold text-[var(--color-alert)]"
                        >
                          {emailError}
                        </p>
                      ) : null}
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                      <button type="submit" disabled={signing} className="btn btn-primary">
                        {signing ? 'Sending' : 'Subscribe'}
                      </button>
                      {signing ? (
                        <span
                          role="status"
                          aria-live="polite"
                          className="skeleton block h-3 w-32"
                        />
                      ) : (
                        <p className="text-[0.8125rem] text-[var(--color-on-accent)]/75">
                          No minimum spend to join.
                        </p>
                      )}
                    </div>
                  </form>
                )}
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      {/* ---------------------------------------------------------------- */}
      {/* FOOTER                                                          */}
      {/* ---------------------------------------------------------------- */}
      <footer className="bg-[var(--color-ink)] py-14 text-[var(--color-canvas)]">
        <div className="shell grid gap-12 md:grid-cols-12">
          <div className="md:col-span-3">
            <p className="font-display text-[1.25rem] font-semibold tracking-[-0.01em] text-[var(--color-canvas)] uppercase">
              Fieldnote Supply
            </p>
            <p className="mt-4 max-w-[38ch] text-[0.9375rem] leading-relaxed text-white/65">
              A small shop for people who would rather repair a good pack than buy a
              new one. Repairs run in the back room, next to the kettle.
            </p>
            <a
              href="mailto:help@fieldnotesupply.com"
              className="mt-6 inline-block text-[0.9375rem] text-[var(--color-canvas)] underline underline-offset-4"
            >
              help@fieldnotesupply.com
            </a>
          </div>

          {[
            { h: 'Shop', l: ['Best sellers', 'Packs', 'Shelter', 'Kitchen', 'Spare parts'] },
            { h: 'Help', l: ['Shipping and returns', 'Warranty claims', 'Size guides', 'Contact'] },
            { h: 'Company', l: ['About the shop', 'Repair clinic dates', 'Trade accounts', 'Stockists'] },
          ].map((col) => (
            <nav key={col.h} className="md:col-span-3">
              <h2 className="font-mono text-[0.6875rem] tracking-[0.09em] text-white/45 uppercase">
                {col.h}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {col.l.map((l) => (
                  <li key={l}>
                    <a
                      href="#shop"
                      className="text-[0.9375rem] text-white/75 transition-colors hover:text-[var(--color-canvas)]"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="shell mt-14 flex flex-col gap-3 border-t border-white/12 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-[0.8125rem] text-white/50">
            Fieldnote Supply Co. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#top" className="text-[0.8125rem] text-white/50 hover:text-[var(--color-canvas)]">
              Terms
            </a>
            <a href="#top" className="text-[0.8125rem] text-white/50 hover:text-[var(--color-canvas)]">
              Privacy
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}