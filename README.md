# ENGMAX — Vocabulary Builder (Android APK Ready)

ENGMAX is a flashcard-based vocabulary learning app, inspired by DuoCards.  
Learn new words in Spanish, French, German, and **Arabic**, with RTL (right-to-left) support for Arabic cards.

## Project structure

```
engmax/
├── src/              # React + TypeScript source code
├── public/           # Static assets (favicon.svg, manifest.json)
├── android/          # Capacitor Android project (generated)
├── .github/workflows/android-build.yml  # GitHub Actions APK builder
├── capacitor.config.ts   # Capacitor configuration
├── package.json
└── vite.config.ts
```

## Features

- Flashcard decks with flip animation
- Learn mode with Correct / Wrong scoring and per-card mastery stages (0–5)
- Persistent progress, decks, and user data via `localStorage`
- Dark mode / Light mode
- Bottom tab navigation (Home, Decks, Learn, Profile)
- PWA manifest for installable web experience
- **Android ready** via Capacitor (`com.engmax.app`)

## How to build the APK

This machine does not have Java or the Android SDK installed, so the APK cannot be compiled locally here. Use one of the following options:

### Option 1: GitHub Actions (recommended — automatic)

1. Push this project to a GitHub repository.
2. The workflow `.github/workflows/android-build.yml` will run automatically on push to `main`/`master` or when you trigger it manually (Actions tab → "Run workflow").
3. Download the unsigned APK from the Actions artifact page (`engmax-apk`).

### Option 2: Local Android Studio

1. Install **Android Studio** and the **Android SDK** (API level 24+).
2. Clone this repo and run:
   ```bash
   npm ci
   npm run build
   npx cap sync android
   ```
3. Open the Android project:
   ```bash
   npx cap open android
   ```
4. In Android Studio: **Build → Build Bundle(s) / APK(s) → Build APK(s)**.
5. The signed/unsigned APK will be at `android/app/build/outputs/apk/release/app-release-unsigned.apk`.

### Option 3: Manual Gradle CLI

If you have Java 17+ and the Android SDK set up:

```bash
npm run android:build
```

This builds the web app, syncs Capacitor, and runs `./gradlew assembleRelease`.

## App ID / Package

`com.engmax.app` — change it in `capacitor.config.ts` before publishing to Google Play.

## License

MIT
