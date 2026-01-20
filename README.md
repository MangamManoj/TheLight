# TheLight: Bible Chapter Summaries & Practical Insights

A modern web application that transforms Bible reading into an engaging, practical, and transformative experience by providing instant, AI-generated summaries and actionable insights for any Bible chapter.

## Features

- **Instant Clarity**: Get clear, concise summaries of any Bible chapter in seconds
- **Practical Application**: Receive real-world takeaways that bridge ancient wisdom with modern life
- **Faithful Interpretation**: AI-generated content that remains true to Scripture and biblical principles
- **Zero Friction**: No login, no signup, completely free and open access

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **LLM Providers**: OpenAI (primary), Google Gemini (fallback)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or pnpm package manager
- API keys from OpenAI and/or Google (at least one required)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd TheLight
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```env
# OpenAI API Key (Primary - recommended)
OPENAI_API_KEY=your_openai_api_key_here

# Google Gemini API Key (Fallback)
GOOGLE_API_KEY=your_google_api_key_here

# Optional: App URL for OpenRouter (if using)
OPENROUTER_API_KEY=your_openrouter_api_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### API Key Setup

**OpenAI (Recommended):**
- Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
- The app uses `gpt-4o-mini` by default (cost-effective)

**Google Gemini (Fallback):**
- Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
- Used automatically if OpenAI fails

**Note:** The app will try OpenAI first, then fallback to Gemini if OpenAI is unavailable or fails.

## License

MIT
