import { useRouter } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const LiderazgoScreen = () => {
    const router = useRouter()

    const handleAdd = () => {
        router.push('/(drawer)/liderazgo/(new)') // Navega a la pantalla de nuevo liderazgo
    }

    return (
        <View className="flex-1 items-center justify-center bg-white px-4">
            <Text className="text-lg text-gray-700 mb-4">
                Sin liderazgos registrados
            </Text>
            <TouchableOpacity
                className="bg-primary px-6 py-3 rounded-lg"
                onPress={handleAdd}
            >
            <Text className="text-white text-base font-semibold">
                Agregar nuevo
            </Text>
      </TouchableOpacity>
    </View>
    )
}

export default LiderazgoScreen