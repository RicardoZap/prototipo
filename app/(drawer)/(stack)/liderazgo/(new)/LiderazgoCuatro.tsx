import CustomCheckbox from '@/presentation/components/form/CustomCheckBox'
import CustomInput from '@/presentation/components/form/CustomInput'
import CustomSelect from '@/presentation/components/form/CustomSelect'
import { empleados } from '@/presentation/helpers/data'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Text, View } from 'react-native'
import { Pressable, ScrollView } from 'react-native-gesture-handler'

const LiderazgoCuatro = () => {
  const router = useRouter()
  const [isChecked, setIsChecked] = useState(false)
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

  return (
    <ScrollView>
      <Text className='font-bold text-xl'>¿Cómo cerré el ciclo?</Text>
      <CustomCheckbox control={control} name="reconocimiento" label="Reconocimiento" />
      {reconocimiento_checked && (
        <View>
          <CustomInput control={control} name='por_que' label='¿Por qué?'/>
          <CustomSelect control={control} name='aquien_id' label='¿A quién?' options={empleados} />
        </View>  
      )}
      <CustomCheckbox control={control} name="rendicion" label="Rendición de cuentas" />
      {rendicion_checked && (
        <View>
          <CustomSelect control={control} name='aquien_id_rendicion' label='¿A quién?' options={empleados} />
          <CustomInput control={control} name='por_que_rendicion' label='Explicar'/>
        </View>  
      )}
      <Pressable className='bg-primary' onPress={() => router.replace('/LiderazgoConfirmacion')}>
        <Text>Guardar</Text>
      </Pressable>
    </ScrollView>
  )
}

export default LiderazgoCuatro