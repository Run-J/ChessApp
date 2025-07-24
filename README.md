# ChessApp

A modern, cross-platform chess app built with React Native, Expo, and TypeScript. Play against AI of various levels, challenge friends locally or online, and enjoy a beautiful, responsive chess experience.


---

## 🖼️ Screenshots

### Home Page

<img width="600" alt="Home Page" src="https://github.com/user-attachments/assets/7e2300af-0f56-4ad3-aa34-af3aebac6ac5" />

  

### AI Battle Page

<img width="600" alt="AI Battle Page" src="https://github.com/user-attachments/assets/ed2e718f-d5ae-4716-812f-73d4509f0254" />

  

### In-Game (AI Battle)

<img width="600" alt="In AI Battle Game" src="https://github.com/user-attachments/assets/ec103379-6f4f-4022-b381-45abc6714d80" />

  

### Lobby - Friends

<img width="600" alt="Lobby Friends" src="https://github.com/user-attachments/assets/d9d4c62a-a4c0-43a0-b017-0d8cb27745e1" />

  

### Local Friends Match

<img width="600" alt="Local Friends" src="https://github.com/user-attachments/assets/0198f11c-090c-4fd4-866d-25af3c46c974" />

  

---

  

## 🎬 Demo GIFs

  

### UI Demo

![UI Demo](https://github.com/user-attachments/assets/a98d809a-498c-4c6a-b0f1-9f5a37c3389e)

  

### AI Battle Demo

![AI Battle Demo](https://github.com/user-attachments/assets/c56e74da-2cac-4c02-80ec-31bcc531a80f)

  

### Local Friends Demo

![Local Friends Demo](https://github.com/user-attachments/assets/fd891e06-0725-4a60-8936-b311c660203f)

  

### Remote Friends Demo

![Remote Friends Demo](https://github.com/user-attachments/assets/b428073f-16bf-471f-9856-964c905df8d4)



---
## Features

- ♟️ **AI Battle**: Play against AI opponents with multiple difficulty levels.
- 👬 **Friend Match**: Play locally on the same device or online with friends via room code.
- 🏟️ **Lobby**: Choose from a list of themed AI bots with unique avatars and statuses.
- 🎨 **Modern UI**: Clean, mobile-first design with smooth animations and feedback.
- 🔄 **Restart & Reset**: Instantly restart games or reset the board.
- 📱 **Cross-Platform**: Works on iOS, Android, and Web (via Expo).

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

### Installation

```sh
git clone https://github.com/Run-J/ChessApp.git
cd ChessApp
npm install
```

### Running the App

Start the Expo development server:

```sh
npx expo start --clear
```

Then follow the on-screen instructions to run on iOS, Android, or Web.

---

## 🗂️ Project Structure

```
ChessApp/
├── app/                      # Main app screens and navigation
│   ├── (tabs)/               # Tab navigation and main entry points
│   ├── aiBattle/             # AI battle related screens and logic
│   ├── friendBattle/         # Friend (local/remote) battle screens and logic
│   ├── utils/                # Utility functions and helpers
│   ├── layout.tsx            # App layout (global wrappers, navigation, etc.)
│   └── not-found.tsx         # 404 Not Found page
├── components/               # Reusable UI components
│   ├── GeneralButton.tsx
│   └── ChessBoard.tsx
├── stores/                   # State management (e.g., Zustand stores)
│   └── useChessStore.ts
├── assets/                   # Fonts, images, and static resources
│   ├── images/
│   └── fonts/
└── ...
```
- `app/` - Main app screens, navigation, and business logic
  - `app/(tabs)/` - Tab navigation and main entry points
  - `app/aiBattle/` - AI battle related screens and logic
  - `app/friendBattle/` - Friend (local/remote) battle screens and logic
  - `app/utils/` - Utility functions and helpers
  - `app/layout.tsx` - App layout (global wrappers, navigation, etc.)
  - `app/not-found.tsx` - 404 Not Found page
- `components/` - Reusable UI components (e.g., `GeneralButton`, `ChessBoard`)
- `stores/` - State management (e.g., `useChessStore`)
- `assets/` - Fonts, images, and static resources

---

## Key Technologies

- **React Native** & **Expo** for cross-platform development
- **TypeScript** for type safety
- **Zustand** for state management
- **chess.js** for chess logic
- **react-native-chessboard** for chessboard UI
- **WebSocket** for online friend matches
- **Stockfish** for chessAI engine

---
## How to Play

1. **AI Battle**: Go to the "AI Battle" tab, select a difficulty, and play against the AI.
2. **Friend Match**: Go to the "Friends" tab, choose local or online mode.
   - *Local*: Play on the same device.
   - *Online*: Enter a room ID to play remotely with a friend.
1. **Lobby**: Browse and challenge themed AI bots.
