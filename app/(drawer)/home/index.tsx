import React from 'react'
import { Dimensions, Image, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const HomeScreen = () => {
  const safeArea = useSafeAreaInsets()
  const { width } = Dimensions.get('window') // ancho de pantalla

  const imageSize = width * .5

  return (
    <View 
      className='flex-1 items-center justify-center bg-white' 
      style={{ paddingTop: safeArea.top }}
    >
      <Image
        source={require('../../../assets/images/penoles.png')}
        style={{ width: imageSize, height: imageSize }}
        resizeMode='contain'
      />
      <Text className='flex-1 text-2xl font-bold text-center'>Liderazgo para la Gestión de Seguridad, Salud Ocupacional y Medio Ambiente</Text>
    </View>
  )
}

export default HomeScreen
