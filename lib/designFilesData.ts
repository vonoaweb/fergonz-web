export interface DesignFrame {
  image: string;
  title: string;
  caption: string;
}

export interface DesignFile {
  /** Figma file key — also used to build the embed URL. */
  fileKey: string;
  name: string;
  role: string;
  url: string;
  meta: string;
  /** What the file is, in one or two sentences. */
  what: string;
  /** The reasoning behind the decisions — the part recruiters actually read. */
  why: string;
  system: { label: string; value: string }[];
  /** Background the artboards sit on, so frames render un-cropped on their own ground. */
  frameBg: string;
  /** CSS aspect-ratio for a lone full-width frame, so it isn't swamped by letterboxing. */
  soloAspect?: string;
  /**
   * Show the embedded Figma viewer for this file.
   *
   * Leave false until the file is shared in Figma as "Anyone with the link →
   * can view". Without that, embed.figma.com answers with a sign-in wall
   * rather than the design, which is worse for a visitor than no button at
   * all. Once a file is public, flip this to true — nothing else to change.
   */
  embeddable?: boolean;
  frames: DesignFrame[];
}

export const designFiles: DesignFile[] = [
  {
    fileKey: 'ERrLQFe0OB2KXlAUcezmKN',
    name: 'INMEDIC v2 — Medical Equipment Rental Platform',
    role: 'Product Designer',
    url: 'https://www.figma.com/design/ERrLQFe0OB2KXlAUcezmKN/INMEDIC-v2',
    meta: '13 screens · 1440 × 1024 · design file + clickable prototype',
    what:
      'A B2B platform for renting medical instruments and equipment. I designed the entire path from first visit to a usable account: sign-in, password recovery, company registration, headquarters, and branch management — plus the component library behind it.',
    why:
      'Onboarding is where a B2B platform loses the customers it already convinced, so every screen here is a decision about what to ask and when. Mexican rental contracts fork at the first field — a company and a sole trader need different documents and a different RFC — so I split the form at the entity choice instead of hiding conditional fields inside one long form: each path only ever shows what that customer can actually fill in. Branches were the second risk. A clinic with one location and a distributor with fourteen are the same product, so the branch screen opens on a designed empty state that explains why a branch is needed at all, and every branch after that is added, edited or removed from the same table without ever leaving the flow. The cancel and finish modals exist because a half-finished registration is worse than none: the user is asked once, explicitly, before anything is thrown away.',
    system: [
      { label: 'Flow', value: 'Sign-in → entity → HQ → branches' },
      { label: 'Branching', value: 'Company vs. sole trader' },
      { label: 'States', value: 'Empty · new · edit · cancel' },
      { label: 'Artboard', value: '1440 × 1024' },
      { label: 'Handoff', value: 'Components + prototype' },
      { label: 'Year', value: '2025' },
    ],
    frameBg: '#F4F5F7',
    frames: [
      {
        image: '/images/figma/inmedic-login.webp',
        title: 'Sign in',
        caption:
          'Split layout: the product promise on the left holds the page while the form stays a single column.',
      },
      {
        image: '/images/figma/inmedic-empresa.webp',
        title: 'Company registration',
        caption: 'The commercial-entity path — tax data grouped apart from contact data.',
      },
      {
        image: '/images/figma/inmedic-fisica.webp',
        title: 'Sole trader',
        caption: 'Same step, different obligations. The fork happens here, not inside the fields.',
      },
      {
        image: '/images/figma/inmedic-cede.webp',
        title: 'Headquarters',
        caption: 'One address before branches exist, so the account always has a legal anchor.',
      },
      {
        image: '/images/figma/inmedic-sucursales.webp',
        title: 'Branches — empty state',
        caption: 'The empty state explains the concept instead of showing an empty table.',
      },
      {
        image: '/images/figma/inmedic-editar.webp',
        title: 'Branches — edit',
        caption: 'Add, edit and cancel all resolve in place; the flow is never abandoned.',
      },
    ],
  },
  {
    fileKey: 'PSsxe4rZo4AfMWZoozoW6M',
    name: 'KROL — Brand Manual v4',
    role: 'Brand Designer',
    url: 'https://www.figma.com/design/PSsxe4rZo4AfMWZoozoW6M/Manual-de-Marca-KROL-v4',
    meta: '8 plates · 1440 px · Figma',
    what:
      'The identity system for KROL Edificación Estructural, the Guadalajara construction firm whose website is in Selected Work above. Delivered as a manual the client can apply without me.',
    why:
      'A brand book is only worth the paper if the person who inherits it can make the right call at 11 pm without asking the designer. So every rule in this one carries its reason next to it. Why the K appears on its own: below 80 px the line-drawn mark clogs into a blot, and on an orange ground white linework simply dissolves — the K is the same letter from the logotype, reduced to what actually survives embroidery and screen printing. Why the darks are blue-graphite instead of brown: the orange is warm, and a warm ground flattens everything into one tone, while cold darks make it jump — the same reason rebar reads against cold grey concrete. Why clear space is measured in K-heights rather than millimetres: the rule then scales itself, about 5 mm on a business card and 30 cm on a site banner, with no second table to maintain. The type is all SIL OFL from Google Fonts so nothing in the system carries a licence cost, and the logotype is outlined curves, so it does not depend on a font being installed anywhere.',
    system: [
      { label: 'Signal orange', value: '#F97316' },
      { label: 'Blue graphite', value: '#12161D' },
      { label: 'Cold steel grey', value: '#7C8695' },
      { label: 'Ratio', value: '60 / 30 / 10' },
      { label: 'Type', value: 'Black Ops One · Michroma · Barlow' },
      { label: 'Licence', value: 'SIL OFL — commercial use, no cost' },
    ],
    frameBg: '#0D1117',
    frames: [
      {
        image: '/images/figma/krol-portada.webp',
        title: '00 · Cover',
        caption: 'Version 4.0 — the round that replaced the palette after the client changed course.',
      },
      {
        image: '/images/figma/krol-logotipo.webp',
        title: '03 · Logotype & versions',
        caption: 'Six sanctioned versions, each labelled with the surface it is for.',
      },
      {
        image: '/images/figma/krol-respeto.webp',
        title: '04 · Clear space & sizes',
        caption: 'Margins measured in K-heights, so the rule scales from card to banner.',
      },
      {
        image: '/images/figma/krol-usos.webp',
        title: '05 · Incorrect use',
        caption: 'Six ways to weaken the mark, each with the reason it fails.',
      },
      {
        image: '/images/figma/krol-marcaagua.webp',
        title: '06 · Watermark',
        caption: 'Where the line version works, where it clogs, and what replaces it.',
      },
      {
        image: '/images/figma/krol-color.webp',
        title: '07 · Colour',
        caption: 'Full print specs per colour plus the 60/30/10 proportion bar.',
      },
    ],
  },
  {
    fileKey: 'k2jIfUHnn3Ajt3yY6OPFHO',
    name: 'Vonoa Web — August 2026 Feed',
    role: 'Art Direction & Layout System',
    url: 'https://www.figma.com/design/k2jIfUHnn3Ajt3yY6OPFHO',
    meta: '9 artboards · 1080 × 1080 · Figma',
    what:
      'A nine-post social campaign for my own studio, built as a system rather than nine separate graphics: one variable collection drives every colour, seven text styles cover the whole set, and each artboard is a vertical auto-layout on the same 88 px margin.',
    why:
      'Social design usually dies of its own success — post four looks nothing like post one because each was drawn from scratch. Two layouts carry this entire feed instead: a numeral variant where a single figure does the talking, and a text variant that leads with a line icon. That means a post can be rewritten without being redrawn, and the set still reads as one voice in a scrolling timeline. Every figure on these boards is pulled from an article already published on the studio blog rather than invented for the layout, and only one post carries a photograph — a real screenshot of client work — because stock imagery would break the 80/20 ratio of empty ground to brand that makes the set recognisable at thumbnail size.',
    system: [
      { label: 'Background', value: '#070F21' },
      { label: 'Accent gradient', value: '#2EE9B9 → #1CA0F4' },
      { label: 'Display type', value: 'Sora' },
      { label: 'Support type', value: 'DM Sans' },
      { label: 'Grid', value: '88 px margin · auto-layout' },
      { label: 'Rule', value: 'One accent per composition' },
    ],
    frameBg: '#070F21',
    frames: [
      {
        image: '/images/figma/vonoa-01-manifiesto.webp',
        title: '01 · Manifesto',
        caption: 'Opening statement — text variant with a 64 px line icon.',
      },
      {
        image: '/images/figma/vonoa-02-velocidad.webp',
        title: '02 · Page speed',
        caption: 'Numeral variant. Every figure comes from a published article.',
      },
      {
        image: '/images/figma/vonoa-03-diseno-web.webp',
        title: '03 · Web design',
        caption: 'The only post carrying an image: a real screenshot of client work.',
      },
      {
        image: '/images/figma/vonoa-04-seo-local.webp',
        title: '04 · Local SEO',
        caption: 'Gradient numeral against empty ground — roughly 80/20 by design.',
      },
      {
        image: '/images/figma/vonoa-07-automatizacion.webp',
        title: '07 · Automation',
        caption: 'Hours rather than percent — the numeral style absorbs both.',
      },
      {
        image: '/images/figma/vonoa-09-cierre.webp',
        title: '09 · Close',
        caption: 'Call to action. No numeral, maximum negative space.',
      },
    ],
  },
  {
    fileKey: 'm4iWjkUZy0rEiqG62TMHG6',
    name: 'VonoaWeb — Brand Kit v1.0',
    role: 'Brand Designer',
    url: 'https://www.figma.com/design/m4iWjkUZy0rEiqG62TMHG6/VonoaWeb-Brand-Kit-v1-0',
    meta: '4 plates · 1920 × 1080 · Figma',
    what:
      'The identity system for my own studio: logo versions, palette, gradient, type scale and the incorrect-use rules.',
    why:
      'I built my studio’s kit to the same standard I hand a client, because it has to pass the same test — a blog post, a proposal PDF and a nine-post feed made months apart still have to look like one company. A single gradient is the only accent in the system, which keeps the dark ground doing the structural work and makes the brand recognisable at favicon size. The type scale is fixed at five steps precisely so nothing gets improvised at 2 am, and every value here is the same one that ships in the site’s CSS, so design and code never drift.',
    system: [
      { label: 'Deep space', value: '#070F21' },
      { label: 'Accent gradient', value: '#2EE9B9 → #1CA0F4' },
      { label: 'Cards', value: '#0F2040' },
      { label: 'Display', value: 'Sora 400 · 600 · 700' },
      { label: 'Body', value: 'DM Sans 400 · 500' },
      { label: 'Scale', value: '56 / 40 / 28 / 18 / 11 px' },
    ],
    frameBg: '#070F21',
    frames: [
      {
        image: '/images/figma/vonoa-kit-identidad.webp',
        title: '02 · Visual identity',
        caption: 'Logo on light and dark, three icon treatments, four prohibited uses.',
      },
      {
        image: '/images/figma/vonoa-kit-color.webp',
        title: '03 · Palette',
        caption: 'Seven tokens plus the brand gradient, each with the role it plays.',
      },
      {
        image: '/images/figma/vonoa-kit-tipografia.webp',
        title: '04 · Typography',
        caption: 'Two families, five fixed steps — the same scale the site ships.',
      },
    ],
  },
  {
    fileKey: 'gd6k7PONpzG5FXDKi1WYAk',
    name: 'Moncatu — Brand Kit',
    role: 'Brand Designer',
    url: 'https://www.figma.com/design/gd6k7PONpzG5FXDKi1WYAk/Moncatu-Brand-Kit-Completo',
    meta: 'Identity system · 1440 × 900 · Figma',
    what:
      'Identity for Moncatu, the handmade .925 silver jewelry brand whose storefront is in Sites Running Live below.',
    why:
      'Handmade silver lands on the same search results page as mass-market jewelry, so the identity has to read as expensive before a single price is seen. The mark is one geometric facet — a cut stone reduced to line — set in wide letterspacing on near-black, because a dark ground is what product photography of silver actually needs behind it. That decision is why the live storefront is dark too: the identity was designed for the medium it would spend its life in.',
    system: [
      { label: 'Ground', value: 'Near-black · deep navy' },
      { label: 'Mark', value: 'Single geometric facet' },
      { label: 'Wordmark', value: 'Wide letterspacing, serif' },
      { label: 'Applied on', value: 'moncatu.com' },
    ],
    frameBg: '#0E1524',
    soloAspect: '16 / 9',
    frames: [
      {
        image: '/images/figma/moncatu-cover.webp',
        title: 'Identity system — cover',
        caption: 'The mark, the wordmark and the ground that carries the whole brand.',
      },
    ],
  },
  {
    fileKey: 'WOPw3FKytY3HQ47MKoGbcQ',
    name: 'FerGonz — Service Icons',
    role: 'Icon Design',
    url: 'https://www.figma.com/design/WOPw3FKytY3HQ47MKoGbcQ/FerGonz-Portfolio-Service-Icons',
    meta: '4 icons · 1560 × 500 · Figma',
    what:
      'The icon set for the four services I offer: UX/UI design, web and e-commerce, mobile apps, and dashboards and platforms.',
    why:
      'Icon sets fall apart on optical weight, not on drawing. All four sit in the same 120 px circle with a 56–60 px glyph inside, and each glyph was adjusted by eye until none of them reads heavier than its neighbours in a row — a phone outline needs more stroke than a filled chart to hold the same presence. They are kept as editable frames rather than exported artwork, so stroke weight and colour follow the brand instead of having to be redrawn when it moves.',
    system: [
      { label: 'Container', value: '120 px circle' },
      { label: 'Glyph', value: '56–60 px' },
      { label: 'Balance', value: 'Optical, not metric' },
      { label: 'Format', value: 'Editable frames, not flattened art' },
    ],
    frameBg: '#F4F5F7',
    soloAspect: '3 / 1',
    frames: [
      {
        image: '/images/figma/service-icons.webp',
        title: 'Service icon grid',
        caption: 'Four services, one construction — circle, glyph, label, one-line description.',
      },
    ],
  },
];
