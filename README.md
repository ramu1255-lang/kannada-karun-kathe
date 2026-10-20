# Kannada Karun Kathe

Act as a senior software engineer, QA automation engineer, security reviewer, and accessibility specialist.



Improve my existing "Kannada for Everyone" hackathon project. Do not rebuild it unnecessarily or remove working features. First inspect the entire existing codebase, identify issues, then implement and verify fixes.



GOAL: Maximize genuine quality across Code Quality, Security, Efficiency, Testing, Accessibility, and Problem Statement Alignment. Never fake scores, claim tests passed without running them, or hide errors.



1. TESTING

- Inspect package.json and the existing test setup.

- Configure a suitable test framework if missing.

- Add unit tests for vocabulary search, category filtering, quiz scoring, answer validation, navigation, and progress tracking.

- Add integration tests for important user flows.

- Test empty inputs, invalid answers, missing data, and edge cases.

- Fix failing tests and run the complete test suite.

- Report actual test results and any remaining failures.



2. ACCESSIBILITY

- Use semantic HTML, proper heading hierarchy, and accessible form labels.

- Ensure keyboard navigation and visible focus indicators.

- Provide sufficient text/background contrast.

- Add meaningful accessible names to buttons and controls.

- Add alt text to meaningful images.

- Do not rely on color alone to communicate results.

- Support screen readers, reduced motion, and mobile layouts.

- Check WCAG 2.2 AA criteria where applicable.



3. SECURITY

- Inspect dependencies and fix relevant vulnerabilities where safe.

- Validate and sanitize user input appropriately.

- Prevent XSS and unsafe HTML rendering.

- Never expose secrets, API keys, or private credentials in client code.

- Avoid collecting unnecessary personal data.

- Handle errors safely without exposing sensitive information.



4. CODE QUALITY

- Fix console errors, React warnings, broken imports, and TypeScript errors.

- Remove unused code and duplicated logic.

- Keep components modular and maintainable.



5. PERFORMANCE

- Optimize unnecessary React re-renders and oversized assets.

- Add loading, empty, and error states.

- Avoid unnecessary API calls and dependencies.

- Keep the mobile experience fast.



6. PROBLEM STATEMENT ALIGNMENT

- Preserve the Kannada for Everyone objective: helping non-Kannada speakers learn practical Kannada through everyday conversations, vocabulary, and guided practice.

- Ensure Kannada text, Telugu meanings, English translations, and pronunciation guides are accurate.

- Verify that vocabulary search, categories, quizzes, and conversation features actually work.

- Avoid fake AI features or nonfunctional buttons.



7. FINAL VERIFICATION

- Run available tests, lint, type checks, and production build.

- Use automated accessibility checks where possible.

- Fix all verified issues and rerun the checks.

- Clearly list checks that passed, failed, or could not be run.

- Summarize files changed, remaining limitations, and steps for manual testing.



Start by inspecting the existing project. Implement real fixes before reporting results.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://kannada-karun-kathe.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/1e1868d9-57a1-4de9-afc2-f3b36f4f40a4).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
