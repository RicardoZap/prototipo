import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useEffect } from 'react'
import { Text, View } from 'react-native'

const LiderazgoConfirmacion = () => {
  const router = useRouter()

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace('/liderazgo')
    }, 2000)

    return () => clearTimeout(timeout)
  }, [])

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <View className="items-center justify-center bg-green-500 rounded-full p-6 mb-6">
        <Ionicons name="checkmark-circle" size={80} color="white" />
      </View>
      <Text className="text-xl font-bold text-center text-gray-800">
        Liderazgo guardado correctamente
      </Text>
    </View>
  )
}

export default LiderazgoConfirmacion
