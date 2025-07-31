import React from 'react'
import { Dimensions, Image, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const HomeScreen = () => {
  const safeArea = useSafeAreaInsets()
  const { width } = Dimensions.get('window')

  return (
    <View
      className="flex-1 items-center bg-white px-4"
      style={{ paddingTop: safeArea.top }}
    >
      <Image
        source={require('@/assets/images/penoles.png')}
        style={{
          height: width * 0.6,
          resizeMode: 'contain',
        }}
      />
      <Text className="text-2xl mt-5 font-bold text-center text-gray-800">LÍderazgo para la Gestión de Seguridad, Salud Ocupacional y Medio Ambiente</Text>
    </View>
  )
}

export default HomeScreen
