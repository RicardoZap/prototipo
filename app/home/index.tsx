import React from 'react'
import { Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const HomeScreen = () => {
  const safeArea = useSafeAreaInsets()

  return (
    <View className='mt-2 pb-10' style= {{ paddingTop: safeArea.top }}>
      <Text className='text-3xl'>HomeScreen</Text>
    </View>
  )
}

export default HomeScreen