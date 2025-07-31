import { useRouter } from 'expo-router'
import React from 'react'
import { Pressable, Text } from 'react-native'
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated'

const RiskAlert = () => {
    const router = useRouter()

    const goToCuasiAccidente = () => {
        router.push('./CuasiaccidenteFlash')
    }

    return (
        <Animated.View
            entering={FadeInUp.duration(300)}
            exiting={FadeOutDown.duration(300)}
            className="bg-red-100 p-4 rounded-lg items-center mt-4"
        >
            <Text className="text-xs text-red-800 font-semibold">INSATISFACTORIA</Text>
            <Text className="text-lg text-red-800 font-extrabold">Riesgo NO Controlado</Text>

            <Pressable
                className="bg-secondary rounded-full px-6 py-2 mt-4 active:opacity-80"
                onPress={goToCuasiAccidente}
            >
                <Text className="text-white text-base font-semibold">Agregar cuasiaccidente</Text>
            </Pressable>
        </Animated.View>
    )
}

export default RiskAlert
