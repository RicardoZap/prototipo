import React, { useEffect } from 'react'
import { Image, Text, TouchableOpacity } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'

type StepItemProps = {
  step: { key: string; label: string; icon: any }
  isActive: boolean
  onPress: () => void
}

const StepItem: React.FC<StepItemProps> = ({ step, isActive, onPress }) => {
  const scale = useSharedValue(1)

  useEffect(() => {
  // Usa cancelAnimation + runOnJS para mayor control (opcionalmente)
    scale.value = withSpring(isActive ? 1.2 : 1, {
      damping: 10,
      stiffness: 100,
    })
  }, [isActive])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  return (
    <TouchableOpacity className="items-center flex-1" onPress={onPress}>
      <Animated.View style={[animatedStyle]} className="items-center justify-center w-full">
        <Image source={step.icon} className="w-10 h-10" />
      </Animated.View>
      <Text className={isActive ? 'text-black font-bold mt-1' : 'text-gray-500 mt-1'}>
        {step.label}
      </Text>
    </TouchableOpacity>
  )
}

export default StepItem
