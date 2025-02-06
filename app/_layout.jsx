import { Slot } from "expo-router";
import { Provider as PaperProvider, MD3LightTheme, adaptNavigationTheme } from "react-native-paper";
import { StatusBar } from 'expo-status-bar';
import { MD3DarkTheme as DarkTheme } from 'react-native-paper';


// Custom theme that extends MD3LightTheme
// const theme = {
//   ...MD3LightTheme,
//   colors: {
//     ...MD3LightTheme.colors,
//     primary: '#6200EE',
//     secondary: '#03DAC6',
//     background: '#F6F6F6',
//     surface: '#FFFFFF',
//     error: '#B00020',
//     text: '#000000',
//     onSurface: '#000000',
//     disabled: '#757575',
//     placeholder: '#9E9E9E',
//     backdrop: 'rgba(0,0,0,0.5)',
//     notification: '#F50057',
//   },
//   roundness: 12,
//   animation: {
//     scale: 1.0,
//   },
// };


const theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#bb86fc', // Customize as needed
    accent: '#03dac6',  // Customize as needed
    background: '#121212',
    surface: '#131313',
    text: '#ffffff',
    // Add other color customizations if necessary
  },
};


// Adapt theme for navigation
// const { DarkTheme } = adaptNavigationTheme({
//   reactNavigationLight: NavigationDefaultTheme,
//   materialLight: theme,
// });

export default function Layout() {




  return (
    <PaperProvider theme={theme}>
      <StatusBar style="light" />
      <Slot />
    </PaperProvider>
  );
}