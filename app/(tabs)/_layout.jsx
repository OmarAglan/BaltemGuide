import { AntDesign } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import React from 'react'

const TabsLayout = () => {
    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#5b7584',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {
                backgroundColor: '#fafafa',
                borderTopWidth: 1,
                borderTopColor: '#e0e0e0',
                paddingHorizontal: 20,
                paddingVertical: 5,
                height: 70,
                borderRadius: 20,
                position: 'absolute',
                bottom: 10,
                left: 20,
                right: 20,
                elevation: 0,
                shadowColor: 'transparent',
                shadowOffset: {
                    width: 0,
                    height: 0,
                },
                shadowOpacity: 0,
                shadowRadius: 0,
                borderWidth: 1,
                borderColor: '#e0e0e0',
                overflow: 'hidden',

            }
        }}>
            <Tabs.Screen name="home" options={{
                headerShown: false,
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, size }) => (
                    <AntDesign name="home" size={24} color="black" />
                )
            }} />
            <Tabs.Screen name="explore" options={{
                headerShown: false,
                tabBarLabel: 'Explore',
                tabBarIcon: ({ color, size }) => (
                    <AntDesign name="search1" size={24} color="black" />
                )
            }} />
            <Tabs.Screen name="profile" options={{
                headerShown: false,
                tabBarLabel: 'Profile',
                tabBarIcon: ({ color, size }) => (
                    <AntDesign name="user" size={24} color="black" />
                )
            }} />

        </Tabs >
    )
}

export default TabsLayout