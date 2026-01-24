# Portfolio 2026 - Ferguson González

Modern, glassmorphic portfolio built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Design**: Glassmorphism effects, dark mode, and smooth animations
- **Bento Grid Layout**: Asymmetric project grid with multiple card sizes
- **Responsive**: Mobile-first design that works on all devices
- **Performance**: Optimized with Next.js 14 App Router
- **TypeScript**: Full type safety
- **Dark Mode**: Toggle between light and dark themes

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🎨 Customization

### Replace Images

1. **Hero Image**: Place your photo in `public/images/hero.webp`
2. **Project Images**: Replace project screenshots in `public/images/project1.webp` through `project6.webp`

### Update Content

1. **Projects**: Edit the `projects` array in `app/page.tsx`
2. **Services**: Update the `services` array in `app/page.tsx`
3. **Social Links**: Replace placeholder links in the Contact section
4. **Skills**: Modify the skills array in the About section

### Colors

Edit `tailwind.config.js` to customize:
- Primary color: `#6366F1`
- Accent color: `#10B981`
- Dark mode colors: `dark.bg`, `dark.card`, `dark.border`

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and deploy

### Manual Build

```bash
npm run build
npm start
```

## 📝 TODO

- [ ] Replace placeholder images with actual photos
- [ ] Update project links with real URLs
- [ ] Add social media links
- [ ] Configure contact form backend (optional)
- [ ] Add analytics (optional)

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Deployment**: Vercel

## 📄 License

MIT
