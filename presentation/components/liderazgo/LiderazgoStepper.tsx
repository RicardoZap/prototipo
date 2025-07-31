import { useLiderazgoStepper } from '@/presentation/hooks/useLiderazgoStepper';
import { RelativePathString } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import StepItem from './StepItem'; // Sub-componente

const steps = [
  { key: 'info', label: 'Info.', icon: require('@/assets/images/info.png'), path: '/liderazgo/(new)/InformacionGeneral' },
  { key: 'pdl1', label: 'PDL 1', icon: require('@/assets/images/pdl1.png'), path: '/liderazgo/(new)/LiderazgoUno' },
  { key: 'pdl2', label: 'PDL 2', icon: require('@/assets/images/pdl2.png'), path: '/liderazgo/(new)/LiderazgoDos' },
  { key: 'CA', label: 'CA', icon: require('@/assets/images/ca.png'), path: '/liderazgo/(new)/CuasiaccidenteFlash' },
  { key: 'pdl3', label: 'PDL 3', icon: require('@/assets/images/pdl3.png'), path: '/liderazgo/(new)/LiderazgoTres' },
  { key: 'pdl4', label: 'PDL 4', icon: require('@/assets/images/pdl4.png'), path: '/liderazgo/(new)/LiderazgoCuatro' },
]
export default function LiderazgoStepper({ onStepChange }: { onStepChange?: (step: string) => void }) {
  const { currentIndex, goTo } = useLiderazgoStepper()
  const [activeStep, setActiveStep] = useState(steps[currentIndex]?.key || 'info')

  // Sincronizar activeStep con la ruta actual
  useEffect(() => {
    setActiveStep(steps[currentIndex]?.key || 'info')
  }, [currentIndex])

  const handleStepPress = (stepKey: string, path: RelativePathString) => {
    setActiveStep(stepKey)
    onStepChange?.(stepKey)
    goTo(steps.findIndex(s => s.key === stepKey))
  }

  return (
    <View className="flex-row justify-around rounded-xl py-3 px-2">
      {steps.map((step) => (
        <StepItem
          key={step.key}
          step={step}
          isActive={activeStep === step.key}
          onPress={() => handleStepPress(step.key, step.path as RelativePathString)}
        />
      ))}
    </View>
  )
}