
# Voice Recognition

This GitHub repository is a voice recognition project implemented using React Native. The project allows users to record and transcribe voice input using speech recognition technology.
## Table of Contents

- [Getting Started](#getting-started)
- [Installation](#installation)
- [Testing](#testing)
- [Running the Project](#running-the-project)

## Getting Started

These instructions will guide you to set up and run the project locally for development and testing.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed (which includes `npm`). This project uses [yarn](https://yarnpkg.com/), so install it globally if you haven’t already:

```bash
npm install --global yarn
```

Also, make sure you have the Expo CLI installed:

```bash
npm install --global expo-cli
```

## Installation

1. Clone this repository:

    ```bash
    git clone https://github.com/0wissem/voice-recognition.git
    cd voice-recognition
    ```

2. Install dependencies:

    ```bash
    yarn
    ```

## Testing

To run the test suite:

```bash
yarn test
```

This will execute any test files defined in the project using the test runner configured (e.g., Jest).

## Running the Project

To start the project on an Android device or emulator, run:

```bash
npx expo run:android
```
Or on an Ios device or emulator, run:

```bash
npx expo run:ios
```

> **Note:** Ensure you have an Android emulator running or an Android device connected with debugging enabled. You may need to set up Android Studio if you haven’t already.

