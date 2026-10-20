# Kannada for Everyone

### Kannada Digital Innovation Hackathon 2026

A practical Kannada-learning web application for non-Kannada speakers, with Telugu meanings, English guidance, everyday vocabulary, short conversations, quizzes, and live AI translation.

The project combines self-contained learning material with optional online AI services. This README describes the current repository, not planned capabilities; it does not certify language accuracy or claim that quality checks have passed.

## Problem statement

People moving to Karnataka for study, work, or everyday life often need usable Kannada before they can study the language formally. Telugu-speaking learners benefit from familiar-script meanings, while English transliteration helps learners pronounce Kannada without first mastering its script.

**Kannada for Everyone** aims to lower this barrier through practical words and phrases, realistic dialogue examples, quick vocabulary practice, and translation guidance for real-world situations.

## Current features

| Area | Available functionality |
| --- | --- |
| AI translator | Telugu or English to Kannada, and Kannada to Telugu; Kannada transliteration, Telugu-script pronunciation, English meaning, and an example sentence. Includes direction swapping, copy, clear, example inputs, loading/error/retry states, browser-local history, and saved phrases. Responses come from a server-side AI service, not canned demo translations. |
| Vocabulary | Categorized Kannada words and phrases with English meaning, Telugu meaning, and romanized pronunciation; search, category filters, favourites, mark-as-learned controls, and audio buttons. |
| Conversations | Read-aloud dialogue examples for meeting a neighbour, taking an auto-rickshaw, and ordering at a darshini, with Kannada script, pronunciation, and English translations. The current page is not an interactive AI tutor. |
| Quizzes | Randomized multiple-choice vocabulary questions, answer validation, correct/incorrect feedback, final scores, and a new-quiz option. |
| Learning progress | Learned-word tracking, quiz count, best/latest quiz scores, and reset controls. |
| Learning dashboard | A beginner learning path, phrase of the day, daily XP goal, level indicator, streak display, and a first-word badge indicator. Vocabulary learning and successful unique translations earn XP; quiz completion currently updates quiz statistics rather than awarding XP. |
| Pronunciation | Uses a device Kannada speech-synthesis voice when available, otherwise requests AI-generated speech. If audio cannot be obtained, a message directs the learner to the written pronunciation guide. |

### Current limitations

- Learning progress, favourites, XP, and translation history are stored in this browser, not synchronized between devices or accounts. Clearing browser data removes them.
- AI translation and fallback audio require internet access, a configured server credential, and available AI credits. Basic vocabulary, dialogue reading, and quizzes do not require paid AI calls.
- A server-side conversation-feedback function exists, but the conversations page does not yet call it.
- Typing, matching, and interactive conversation quiz modes are not implemented.
- Vocabulary entries do not yet include individual example sentences. Kannada and Telugu content still needs native-speaker review, and important AI translations should be checked independently.

## Technology stack

The following technologies are present in the actual repository:

- **React 19 and TypeScript** — application components and typed learning logic.
- **TanStack Start and TanStack Router** — full-stack application, file-based routes, and server functions.
- **Vite** — development server and production build, configured through `@lovable.dev/vite-tanstack-config`.
- **Tailwind CSS 4**, **Radix UI primitives**, and **class-variance-authority** — styling and reusable UI controls.
- **Lucide React** — icons; **Sonner** — notification messages.
- **Lovable AI Gateway**, **Vercel AI SDK**, and **`@ai-sdk/openai`** — server-side translation and answer-feedback requests. The translation implementation currently selects `openai/gpt-6-astra`.
- **Browser Web Speech API** and a server speech endpoint — pronunciation playback. The fallback endpoint currently selects `google/gemini-3.1-flash-tts-preview`.
- **Lovable Cloud client/auth integration** — generated backend integration; learning records themselves currently use browser `localStorage`.
- **Vitest**, **React Testing Library**, **jest-dom**, and **jsdom** — automated test tooling.
- **ESLint and Prettier** — linting and formatting.
- **Bun** — repository lockfile and package-manager configuration. npm-compatible scripts also exist in `package.json`.

## Architecture

```text
src/
  routes/
    __root.tsx          Shared application shell
    index.tsx           Learning dashboard (/)
    vocabulary.tsx      Vocabulary page
    translator.tsx      AI translation interface
    conversations.tsx   Dialogue examples
    quiz.tsx            Multiple-choice practice
    progress.tsx        Learning statistics
    api/tts.ts          Server-side speech endpoint
  components/           Navigation, vocabulary browser, quiz, audio, UI controls
  lib/
    kannada/data.ts     Learning content and categories
    kannada/logic.ts    Search, filtering, quiz generation, and scoring
    progress.ts        Browser-local learned words and quiz results
    game.ts            Browser-local XP, activity IDs, streaks, and favourites
    ai/                Translation/feedback server functions and AI helpers
  integrations/         Generated Lovable Cloud client/auth support
  test/                 Unit, interaction, and routing tests
  styles.css            Shared design tokens and styles
```

`src/router.tsx` configures routing. `src/start.ts` configures request/function middleware, including cross-site request protection for server functions. `src/server.ts` wraps server-side rendering error handling. `src/routeTree.gen.ts` is generated by the router and should not be edited manually.

### Learning workflow

1. Start from the dashboard and select vocabulary, a conversation, a quiz, or the translator.
2. Vocabulary search and category filtering operate on the bundled learning content.
3. Marking words as learned updates local progress; activity IDs prevent repeat XP awards while those records remain stored.
4. Quiz completion records the score and updates best/latest results.
5. Translation input is validated on the server, sent to the AI Gateway, and converted into typed result fields. Successful results can be copied, played, saved, or retained in local history.
6. Audio playback prefers a Kannada device voice, then uses `/api/tts` as an online fallback.

### Storage

| Browser storage key | Contents |
| --- | --- |
| `kfe-progress-v1` | Learned word IDs and quiz statistics |
| `kfe-game-v1` | XP activities, activity dates, and vocabulary favourites |
| `kfe-translations-v1` | Recent translations and saved translation phrases |

Local storage is a convenience for a prototype, not secure or tamper-proof storage. Do not use browser XP as authoritative evidence for prizes, payments, or competitive rankings.

## Setup and installation

### Prerequisites

- Git, if cloning the repository.
- Bun installed locally; this repository includes `bun.lock` and `bunfig.toml`.
- Access to this project's public backend configuration for the generated integration.
- A valid server-side Lovable AI credential only if you intend to use translation or online audio locally.

### Install and run locally

Clone the project's connected repository using its actual URL, or download its code from Lovable. Open a terminal in the repository root, then run:

```sh
bun install --frozen-lockfile
cp .env.example .env.local
```

Fill in `.env.local` as described below. To make server-only values available to the local server, use the following POSIX-shell commands:

```sh
set -a
. ./.env.local
set +a
bun run dev
```

Open the local address printed by Vite. The repository does not specify a standalone fixed port in `package.json`; do not assume the Lovable preview port applies to every local environment.

### Repository scripts

These commands correspond to existing `package.json` scripts:

```sh
bun run test         # Vitest, one run
bun run test:watch   # Vitest, watch mode
bun run lint         # ESLint
bun run build        # Vite production build
bun run preview      # Preview the built application
bun run format      # Prettier; modifies files
```

The repository also has `build:dev` for a development-mode build. There is no dedicated `typecheck` script in `package.json`. This documentation update does not assert that tests, linting, type checks, or builds were executed or passed.

The build configuration targets a Cloudflare-compatible server runtime through the Lovable Vite configuration. A static-only host is not sufficient for translation and speech endpoints; another hosting environment needs compatible server execution and securely configured runtime variables.

## Environment variables

`.env.example` contains variable names and empty values only. It intentionally contains no real endpoint, project ID, API key, password, or token.

| Variable | Purpose | Visibility |
| --- | --- | --- |
| `VITE_SUPABASE_URL` | Public Lovable Cloud endpoint consumed by the generated client | Browser-visible |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Public/publishable client key | Browser-visible; never substitute a privileged key |
| `VITE_SUPABASE_PROJECT_ID` | Public project identifier used in the project environment | Browser-visible |
| `SUPABASE_URL` | Server-side counterpart of the backend endpoint | Server environment |
| `SUPABASE_PUBLISHABLE_KEY` | Server-side counterpart of the publishable key | Server environment |
| `SUPABASE_PROJECT_ID` | Project environment counterpart of the public identifier | Server environment |
| `LOVABLE_API_KEY` | Credential for live AI translation, feedback, and fallback speech | **Private; server-only** |

The variable names retain the generated integration's naming convention; they refer to this project's Lovable Cloud configuration. Use the project's own configuration, not values copied from another repository.

### Secure AI configuration

- In Lovable, manage private credentials using the project's server secrets controls; an already managed AI credential does not need to be copied into source files.
- For local development or another server host, supply a valid authorized AI Gateway credential as the server environment variable `LOVABLE_API_KEY`.
- Never create `VITE_LOVABLE_API_KEY`: Vite-prefixed variables are exposed to the browser.
- Restart a local server after changing runtime credentials; rebuild when changing browser-visible `VITE_*` configuration.
- Without an AI credential, the translator and online speech fallback return configuration/unavailability errors instead of fake results.
- No private service-role key or database password is required for these documented learning features, and managed Lovable Cloud does not provide those credentials for export.

## Security and privacy

- **Never publish private API keys, access tokens, passwords, session data, or filled-in environment files.** Commit only the empty `.env.example` template.
- The current repository tracks `.env`; do not put private credentials there. Use `.env.local`, which the existing `*.local` ignore rule excludes from Git, and check staged files before sharing code.
- Private credentials must remain in server secrets or the server environment. Public/publishable client keys are not a substitute for access-control policies.
- Translation and feedback functions validate and length-limit inputs; returned AI fields are checked before display. The speech endpoint accepts limited Kannada-script input.
- Text entered into AI translation, and phrases sent for online speech, are transmitted to an external AI service. Avoid submitting sensitive or personal information.
- Browser-local learning history can be inspected by anyone with access to that browser profile. Local storage does not provide encryption or account isolation.
- Do not assume the prototype has passed a security audit. Review access controls, abuse prevention, rate limits, logging, and dependencies before wider production use.
- If a private credential is accidentally exposed, revoke/rotate it and address repository history rather than merely deleting it from the latest file.

## Future improvements

These are proposals, **not implemented features**:

- Native-speaker review of Kannada, Telugu meanings, and pronunciation guidance.
- Example sentences for each vocabulary entry.
- Interactive college, shopping, travel, and restaurant practice with Telugu explanations and the existing feedback function connected to the interface.
- Typing, matching, and revision quiz modes with more detailed explanations.
- A complete earned-badge system and carefully deduplicated quiz XP rewards.
- Optional account-based cross-device progress with appropriate privacy controls.
- More reliable reviewed pronunciation recordings and offline learning support.
- Expanded automated coverage for live AI states, audio errors, progress edge cases, mobile layouts, and accessibility.
- Production monitoring and abuse/rate-limit controls for paid AI endpoints.

## GitHub synchronization

Lovable manages commits and synchronization with a connected repository; this README and `.env.example` are ordinary project files and are included in that workflow. GitHub synchronization must already be configured for this project.

To verify delivery, open **Project settings → Git** in Lovable and check the connection/status, then confirm these files on the repository's synced branch. The documentation itself does not prove synchronization succeeded; a disconnected or blocked connection requires attention in that status screen.
