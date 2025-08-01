import { useLiderazgoForm } from '@/core/liderazgo-provider'
import CustomCheckbox from '@/presentation/components/form/CustomCheckBox'
import CustomInput from '@/presentation/components/form/CustomInput'
import CustomSelect from '@/presentation/components/form/CustomSelect'
import { empleados } from '@/presentation/helpers/data'
import { useLiderazgoStepper } from '@/presentation/hooks/useLiderazgoStepper'
import { useStepperContext } from '@/presentation/hooks/useStepperContext'
import { useNavigation, useRouter } from 'expo-router'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

const LiderazgoCuatro = () => {
  const router = useRouter()
  const { setOnNext, setOnBack, setNextLabel } = useStepperContext()
  const { goTo } = useLiderazgoStepper()
  const { requiereCuasiaccidente } = useLiderazgoForm()
  const navigation = useNavigation()

  const { control, watch, setValue } = useForm({
    defaultValues: {
      reconocimiento: false,
      por_que: '',
      aquien_id_reconocimiento: '',
      rendicion: false,
      aquien_id_rendicion: '',
      por_que_rendicion: '',
    }
  })

  const reconocimiento_checked = watch('reconocimiento')
  const rendicion_checked = watch('rendicion')

  // Mutuamente excluyentes
  useEffect(() => {
    if (reconocimiento_checked) {
      setValue('rendicion', false)
      setValue('aquien_id_rendicion', '')
      setValue('por_que_rendicion', '')
    }
  }, [reconocimiento_checked])

  useEffect(() => {
    if (rendicion_checked) {
      setValue('reconocimiento', false)
      setValue('aquien_id_reconocimiento', '')
      setValue('por_que', '')
    }
  }, [rendicion_checked])

  // Configurar paso anterior y "Guardar"
  useEffect(() => {
    setOnNext(() => () => {
      // Puedes guardar data aquí si necesitas...
      navigation.reset({
          index: 0,
          routes: [{ name: 'LiderazgoConfirmacion' as never }],
        }) // Pantalla de confirmación
    })

    setNextLabel('Guardar')

    setOnBack(() => () => {
      if (requiereCuasiaccidente) {
        goTo(4) // Volver a PDL3
      } else {
        goTo(2) // Volver a PDL2
      }
    })

    return () => {
      setOnNext(undefined)
      setNextLabel(undefined)
      setOnBack(undefined)
    }
  }, [requiereCuasiaccidente])

  return (
    <ScrollView className='p-4'>
      <Text className='font-bold text-xl mb-4'>¿Cómo cerré el ciclo?</Text>

      <CustomCheckbox control={control} name="reconocimiento" label="Reconocimiento" />
      {reconocimiento_checked && (
        <View className='space-y-3 mt-2'>
          <CustomInput control={control} name='por_que' label='¿Por qué?' />
          <CustomSelect control={control} name='aquien_id_reconocimiento' label='¿A quién?' options={empleados} />
        </View>
      )}

      <CustomCheckbox control={control} name="rendicion" label="Rendición de cuentas" />
      {rendicion_checked && (
        <View className='space-y-3 mt-2'>
          <CustomSelect control={control} name='aquien_id_rendicion' label='¿A quién?' options={empleados} />
          <CustomInput control={control} name='por_que_rendicion' label='Explicar' />
        </View>
      )}
    </ScrollView>
  )
}

export default LiderazgoCuatro
