# ToDo_App

ToDo Manager App (Basic Version)
A simple mobile ToDo management application built using React Native and Expo, developed for an internship assessment. This version is intentionally kept basic and less optimized to demonstrate core functionality.

✨ Architecture & Approach
The app follows a basic stack with screen-based navigation and local state management using AsyncStorage.
🔧 Tech Stack
React Native (JavaScript)


Expo CLI


React Navigation (Stack Navigator)


AsyncStorage for local persistence


🗂️ File Structure
.
├── App.js                     # App entry point
└── screens/
    ├── LoginScreen.js        # Simple login with non-empty validation
    ├── HomeScreen.js         # List, filter, and navigate to task screen
    └── TaskScreen.js         # Add, edit, and delete tasks

The app uses a single shared AsyncStorage key for tasks and handles all operations inline, without abstracting data logic.

🚀 Setup Instructions
1. Clone the Repository
   https://github.com/saharanji/ToDo_App
cd ToDo_App

3. Install Dependencies
npm install

4. Install Required Packages
npm install @react-native-async-storage/async-storage
npm install @react-navigation/native @react-navigation/stack
npx expo install react-native-screens react-native-safe-area-context

5. Start the App
npm start

Scan the QR code using the Expo Go app on your mobile device.



✅ Completed Features
Login screen with username/password fields
Home screen with list of tasks
Task filtering (All / Completed / Pending)
Add/Edit task screen
Delete task support
Local storage via AsyncStorage



🎁 Bonus Features
Mark task as completed via switch toggle
Reusable components (not used to keep code simple)


📝 Notes
This version is intentionally simplified:
Minimal input validation


No animations


Basic styling with inline StyleSheet
