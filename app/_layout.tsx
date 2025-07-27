import { Stack } from 'expo-router'
import React from 'react'
import "./global.css"

const _layout = () => {
  return (
    <Stack
      screenOptions={{
            headerShown: true,
          }}
    />
  )
}

export default _layout