import {
  View,
  Image,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { images } from '../assets';
import Button from '../components/button';
import Input from '../components/input';
import { EyeIcon } from 'react-native-heroicons/solid';
import { useSignIn } from '@clerk/clerk-expo';

const { signin } = images;

export default function SignInScreen() {
  const router = useRouter();
  const { signIn, setActive, isLoaded } = useSignIn();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace('/(tabs)/home');
      } else {
        // This case handles scenarios like MFA. You can add more logic here.
        console.log(JSON.stringify(signInAttempt, null, 2));
        Alert.alert('Sign In Failed', 'Please check your credentials.');
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert('Sign In Error', err.errors?.[0]?.message || 'An error occurred during sign in.');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-bgWhite px-8">
      <View className="flex-1 flex justify-around my-4">
        {/** ====================== Image ============================= */}
        <View className="flex-row justify-center mb-[-15%]">
          <Image source={signin} style={{ width: 266, height: 266 }} />
        </View>

        {/** ====================== Sign In inputs ============================= */}
        <View className="flex flex-col w-full items-center justify-center mt-3">
          <Input
            label={'Email address'}
            placeholder={'name@example.com'}
            value={emailAddress}
            onChange={setEmailAddress}
          />
          <Input
            label={'Password'}
            placeholder={'********'}
            Icon={EyeIcon}
            value={password}
            onChange={setPassword}
            last
          />
        </View>

        {/** ====================== Action button ============================= */}
        <Button
          primaryBtnText={'Sign In'}
          onPrimaryBtnPress={onSignInPress}
          secondaryBtnText1={"Don't have an account?"}
          secondaryBtnText2={'Sign Up'}
          onSecondaryBtnPress={() => router.push('/signUp')}
        />
      </View>
    </SafeAreaView>
  );
}