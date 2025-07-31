import CustomInput from '@/presentation/components/form/CustomInput'
import CustomSelect from '@/presentation/components/form/CustomSelect'
import { comunicados, razones } from '@/presentation/helpers/data'
import React from 'react'
import { useForm } from 'react-hook-form'
import { ScrollView } from 'react-native'

const LiderazgoUno = () => {
  const { control, handleSubmit, watch, setValue } = useForm({
      defaultValues: { 
        porque_id: '', 
        otro_por: '',
        tema_id: '',
        otro_tema: '',
      }
    })

    const porque_id = watch('porque_id')
    const label_porque = razones.find(option => option.value === porque_id)?.label

    const tema_id = watch('tema_id')
    const label_tema = comunicados.find(option => option.value === tema_id)?.label

  return (
    <ScrollView className="flex-1 p-4">
      <CustomSelect control={control} name="porque_id" label="¿Por qué llevé a cabo mi liderazgo visible en este lugar?" options={razones} />
      {label_porque === 'Otro' && (
        <CustomInput control={control} name='otro_por' label='Explica:' placeholder='Escribe otra razón' keyboardType='default'/>
      )}
      <CustomSelect control={control} name="tema_id" label="¿Qué tema comuniqué?" options={comunicados} />
      {label_tema === 'Otro' && (
        <CustomInput control={control} name='otro_tema' label='Escribe otro tema:' placeholder='Escribe otro tema:' keyboardType='default'/>
      )}
    </ScrollView>
  )
}

export default LiderazgoUno