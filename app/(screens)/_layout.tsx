import { Stack } from 'expo-router';
import React from 'react';


export default function StackLayout() {
  

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />
      <Stack.Screen
        name="FullScreenMediaView"
        options={{
          title: 'Explore',
        }}
      />
    </Stack>
  );
}
