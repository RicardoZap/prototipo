import { useLiderazgoForm } from '@/core/liderazgo-provider';
import { useLiderazgoStepper } from '@/presentation/hooks/useLiderazgoStepper';
import { RelativePathString, usePathname } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import StepItem from './StepItem'; // Sub-componente


export default function LiderazgoStepper({ onStepChange }: { onStepChange?: (step: string) => void }) {
  const { requiereCuasiaccidente } = useLiderazgoForm()
  const { currentIndex, goTo } = useLiderazgoStepper()
  const pathname = usePathname()
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const steps = [
    { key: 'info', label: 'Info.', icon: require('@/assets/images/info.png'), path: '/liderazgo/(new)/InformacionGeneral' },
    { key: 'pdl1', label: 'PDL 1', icon: require('@/assets/images/pdl1.png'), path: '/liderazgo/(new)/LiderazgoUno' },
    { key: 'pdl2', label: 'PDL 2', icon: require('@/assets/images/pdl2.png'), path: '/liderazgo/(new)/LiderazgoDos' },
    ...(requiereCuasiaccidente ? [
        { key: 'CA', label: 'CA', icon: require('@/assets/images/ca.png'), path: '/liderazgo/(new)/CuasiaccidenteFlash' },
        { key: 'pdl3', label: 'PDL 3', icon: require('@/assets/images/pdl3.png'), path: '/liderazgo/(new)/LiderazgoTres' },
    ] : []),
    { key: 'pdl4', label: 'PDL 4', icon: require('@/assets/images/pdl4.png'), path: '/liderazgo/(new)/LiderazgoCuatro' },
  ]

  const [activeStep, setActiveStep] = useState(steps[currentIndex]?.key || 'info')

  // Sincronizar activeStep con la ruta actual
  
  useEffect(() => {
    const match = steps.find(step => pathname.includes(step.path.split('/').pop() || ''))
    setActiveStep(match?.key || 'info')
  }, [pathname, steps])

  const handleStepPress = (stepKey: string, path: RelativePathString) => {
    const targetIndex = steps.findIndex(s => s.key === stepKey)
    onStepChange?.(stepKey)
    goTo(targetIndex)
  }


  return (
    <View className="flex-row justify-around rounded-xl py-3 px-2">
      {steps.map((step, index) => (
        <StepItem
          key={step.key}
          step={step}
          isActive={step.key === activeStep}
          onPress={() => handleStepPress(step.key, step.path as RelativePathString)}
        />
      ))}
    </View>
  )
}