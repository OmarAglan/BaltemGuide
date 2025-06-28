import { View, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { images } from '../assets';
import Button from '../components/button';
import Input from '../components/input';
import { EyeIcon } from 'react-native-heroicons/solid';
import { useSignUp } from '@clerk/clerk-expo';

const { signup } = images;

export default function SignUpScreen() {
  const router = useRouter();
  const { isLoaded, signUp } = useSignUp();

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleInputChange = (key: string, value: string) => {
    setUserData({ ...userData, [key]: value });
  };

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    const { name, email, password } = userData;

    try {
      // Create the user on Clerk
      await signUp.create({
        firstName: name,
        emailAddress: email,
        password,
      });

      // NOTE: Clerk sends a verification email by default. In a production app,
      // you would navigate to a verification screen to enter the code.
      // For now, we will proceed to the next step in the onboarding flow.
      console.log('User created. In a real app, you would verify the email now.');

      // Navigate to the next screen as per the original flow
      router.push({ pathname: '/selectGrade', params: { userData: JSON.stringify(userData) } });

    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert('Sign Up Error', err.errors?.[0]?.message || 'An error occurred during sign up.');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-bgWhite px-8">
      <View className="flex-1 flex justify-around">
        {/** ====================== Image ============================= */}
        <View className="flex-row justify-center mb-[-15%] mt-[-10%]">
          <Image source={signup} style={{ width: 353, height: 235 }} />
        </View>
        {/** ====================== Sign Up inputs ============================= */}
        <View className="flex flex-col w-full items-center justify-center mt-3">
          <Input
            label={'Name'}
            placeholder={'Your name'}
            value={userData.name}
            onChange={(text) => handleInputChange('name', text)}
          />
          <Input
            label={'Email address'}
            placeholder={'name@example.com'}
            value={userData.email}
            onChange={(text) => handleInputChange('email', text)}
          />
          <Input
            label={'Password'}
            placeholder={'**********'}
            Icon={EyeIcon}
            value={userData.password}
            onChange={(text) => handleInputChange('password', text)}
            last
          />
        </View>

        {/** ====== Action button -> Navigation to grade selection screen ======= */}
        <Button
          primaryBtnText={'Sign Up'}
          onPrimaryBtnPress={onSignUpPress}
          secondaryBtnText1={'Already have an account?'}
          secondaryBtnText2={'Sign In'}
          onSecondaryBtnPress={() => router.push('/signIn')}
        />
      </View>
    </SafeAreaView>
  );
}