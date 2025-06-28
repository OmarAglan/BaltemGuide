import { Stack, useRouter } from 'expo-router';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error('Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env file');
}

function RootLayoutNav() {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      // Automatically navigate to sign-in if the user is not signed in
      // and the auth state is loaded.
      // You can add more complex logic here to handle which routes are public.
      // For now, we assume most of the app is protected.
      // The initial route 'index' (onboarding) is public.
    }
  }, [isLoaded, isSignedIn]);


  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="signIn" options={{ title: 'Sign In' }} />
      <Stack.Screen name="signUp" options={{ title: 'Sign Up' }} />
      <Stack.Screen name="selectGrade" options={{ title: 'Select Grade' }} />
      <Stack.Screen name="selectProvince" options={{ title: 'Select Province' }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}


export default function RootLayout() {
  const [loaded, error] = useFonts({
    'Almarai-Bold': require('../assets/fonts/Almarai-Bold.ttf'),
    'Almarai-ExtraBold': require('../assets/fonts/Almarai-ExtraBold.ttf'),
    'Almarai-Light': require('../assets/fonts/Almarai-Light.ttf'),
    'Almarai-Regular': require('../assets/fonts/Almarai-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <ClerkProvider publishableKey={publishableKey}>
      <RootLayoutNav />
    </ClerkProvider>
  );
}