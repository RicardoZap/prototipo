import { LiderazgoFormProvider } from '@/core/liderazgo-provider'
import LiderazgoStepper from '@/presentation/components/liderazgo/LiderazgoStepper'
import { useLiderazgoStepper } from '@/presentation/hooks/useLiderazgoStepper'
import { StepperProvider, useStepperContext } from '@/presentation/hooks/useStepperContext'
import { Slot } from 'expo-router'
import { useEffect } from 'react'
import { BackHandler, KeyboardAvoidingView, Platform, Pressable, Text, View } from 'react-native'

const LayoutContent = () => {
  const { goNext, goBack } = useLiderazgoStepper()
  const { onNext, onBack, nextLabel, backLabel } = useStepperContext()

  const handleNext = () => {
    if (onNext) onNext()
    else goNext()
  }

  const handleBack = () => {
    if (onBack) onBack()
    else goBack()
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      // Previene la acción por defecto
      return true
    })

    return () => backHandler.remove()
  }, [])

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
            <Text className="text-white text-center font-bold">{backLabel ?? 'Atrás'}</Text>
          </Pressable>
          <Pressable
            className="flex-1 bg-secondary px-4 py-3 rounded-lg active:opacity-80"
            onPress={handleNext}
          >
            <Text className="text-white text-center font-bold">
              {nextLabel || 'Siguiente'}
            </Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

export default function LiderazgoLayout() {
  return (
    <LiderazgoFormProvider>
      <StepperProvider>
        <LayoutContent />
      </StepperProvider>
    </LiderazgoFormProvider>
  )
}
