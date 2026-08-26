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
];
