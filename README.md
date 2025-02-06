
# Expense Tracker App by Arshad

A modern, professional expense tracker built with [React Native](https://reactnative.dev/), [Expo](https://expo.dev/), and [Expo Router](https://expo.github.io/router/docs/). This app allows users to add, view, and delete expenses while providing visual insights through line and pie charts using [react-native-chart-kit](https://github.com/indiespirit/react-native-chart-kit).

## Features

- **Add Expense:** Input expense details including description and amount.
- **Expense List:** View all expenses with smooth animations.
- **Total Overview:** See a summary of all expenses.
- **Monthly Trends:** Visualize expenses aggregated by month using a line chart.
- **Spending by Description:** Analyze spending per expense description with a pie chart.
- **Modern UI:** Styled with [React Native Paper](https://callstack.github.io/react-native-paper/) for a sleek, material design look.
- **Smooth Animations:** Animated transitions and list items for a refined user experience.

## Project Structure

```
ExpenseTracker/
├── app/
│   ├── _layout.jsx           # Global layout and theme provider for all routes
│   ├── index.jsx             # Home screen with dashboard, charts, and expense list
│   ├── add-expense.jsx       # Screen to add a new expense
│   └── expense-list.jsx      # Screen to view all expenses (if separate)
├── components/
│   ├── ExpenseForm.jsx       # Form component for entering expense details
│   └── ExpenseItem.jsx       # Component for rendering a single expense with animation
├── utils/
│   └── storage.js            # Utility functions for AsyncStorage (data persistence)
|   └── firebase.js           # Utility functions for firebase
└── app.json                  # Expo project configuration
```

> **Note:** Ensure that your utility files (like `storage.js`) are kept outside the `/app` folder so that Expo Router does not treat them as routes.

## Requirements

- [Node.js](https://nodejs.org/en/) (v14 or higher recommended)
- [Expo CLI](https://docs.expo.dev/workflow/expo-cli/) installed globally
- A mobile device or emulator for testing (Expo Go on iOS/Android)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/ExpenseTracker.git
   cd ExpenseTracker
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install Expo CLI globally (if not already installed):**

   ```bash
   npm install -g expo-cli
   ```

## Running the App

1. **Start the Expo server:**

   ```bash
   npx expo start
   ```

2. **Open the app:**

   - Use the Expo Go app on your mobile device by scanning the QR code.
   - Alternatively, run on an Android or iOS emulator from the Expo Dev Tools.

## Configuration

The app uses AsyncStorage for data persistence. The utility functions are defined in [`utils/storage.js`](./utils/storage.js). If you wish to modify how data is stored or integrate with a cloud solution (e.g., Firebase), update the logic in this file accordingly.

## Dependencies

- **React Native & Expo:** Core framework for building the mobile app.
- **Expo Router:** File-based routing for React Native.
- **React Native Paper:** Material Design components.
- **AsyncStorage:** For local data persistence.
- **react-native-chart-kit & react-native-svg:** For rendering charts (line and pie charts).
- **expo-haptics:** For haptic feedback on user interactions.
- **MaterialCommunityIcons:** For vector icons in the UI.

## Customization

- **Theme & Styling:** Modify the theme settings in `_layout.jsx` and styles defined in your component files to match your branding.
- **Icons:** The app uses icons from `MaterialCommunityIcons`. Check the [MaterialCommunityIcons directory](https://materialdesignicons.com/) for available icons if you need to change any icon names.
- **Animations:** Animated transitions are implemented with React Native’s Animated API. Adjust durations and delays as needed in the component files.

## Contributing

Feel free to fork the repository and submit pull requests for improvements or bug fixes. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Happy coding!
```

---

Feel free to modify any sections as needed. This README provides an overview of the project, instructions on installation and usage, details on dependencies, and guidelines for customization and contributions.
