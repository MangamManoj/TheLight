# TheLight: Bible Chapter Summaries & Practical Insights

## Problem Statement

Many people read the Bible regularly, but they struggle to remember, recall, and apply its lessons in real life. As a result, Bible reading often feels boring, mechanical, and meaningless — done merely for the sake of it, without true transformation or engagement. 

**Key Pain Points:**
- Difficulty retaining and recalling biblical teachings after reading
- Lack of connection between ancient scriptures and modern daily life
- Reading becomes a ritualistic task rather than a transformative experience
- Missing practical, actionable takeaways that can be applied immediately
- Overwhelming amount of content makes it hard to extract key insights quickly

## Proposed Solution

**TheLight** is a WebApp that transforms Bible reading into an engaging, practical, and transformative experience by providing instant, AI-generated summaries and actionable insights for any Bible chapter.

**Core Value Proposition:**
- **Instant Clarity**: Get clear, concise summaries of any Bible chapter in seconds
- **Practical Application**: Receive real-world takeaways that bridge ancient wisdom with modern life
- **Faithful Interpretation**: AI-generated content that remains true to Scripture and biblical principles
- **Zero Friction**: No login, no signup, completely free and open access

## Features

### MVP (Minimum Viable Product)

1. **Chapter Selection**
   - Dropdown or search interface to select any book of the Bible
   - Chapter number selection (1-150 based on book)
   - Support for all 66 books of the Bible (39 Old Testament + 27 New Testament)

2. **Instant Summary Generation**
   - "Generate" or "Go" button to trigger LLM inference
   - Real-time generation using OpenRouter API
   - Displays chapter summary (2-3 paragraphs)
   - Shows key verses or themes highlighted

3. **Practical Takeaways**
   - List of 3-5 actionable insights
   - Each takeaway explains:
     - What the lesson teaches
     - How it applies to modern life
     - Practical steps for implementation

4. **Basic UI Components**
   - Clean, minimalistic design
   - Loading states during API calls
   - Error handling for API failures
   - **Fully responsive design**: Optimized for mobile, tablet, and desktop
   - Touch-friendly interactions on mobile, precise mouse interactions on desktop
   - Keyboard navigation support across all platforms

5. **Reference Display**
   - Always shows source: "Based on King James Version (KJV)"
   - Chapter reference displayed prominently

### Progressive Web App (PWA) Features

**Mobile App-Like Experience**: The app will function as a PWA, providing a native app experience on mobile and desktop.

1. **Installability**
   - "Add to Home Screen" prompt on mobile browsers
   - Install as desktop app on Chrome/Edge (Windows/Mac/Linux)
   - Custom app icon and splash screen
   - Standalone window mode (no browser UI)

2. **Offline Support**
   - Service Worker for offline functionality
   - Cached summaries available offline
   - Offline fallback page with cached chapters list
   - Background sync for new content when online

3. **App-Like Navigation**
   - Smooth transitions (no browser chrome flash)
   - Native-like navigation patterns
   - Push notifications (future enhancement)

### Future Enhancements (Post-MVP)

1. **Reading History & Bookmarks**
   - LocalStorage-based history of previously viewed chapters
   - Favorite/bookmark chapters
   - Recent reads section
   - Sync across devices (if user accounts added)

2. **Export & Share**
   - Export summaries as PDF
   - Share via social media with formatted quote cards
   - Copy to clipboard functionality

3. **Reading Plans**
   - Pre-defined reading plans (30-day, 90-day, chronological)
   - Daily chapter suggestions
   - Progress tracking

4. **Multiple Translations**
   - Toggle between KJV, NIV, ESV, NASB
   - Compare summaries across translations

5. **Study Notes**
   - Personal notes section for each chapter
   - Highlight and annotate insights
   - Cross-reference related chapters

6. **Audio Narratives**
   - Text-to-speech for summaries
   - Podcast-style chapter overviews

7. **Community Insights**
   - User-submitted reflections (optional, anonymous)
   - Discussion prompts for each chapter

8. **Advanced Features**
   - Theme-based chapter discovery (love, forgiveness, hope, etc.)
   - Cross-referencing related chapters
   - Character studies and biblical character highlights
   - Timeline view of biblical events

## Tech Stack

### Frontend
- **Framework**: Next.js 14+ (App Router) - for server-side rendering and optimal performance
  - **App Router**: Leverage React Server Components for minimal client-side JavaScript
  - **Streaming SSR**: Progressive page rendering for faster perceived performance
  - **Responsive Images**: Built-in `next/image` with automatic srcset generation for all screen sizes
  - **Viewport API**: Support for viewport units and safe-area-inset for mobile devices
- **Styling**: Tailwind CSS - for modern, responsive, minimalistic design
  - **JIT Mode**: Enable for smaller CSS bundles and faster builds
  - **PurgeCSS**: Automatic unused CSS removal
- **UI Components**: Shadcn/ui or Radix UI - for accessible, customizable components
  - **Component Lazy Loading**: Dynamic imports for less critical components
- **State Management**: React Context API or Zustand (lightweight, if needed)
  - **Prefer Local State**: Use component state where possible, avoid global state overhead
- **Icons**: Lucide React or Heroicons (tree-shakeable, lightweight)
- **Animation**: Framer Motion (optional) or CSS transitions for smooth animations
- **Performance Monitoring**: Web Vitals library for real-time performance tracking

### Backend/API
- **API Route Handler**: Next.js API Routes (serverless functions)
- **LLM Provider**: OpenRouter API
  - Model options: GPT-4, Claude 3.5 Sonnet, or other capable models
  - Cost-effective inference with rate limiting

### Deployment
- **Platform**: Vercel
- **Hosting**: Edge Functions for low latency (<50ms cold start)
- **CDN**: Automatic via Vercel Edge Network (global distribution)
- **Edge Caching**: Aggressive caching for static assets and API responses
- **Image CDN**: Next.js Image Optimization with Vercel's image optimization
- **Analytics**: Vercel Analytics for Core Web Vitals monitoring
- **PWA Support**: Service Worker for offline access, installable on mobile and desktop
  - Web App Manifest for "Add to Home Screen" functionality
  - Offline fallback pages
  - Background sync for cached content

### Data Sources
- **Bible Text**: Public domain KJV Bible text (can be embedded JSON or fetched from public API)
  - Options: ESV API, Bible Gateway API (if available), or static JSON files

### Development Tools
- **Language**: TypeScript
- **Package Manager**: npm or pnpm
- **Code Quality**: ESLint, Prettier
- **Version Control**: Git

## UI/UX Design

### Design Principles
- **Minimalism**: Clean, uncluttered interface focusing on content
- **Modern**: Contemporary typography, subtle shadows, smooth animations
- **Accessibility**: WCAG 2.1 AA compliant, keyboard navigation, screen reader support
- **Performance-First**: **Critical for learning** - Sub-100ms interactions, 60fps animations, instant feedback
- **Smooth Interactions**: All interactions must feel immediate and fluid to maintain learning focus
- **Zero Perceived Lag**: Loading states, optimistic UI, and progressive rendering to eliminate wait times

### Color Palette
- **Primary**: Deep navy blue or rich burgundy (spiritual, trustworthy)
- **Secondary**: Warm gold or amber accents (light, wisdom)
- **Background**: Off-white or subtle gray (#FAFAFA, #F5F5F5)
- **Text**: Dark gray (#1F2937) for body, black for headings
- **Accents**: Soft pastels for highlights and CTAs

### Typography
- **Headings**: Modern serif (e.g., Playfair Display, Merriweather) or elegant sans-serif
- **Body**: Highly readable sans-serif (Inter, System UI, or similar)
- **Quotes/References**: Slightly italicized, smaller size

### Layout Structure

**Homepage/Landing Page:**

*Desktop Layout:*
```
┌─────────────────────────────────────┐
│         [Logo: TheLight]            │
│                                     │
│  "Illuminate Your Bible Study"      │
│                                     │
│  ┌───────────────────────────────┐ │
│  │  Select Book: [Dropdown ▼]    │ │
│  │  Select Chapter: [Number]     │ │
│  │  [Generate Summary Button]    │ │
│  └───────────────────────────────┘ │
│                                     │
│  [Optional: Brief description]      │
└─────────────────────────────────────┘
```

*Mobile Layout:*
```
┌─────────────────┐
│ [☰] TheLight    │
├─────────────────┤
│                 │
│  "Illuminate    │
│  Your Bible     │
│  Study"         │
│                 │
│  ┌───────────┐  │
│  │ Book ▼    │  │
│  ├───────────┤  │
│  │ Chapter # │  │
│  ├───────────┤  │
│  │ [Generate]│  │
│  └───────────┘  │
│                 │
│  [Description]  │
│                 │
└─────────────────┘
```

**Results Page:**

*Desktop Layout:*
```
┌─────────────────────────────────────┐
│  [TheLight Logo]                    │
│                                     │
│  ← Back                             │
│                                     │
│  [Book Name] Chapter [Number]       │
│  Based on King James Version        │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│  SUMMARY                            │
│  [2-3 paragraph summary]            │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│  PRACTICAL TAKEAWAYS                │
│                                     │
│  1. [Insight with application]      │
│  2. [Insight with application]      │
│  3. [Insight with application]      │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│  [Generate Another Chapter]         │
└─────────────────────────────────────┘
```

*Mobile Layout:*
```
┌─────────────────┐
│ [←] [Logo]      │
├─────────────────┤
│                 │
│ Book Ch. #      │
│ (KJV)           │
│                 │
│ ─────────────   │
│                 │
│ SUMMARY         │
│ [Content...]    │
│                 │
│ ─────────────   │
│                 │
│ TAKEAWAYS       │
│                 │
│ 1. [Insight]    │
│ 2. [Insight]    │
│ 3. [Insight]    │
│                 │
│ [Generate New]  │
│                 │
└─────────────────┘
```

### User Flow (Optimized for Smooth Interaction)
1. User lands on homepage (instant load < 1.5s)
2. Selects book from dropdown (searchable, instant feedback, debounced search)
3. Selects chapter number (1-N based on book, immediate validation)
4. Clicks "Generate" button:
   - **Immediate**: Button shows loading state (< 50ms)
   - **Instant**: Optimistic UI - show expected layout structure
   - **Smooth**: Skeleton screen or shimmer effect (not blocking spinner)
   - **Progressive**: Content fades in smoothly as it arrives
5. Results appear with smooth fade-in animation (300ms ease-out)
6. User can generate another chapter or navigate back (instant transitions)
7. **Cached Results**: Previously viewed chapters load instantly from cache (< 100ms)

### Responsive Design & Cross-Platform Optimization

**Mobile-First Approach**: The app is designed mobile-first, then enhanced for desktop. Both experiences must be equally optimized and delightful.

#### Breakpoints & Layout Strategy
- **Mobile (320px - 767px)**: 
  - Full-width layout, minimal margins (16-20px)
  - Single column, vertically stacked content
  - Sticky header/navigation for easy access
  - Bottom sheet modals instead of center modals
  - Touch-optimized interactions throughout
  
- **Tablet (768px - 1023px)**:
  - Centered layout with max-width 600px
  - Slightly increased spacing (24-32px margins)
  - Two-column layout for summary/takeaways if space allows
  - Touch and mouse interactions supported
  
- **Desktop (1024px+)**:
  - Centered layout with max-width 800px
  - Generous spacing (32-48px margins)
  - Hover states and keyboard navigation optimized
  - Multi-column layouts where appropriate
  - Larger typography for comfortable reading

#### Mobile-Specific Design Considerations
- **Touch Targets**: Minimum 44x44px for all interactive elements (buttons, dropdowns, links)
- **Thumb Zone**: Primary actions within easy thumb reach (bottom 2/3 of screen)
- **Swipe Gestures**: Support swipe back for navigation (native feel)
- **Pull-to-Refresh**: Consider adding pull-to-refresh for cached content
- **Keyboard Handling**: Auto-focus inputs, handle virtual keyboard gracefully
- **Safe Areas**: Respect iPhone notch, Android navigation bar (use `env(safe-area-inset-*)`)
- **Orientation**: Support both portrait and landscape orientations smoothly
- **Bottom Navigation**: Consider bottom navigation bar for mobile (easy thumb access)

#### Desktop-Specific Design Considerations
- **Hover States**: Rich hover effects for buttons, links, cards
- **Keyboard Navigation**: Full keyboard support (Tab, Enter, Arrow keys, Escape)
- **Mouse Interactions**: Precise pointer interactions, tooltips on hover
- **Multi-Window**: Consider if app should work in smaller windows
- **Drag & Drop**: If applicable, support drag interactions
- **Context Menus**: Right-click menus for additional actions (copy, share)

#### Typography Scaling
- **Mobile**: 
  - Headings: 24-28px
  - Body: 16-18px (readable on small screens)
  - Line height: 1.6-1.7 for readability
- **Tablet**: 
  - Headings: 32-36px
  - Body: 18-20px
- **Desktop**: 
  - Headings: 36-48px
  - Body: 18-22px
  - Line length: Max 70-75 characters for optimal reading

#### Component Adaptations by Device

**Dropdown/Select Component:**
- **Mobile**: Full-screen bottom sheet or native mobile picker
- **Desktop**: Dropdown menu with search/filter

**Button Sizes:**
- **Mobile**: 48-56px height (easy to tap)
- **Desktop**: 40-44px height (precise click)

**Card/Content Container:**
- **Mobile**: Full-width with 16px padding
- **Desktop**: Bordered card with shadow, 24px padding

**Navigation:**
- **Mobile**: Hamburger menu or bottom navigation
- **Desktop**: Horizontal top navigation bar

#### Cross-Platform Feature Parity
- **Core Features**: All features work identically on mobile and desktop
- **Performance**: Same performance targets apply to both platforms
- **Offline Support**: Works offline on both (with PWA)
- **Accessibility**: WCAG 2.1 AA compliance on all devices

### Animation & Interaction Guidelines
- **Transition Timing**: All animations use CSS transitions (150-300ms) for smooth feel
- **Loading States**: Skeleton screens or subtle pulse animations (not blocking spinners)
- **Button Feedback**: Immediate visual feedback on click (<50ms) before API call
- **Content Reveal**: Progressive fade-in for summary content (prevents jarring appearance)
- **Scroll Performance**: Use `will-change` and `transform` for hardware acceleration
- **Debouncing**: Input fields debounced to prevent excessive API calls while typing
- **Optimistic Rendering**: Show expected UI state immediately, update if API fails

## Database Schema

**No database required for MVP** - The app will be stateless and rely on:
- Client-side state management for UI state
- OpenRouter API for all content generation
- Static JSON file for Bible book/chapter metadata

### Future Database Schema (if adding user features)

If authentication/accounts are added later:

```sql
-- Users Table (optional, future enhancement)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Reading History (optional, future enhancement)
CREATE TABLE reading_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  book VARCHAR(50) NOT NULL,
  chapter INTEGER NOT NULL,
  viewed_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, book, chapter)
);

-- Bookmarks (optional, future enhancement)
CREATE TABLE bookmarks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  book VARCHAR(50) NOT NULL,
  chapter INTEGER NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Note**: For MVP, use browser LocalStorage if history/bookmarks are needed without backend.

## Routes / Pages

### Route Structure (Next.js App Router)

```
/                          → Homepage (Chapter Selector)
/summary/[book]/[chapter]  → Results Page (Summary & Takeaways)
/about                     → About Page (Optional)
/privacy                   → Privacy Policy (Optional)
```

### Page Components

1. **`app/page.tsx`** - Homepage
   - Book selector component
   - Chapter selector component
   - Generate button
   - Brief value proposition

2. **`app/summary/[book]/[chapter]/page.tsx`** - Summary Page
   - Displays chapter reference
   - Renders summary section
   - Renders takeaways section
   - Navigation back to home
   - Option to generate another chapter

3. **`app/api/generate/route.ts`** - API Route Handler
   - Receives book and chapter
   - Fetches KJV text for that chapter
   - Calls OpenRouter API with system prompt
   - Returns summary and takeaways
   - Handles errors gracefully

### API Route Structure

```
POST /api/generate
Body: {
  book: string,
  chapter: number
}

Response: {
  summary: string,
  takeaways: string[],
  reference: string
}
```

### System Prompt Template (for LLM)

```
You are a biblical scholar and practical life coach. Your task is to provide 
faithful, accurate, and practical insights about Bible chapters.

Given the text from [BOOK] Chapter [CHAPTER] of the King James Version:

1. Provide a clear, concise 2-3 paragraph summary that captures the main 
   themes, events, and spiritual lessons.

2. Extract 3-5 practical takeaways that:
   - Remain faithful to the biblical text and its intended meaning
   - Connect ancient wisdom to modern daily life
   - Provide actionable steps for application
   - Are relevant to contemporary challenges

Guidelines:
- Be respectful and faithful to Scripture
- Avoid theological speculation beyond clear biblical principles
- Make insights practical and applicable
- Use clear, accessible language
- Focus on transformation and personal growth

Bible Text:
[CHAPTER_TEXT_HERE]
```

## Performance Requirements

**Critical Priority**: The app must feel instant and smooth. Any lag or stutter disrupts the learning flow and reduces engagement.

### Performance Targets
- **First Contentful Paint (FCP)**: < 1.5 seconds
- **Largest Contentful Paint (LCP)**: < 2.5 seconds
- **Time to Interactive (TTI)**: < 3.5 seconds
- **Cumulative Layout Shift (CLS)**: < 0.1 (no visual jumps)
- **First Input Delay (FID)**: < 100ms (instant button/interaction feedback)
- **Animation Frame Rate**: Consistent 60fps for all animations
- **API Response Perception**: Show loading state within 50ms of user action

### Smooth Interaction Requirements
1. **Button Clicks**: Visual feedback must appear within 50ms (CSS active state)
2. **Navigation**: Page transitions complete in < 200ms with smooth animations
3. **Dropdown Menus**: Open/close animations at 60fps, no lag
4. **Scrolling**: Smooth, native-like scrolling with momentum on all devices
5. **Form Interactions**: Input fields respond instantly without delay
6. **Loading States**: Progressive content reveal (not blocking), skeleton screens preferred

## Implementation Considerations

### Performance Optimization

#### Frontend Optimizations
- **Code Splitting**: Route-based code splitting with Next.js dynamic imports
- **Image Optimization**: Next.js Image component with lazy loading
- **Font Loading**: Font-display: swap, preload critical fonts
- **Bundle Size**: Target < 200KB initial bundle (gzipped)
- **Tree Shaking**: Remove unused code, use ES modules
- **React Optimization**:
  - `React.memo()` for expensive components
  - `useMemo()` and `useCallback()` to prevent unnecessary re-renders
  - Virtual scrolling if long lists are needed
- **CSS Optimization**: Critical CSS inlined, non-critical CSS loaded asynchronously
- **Animation Performance**: Use `transform` and `opacity` only (GPU-accelerated), avoid `height/width` animations

#### Caching Strategy
- **Static Assets**: Aggressive caching with long cache headers (Vercel CDN)
- **API Responses**: Cache LLM responses for popular chapters (localStorage + Vercel KV)
  - Cache key: `book-chapter-hash`
  - Cache duration: 30 days for summaries (rarely change)
- **Bible Text**: Pre-load or embed as static JSON (no runtime fetch needed)
- **Service Worker**: Optional PWA caching for offline access

#### Network Optimization
- **HTTP/2**: Enabled by default on Vercel
- **Compression**: Gzip/Brotli compression for all assets
- **Request Deduplication**: Prevent duplicate API calls for same chapter
- **Prefetching**: Prefetch adjacent chapters in background (next/previous)
- **Streaming**: Stream LLM responses if possible (server-sent events)

#### API Call Optimization
- **Debouncing**: Debounce search inputs (300ms delay)
- **Request Queueing**: Queue requests if user clicks multiple times
- **Connection Pooling**: Reuse HTTP connections where possible
- **Timeout Handling**: 10-second timeout with graceful fallback
- **Retry Logic**: Exponential backoff (max 2 retries) with user notification

#### Rendering Optimization
- **Server-Side Rendering**: Use Next.js SSR for initial page load
- **Incremental Static Regeneration (ISR)**: Pre-render popular chapters
- **Progressive Enhancement**: Core functionality works without JavaScript
- **Suspense Boundaries**: Show loading states at component level (not full page)
- **Concurrent Rendering**: Use React 18+ concurrent features for smoother updates

#### Mobile-Specific Optimizations
- **Touch Optimization**: 
  - Larger tap targets (min 44x44px), no hover-only interactions
  - Touch feedback via `:active` states (visual confirmation)
  - Prevent accidental double-taps (touch-action CSS)
  - Disable text selection on buttons/interactive elements
- **Viewport Meta**: 
  - Proper viewport configuration: `<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes">`
  - Prevent zoom on input focus (but allow manual zoom for accessibility)
- **Mobile Font Sizing**: 
  - Use relative units (rem/em) for accessibility
  - Minimum 16px font size to prevent iOS auto-zoom
  - Fluid typography with `clamp()` for scaling
- **Performance on Mobile**:
  - Reduced JavaScript bundle size for mobile (code splitting)
  - Lazy load images below the fold
  - Optimize for lower-end devices (reduce animation complexity if needed)
- **Network Awareness**: 
  - Detect slow 3G/4G and adjust behavior (show cached content first)
  - Connection API to show offline/online status
  - Progressive loading based on connection speed
- **Mobile Browser Compatibility**:
  - Test on iOS Safari, Chrome Android, Samsung Internet
  - Handle mobile browser quirks (address bar hide/show)
  - Prevent pull-to-refresh interference (if needed)

#### Desktop-Specific Optimizations
- **Mouse & Keyboard Interactions**:
  - Rich hover states for better UX
  - Keyboard shortcuts for power users (Ctrl+K for search, etc.)
  - Focus visible states for keyboard navigation
  - Context menus for additional actions
- **Multi-Monitor Support**:
  - Layout works well on ultrawide screens
  - Content doesn't stretch too wide (max-width constraints)
- **Browser Compatibility**:
  - Chrome, Firefox, Safari, Edge (latest 2 versions)
  - Graceful degradation for older browsers

#### Responsive Testing Requirements
- **Device Testing**: 
  - Test on real devices (not just browser dev tools)
  - iOS devices: iPhone SE, iPhone 12/13/14, iPhone Pro Max
  - Android devices: Pixel, Samsung Galaxy (various sizes)
  - Tablets: iPad, Android tablets
- **Screen Size Testing**:
  - Small mobile: 320px-375px
  - Large mobile: 376px-428px
  - Tablet: 768px-1024px
  - Desktop: 1024px-2560px (including ultrawide)
- **Orientation Testing**:
  - Portrait and landscape for mobile/tablet
  - Window resize on desktop
- **Browser Testing**:
  - Chrome, Firefox, Safari, Edge on desktop
  - Safari iOS, Chrome Android, Samsung Internet on mobile

### Error Handling
- Network failures: Retry mechanism with exponential backoff
- API errors: User-friendly error messages
- Invalid chapter: Validation before API call
- Rate limit exceeded: Queue requests or show wait time

### Security
- API key management: Store OpenRouter API key in environment variables
- Input validation: Sanitize book/chapter inputs
- CORS: Configure appropriately for production

### SEO & Metadata
- Dynamic meta tags for each chapter summary page
- Open Graph tags for social sharing
- Structured data (Schema.org) for better search visibility

### Performance Best Practices for Development

#### Code Quality Checks
- **Lighthouse CI**: Automated performance testing in CI/CD pipeline
- **Bundle Analyzer**: Monitor bundle size, alert if > 200KB
- **Performance Budgets**: Set and enforce performance budgets per route
- **Real User Monitoring (RUM)**: Track actual user performance metrics

#### Development Workflow
- **Performance Testing**: Test on real devices (not just desktop)
- **Network Throttling**: Test on 3G/4G speeds during development
- **Profiling**: Use React DevTools Profiler to identify slow renders
- **Chrome DevTools**: Regular audits with Performance and Lighthouse tabs

#### Anti-Patterns to Avoid
- ❌ Blocking JavaScript in `<head>` (use async/defer)
- ❌ Large synchronous operations on main thread
- ❌ Unoptimized images (use Next.js Image component)
- ❌ Excessive re-renders (use React DevTools to catch)
- ❌ Loading all data upfront (lazy load, code split)
- ❌ Heavy third-party scripts (load asynchronously or defer)
- ❌ Animation without `transform`/`opacity` (causes layout thrashing)

#### Monitoring & Alerting
- **Core Web Vitals**: Track FCP, LCP, CLS, FID in production
- **API Response Times**: Monitor OpenRouter API latency
- **Error Rates**: Track failed API calls and retry success rates
- **User Feedback**: Monitor for performance-related complaints

## Success Metrics (Post-Launch)

- **Engagement**: Average chapters viewed per session
- **Time on Page**: How long users spend reading summaries
- **Retention**: Return visits within 7/30 days
- **Performance Metrics**: 
  - Page load time (target < 2s on mobile, < 1.5s on desktop)
  - API response time (target < 3s)
  - First Input Delay (target < 100ms)
  - Cumulative Layout Shift (target < 0.1)
  - Time to Interactive (target < 3.5s on mobile, < 2.5s on desktop)
- **Cross-Platform Metrics**:
  - Mobile vs Desktop usage ratio
  - Performance differences between platforms
  - Touch vs mouse interaction rates
  - Orientation usage (portrait/landscape)
- **Error Rate**: Failed API calls, user-reported issues
- **User Experience**: Bounce rate, time on page, interactions per session
- **Device-Specific Metrics**: 
  - Mobile device breakdown (iOS vs Android)
  - Screen size distribution
  - Browser usage across platforms

## Future Roadmap

### Phase 1: MVP Launch (Weeks 1-2)
- Core functionality: chapter selection, summary generation
- Basic UI/UX implementation with **performance-first approach**
- Performance optimization: caching, code splitting, lazy loading
- Performance testing: Lighthouse scores > 90, Core Web Vitals passing
- Deployment to Vercel with performance monitoring enabled

### Phase 2: Enhancement (Weeks 3-4)
- LocalStorage-based history
- Export/share functionality
- Performance optimization

### Phase 3: Growth (Month 2+)
- Reading plans feature
- Multiple translations
- Community features (optional)
- Mobile app consideration

## Resources & References

- **Bible Text Source**: Public domain KJV (Project Gutenberg, or embedded JSON)
- **OpenRouter**: https://openrouter.ai/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Vercel Deployment**: https://vercel.com/docs

---

**Version**: 1.0  
**Last Updated**: 2024  
**Status**: Ready for Development