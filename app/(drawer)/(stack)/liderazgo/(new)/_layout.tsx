import LiderazgoStepper from '@/presentation/components/liderazgo/LiderazgoStepper'
import { useLiderazgoStepper } from '@/presentation/hooks/useLiderazgoStepper'
import { StepperProvider, useStepperContext } from '@/presentation/hooks/useStepperContext'
import { Slot } from 'expo-router'
import { KeyboardAvoidingView, Platform, Pressable, Text, View } from 'react-native'

const LayoutContent = () => {
  const { goNext, goBack } = useLiderazgoStepper()
  const { onNext, onBack } = useStepperContext()

  const handleNext = () => {
    if (onNext) onNext()
    else goNext()
  }

  const handleBack = () => {
    if (onBack) onBack()
    else goBack()
  }

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View className="flex-1">
        {/* Stepper fijo */}
        <LiderazgoStepper />

        {/* Contenido dinámico de cada pantalla */}
        <View className="flex-1 p-4">
          <Slot />
        </View>

        {/* Botones globales fijos */}
        <View className="flex-row gap-3 p-5">
          <Pressable
            className="flex-1 bg-secondary px-4 py-3 rounded-lg active:opacity-80"
            onPress={handleBack}
          >
            <Text className="text-white text-center font-bold">Atrás</Text>
          </Pressable>
          <Pressable
            className="flex-1 bg-secondary px-4 py-3 rounded-lg active:opacity-80"
            onPress={handleNext}
          >
            <Text className="text-white text-center font-bold">Siguiente</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

export default function LiderazgoLayout() {
  return (
    <StepperProvider>
      <LayoutContent />
    </StepperProvider>
  )
}
