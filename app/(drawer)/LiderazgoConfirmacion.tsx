import { MaterialIcons } from '@expo/vector-icons'
import { Audio } from 'expo-av'
import * as Haptics from 'expo-haptics'
import { useRouter } from 'expo-router'
import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated'

const SuccessSplash = () => {
  const router = useRouter()

  const scale = useSharedValue(0)
  const iconOpacity = useSharedValue(0)
  const textOpacity = useSharedValue(0)
  const textOffset = useSharedValue(30)

  // Reproducir sonido
  const playSound = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
    const { sound } = await Audio.Sound.createAsync(
      require('@/assets/sounds/success-ding.mp3')
    )
    await sound.playAsync()
  }

  useEffect(() => {
    playSound()

    iconOpacity.value = withTiming(1, { duration: 400 })
    scale.value = withSequence(
      withTiming(1.3, {
        duration: 400,
        easing: Easing.out(Easing.exp),
      }),
      withTiming(1, {
        duration: 300,
        easing: Easing.inOut(Easing.ease),
      })
    )
    textOpacity.value = withTiming(1, { duration: 500 })
    textOffset.value = withTiming(0, { duration: 500 })

    // Redirigir después del splash
    setTimeout(() => {
      runOnJS(router.replace)('/liderazgo')
    }, 3000)
  }, [])

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: iconOpacity.value,
  }))

  const textStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ translateY: textOffset.value }],
  }))

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Animated.View style={iconStyle}>
        <MaterialIcons name="check-circle" size={140} color="#4CAF50" />
      </Animated.View>

      <Animated.View style={textStyle}>
        <Text className="text-2xl font-bold text-[#4CAF50] mt-6 text-center">
          Liderazgo guardado correctamente
        </Text>
      </Animated.View>
    </View>
  )
}

export default SuccessSplash
