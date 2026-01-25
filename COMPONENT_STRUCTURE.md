# GPJ India React - Component Structure

## Overview
This document outlines the component architecture for rebuilding the GPJ India website in React. All components are designed to be data-driven, with content managed through JSON files.

---

## Component Hierarchy

```
App
├── Header
│   ├── Logo
│   ├── PrimaryNav
│   └── CountrySelector
│       └── CountryDropdown
├── Hero
│   └── VimeoPlayer
├── FeaturedWork
│   ├── WorkCard (x5)
│   └── ViewMoreCard
├── ClientCarousel
│   ├── CarouselColumn (x3)
│   └── ClientLogo (x45+)
├── ContentBlocks
│   └── MediaTextBlock (x5)
├── GlobalLocations
│   └── ScrollingPhotos
│       └── LocationCard (x19)
├── Footer
│   ├── FooterNav
│   ├── SocialLinks
│   └── Copyright
```

---

## Component Details

### 1. Header Component
**File:** `src/components/Header/Header.jsx`

**Props:**
```typescript
interface HeaderProps {
  logo: string;
  navigation: NavigationItem[];
  countries: Country[];
  currentCountry: string;
}
```

**Children Components:**
- **Logo** - Displays GPJ logo, links to home
- **PrimaryNav** - Renders main navigation menu
- **CountrySelector** - Dropdown for region selection

**Data Source:** `extracted-data.json` → `navigation.primary`, `countrySelector`, `assets.logo`

**Key Features:**
- Sticky header on scroll
- Mobile hamburger menu
- Country selector dropdown

---

### 2. Hero Component
**File:** `src/components/Hero/Hero.jsx`

**Props:**
```typescript
interface HeroProps {
  vimeoVideoId: string;
  autoplay: boolean;
  loop: boolean;
  muted: boolean;
}
```

**Data Source:** `extracted-data.json` → `hero`

**Key Features:**
- Vimeo video background
- Mute/unmute toggle button
- Full viewport height
- Aspect ratio: 56.25% (16:9)

---

### 3. FeaturedWork Component
**File:** `src/components/FeaturedWork/FeaturedWork.jsx`

**Props:**
```typescript
interface FeaturedWorkProps {
  projects: FeaturedProject[];
}

interface FeaturedProject {
  id: string;
  title: string;
  url: string;
  featuredImage: string;
  featuredImage2x: string;
  featuredImage3x: string;
  clientLogo: string;
  clientLogo2x: string;
}
```

**Children Components:**
- **WorkCard** - Individual project card with hover effect
- **ViewMoreCard** - "Experience Work" call-to-action card

**Data Source:** `extracted-data.json` → `featuredWork`

**Key Features:**
- 3-column grid (responsive: 1 col mobile, 3 col desktop)
- Green overlay on hover
- Client logo reveals on hover
- Responsive images with srcset

---

### 4. ClientCarousel Component
**File:** `src/components/ClientCarousel/ClientCarousel.jsx`

**Props:**
```typescript
interface ClientCarouselProps {
  heading: string;
  logos: {
    column1: ClientLogo[];
    column2: ClientLogo[];
    column3: ClientLogo[];
  };
}

interface ClientLogo {
  name: string;
  slug: string;
  image: string;
}
```

**Data Source:** `extracted-data.json` → `clientLogos`, `brandMessages.tagline`

**Key Features:**
- 3 columns with infinite vertical scroll
- Alternate scroll directions (normal/reverse)
- Auto-animation using CSS
- 45+ client logos

**Animation Logic:**
- Column 1: Scroll normal (top to bottom)
- Column 2: Scroll reverse (bottom to top)
- Column 3: Scroll normal (top to bottom)

---

### 5. ContentBlocks Component
**File:** `src/components/ContentBlocks/ContentBlocks.jsx`

**Props:**
```typescript
interface ContentBlocksProps {
  blocks: ContentBlock[];
  brandMessages: {
    fullStatement: string;
    mission: string;
  };
}

interface ContentBlock {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  linkText: string;
  alignment: 'left' | 'right';
  isCTA?: boolean;
}
```

**Children Components:**
- **MediaTextBlock** - Image/text alternating layout

**Data Source:** `extracted-data.json` → `contentBlocks`, `brandMessages`

**Key Features:**
- Alternating left/right image placement
- 5 content blocks:
  1. Game-Changing Experiences
  2. GPJ POV
  3. Meet the makers
  4. Experience at heart
  5. Join us (CTA)
- Brand message sections between blocks

---

### 6. GlobalLocations Component
**File:** `src/components/GlobalLocations/GlobalLocations.jsx`

**Props:**
```typescript
interface GlobalLocationsProps {
  locations: Location[];
}

interface Location {
  name: string;
  slug: string;
  image: string;
}
```

**Children Components:**
- **ScrollingPhotos** - Horizontal auto-scrolling container
- **LocationCard** - Individual location image with caption

**Data Source:** `extracted-data.json` → `globalLocations`

**Key Features:**
- Horizontal auto-scroll (infinite loop)
- 19 global office locations
- Green overlay on images
- CSS custom properties for animation

**CSS Variables:**
```css
--displayHeight: 430px
--totalWidth: 12250px
--numPhotos: 19
```

---

### 7. Footer Component
**File:** `src/components/Footer/Footer.jsx`

**Props:**
```typescript
interface FooterProps {
  navigation: FooterNavigation;
  socialMedia: SocialLink[];
  projectLogo: string;
}

interface FooterNavigation {
  aboutUs: NavLink[];
  legal: NavLink[];
  contact: NavLink[];
}

interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}
```

**Children Components:**
- **FooterNav** - Multi-column footer navigation
- **SocialLinks** - Social media icons
- **Copyright** - Copyright notice and branding

**Data Source:** `extracted-data.json` → `navigation.footer`, `socialMedia`, `assets.projectLogo`

**Key Features:**
- 3-column footer navigation
- Social media links (LinkedIn, Instagram, Facebook, YouTube)
- Project Worldwide partnership badge
- Copyright information

---

## Data Files Structure

### Main Data File
**File:** `src/data/siteData.json`
- Imports from `extracted-data.json`
- Single source of truth for all content

### Recommended Additional Files
1. `src/data/navigation.json` - Navigation-specific data
2. `src/data/clients.json` - Client logos data
3. `src/data/locations.json` - Office locations
4. `src/data/work.json` - Featured work projects

---

## Styling Architecture

### Approach: CSS Modules or Styled Components
**Recommended:** CSS Modules for maintainability

### File Structure:
```
src/components/
├── Header/
│   ├── Header.jsx
│   ├── Header.module.css
│   └── index.js
├── Hero/
│   ├── Hero.jsx
│   ├── Hero.module.css
│   └── index.js
... etc
```

### Global Styles:
```
src/styles/
├── globals.css          # Global resets, typography
├── variables.css        # CSS custom properties (colors, spacing)
└── utilities.css        # Utility classes
```

---

## Key Libraries & Dependencies

### Core
- **React** (18+)
- **React Router** - For navigation
- **Vimeo Player** - `@vimeo/player` for video playback

### Styling
- **CSS Modules** or **Styled Components**
- **Bootstrap 5** (optional, based on original site) or custom grid

### Utilities
- **React Helmet** - For SEO meta tags
- **Intersection Observer API** - For scroll animations
- **FontAwesome** - For social media icons

### Development
- **Vite** or **Create React App**
- **ESLint** + **Prettier**

---

## Responsive Breakpoints

Based on Bootstrap 5 breakpoints:
```css
/* Mobile first */
--breakpoint-sm: 576px;   /* Small devices */
--breakpoint-md: 768px;   /* Tablets */
--breakpoint-lg: 992px;   /* Laptops */
--breakpoint-xl: 1200px;  /* Desktops */
--breakpoint-xxl: 1400px; /* Large desktops */
```

---

## Performance Optimizations

1. **Image Optimization**
   - Use `srcset` for responsive images
   - CDN images already optimized (swiftpic.io)
   - Lazy loading for below-fold images

2. **Code Splitting**
   - Lazy load route components
   - Dynamic imports for heavy components

3. **Animations**
   - CSS-based animations (GPU accelerated)
   - Intersection Observer for scroll triggers
   - `will-change` for performance hints

---

## Accessibility Considerations

1. **Semantic HTML**
   - Proper heading hierarchy
   - Landmark regions (header, nav, main, footer)

2. **Keyboard Navigation**
   - Focusable interactive elements
   - Skip to main content link

3. **ARIA Labels**
   - Screen reader text for icons
   - Alt text for all images
   - ARIA labels for interactive elements

4. **Color Contrast**
   - WCAG AA compliance
   - Sufficient contrast ratios

---

## State Management

### Recommended Approach: Context API + Hooks

**Global State:**
- User preferences (country selection)
- Theme settings (if dark mode added)

**Local State:**
- Component-specific UI state
- Form inputs
- Modal visibility

**Example:**
```javascript
// src/context/SiteContext.js
export const SiteContext = createContext();

export const SiteProvider = ({ children }) => {
  const [selectedCountry, setSelectedCountry] = useState('in');

  return (
    <SiteContext.Provider value={{ selectedCountry, setSelectedCountry }}>
      {children}
    </SiteContext.Provider>
  );
};
```

---

## Deployment Considerations

1. **Environment Variables**
   - Vimeo API credentials
   - Analytics IDs (Google Analytics - to be added later if needed)

2. **Build Optimization**
   - Minification
   - Tree shaking
   - Bundle size analysis

3. **Hosting**
   - Static site hosting (Netlify, Vercel, AWS S3)
   - CDN distribution
   - HTTPS enforcement

---

## Next Steps

1. Set up React project with Vite/CRA
2. Create component scaffolding
3. Implement Header and Footer first (consistent across pages)
4. Build Hero and FeaturedWork sections
5. Implement ClientCarousel with animations
6. Add ContentBlocks and GlobalLocations
7. Add routing and additional pages
8. Performance optimization and testing
9. Accessibility audit
10. Deploy to staging environment
