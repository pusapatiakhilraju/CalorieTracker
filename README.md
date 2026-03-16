# CalorieTracker — Claude Project Notes

## Project Overview
An iOS and Android Calorie Tracker app built with React Native + Expo.
- App name: `CalorieTracker`, slug: `calorie-tracker`
- Orientation: portrait, UI style: light
- Supports: iOS (incl. tablet), Android, Web

## Tech Stack
- **Framework**: Expo (SDK ~54)
- **Runtime**: React Native 0.81.5 / React 19.1.0
- **Entry point**: `App.js` via `expo/AppEntry.js`
- **Bundler**: Babel with `babel-preset-expo`
- **Plugins**: `expo-asset`

## How to Run the Project

### Prerequisites
- Node.js installed
- Expo CLI: `npm install -g expo-cli` (or use `npx expo`)
- For iOS: Xcode + iOS Simulator (macOS only)
- For Android: Android Studio + emulator, or a physical device with Expo Go app

### First-time setup
```bash
git clone <repo>
cd CalorieTracker
npm install          # installs all dependencies from package.json
```

### Running
```bash
npm start            # opens Expo dev server + QR code in terminal
npm run ios          # launch iOS simulator directly
npm run android      # launch Android emulator directly
```

### Running on a physical device
1. Install **Expo Go** from the App Store or Google Play
2. Run `npm start`
3. Scan the QR code with Expo Go (Android) or Camera app (iOS)

### Troubleshooting
- If metro bundler gets stuck: `npm start -- --clear` (clears cache)
- If `node_modules` is broken: `rm -rf node_modules && npm install`

---

## Package Management (Node / npm)
- `package.json` — defines all dependencies (Node's equivalent of `requirements.txt`)
- `package-lock.json` — locks exact versions, always commit this
- `node_modules/` — gitignored, regenerated via `npm install`
- Add a package: `npm install <package-name>`
- Add a dev dependency: `npm install --save-dev <package-name>`

---

## Conda Environments (Python context)
If any Python tooling or scripts are added to this project, use conda to manage the environment.

### Key conda commands
```bash
conda create -n calorie-tracker python=3.11   # create env
conda activate calorie-tracker                # activate env
conda deactivate                              # deactivate env
conda env list                                # list all envs
conda install <package>                       # install into active env
pip install <package>                         # also works inside conda env
conda env export > environment.yml            # export env (like package-lock.json)
conda env create -f environment.yml           # recreate from export
```

### Best practices
- Always activate the correct conda env before running Python scripts
- Commit `environment.yml` to git (equivalent of `package-lock.json` for Python)
- Do NOT commit the conda env folder itself — add it to `.gitignore`
- One env per project to avoid dependency conflicts

---

## Project Structure
```
CalorieTracker/
├── App.js              # root component
├── app.json            # Expo app config (name, icons, splash, platform settings)
├── babel.config.js     # Babel config (uses babel-preset-expo)
├── package.json        # JS dependencies
├── package-lock.json   # locked JS versions
├── assets/             # icon.png, splash-icon.png, adaptive-icon.png, favicon.png
└── node_modules/       # (gitignored)
```

## Git Notes
- Commit: `package.json`, `package-lock.json`, `app.json`, `assets/`, `App.js`
- Ignore: `node_modules/`, `.expo/`, any conda env folders
