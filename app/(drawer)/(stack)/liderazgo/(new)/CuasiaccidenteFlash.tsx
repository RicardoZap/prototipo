import CustomInput from '@/presentation/components/form/CustomInput'
import CustomSelect from '@/presentation/components/form/CustomSelect'
import CustomModal from '@/presentation/components/liderazgo/CustomRiesgosControlesModal'
import { danio, dimension, nivelImpactoPotencial, nivelImpactoReal } from '@/presentation/helpers/data'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Pressable, Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

const CuasiaccidenteFlash = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { control, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      dimension_id: '',
      descripcion: '',
      antecedentes: '',
      nivel_real: '3',
      nivel_potencial: '',
      danio: '1',
      acciones_inmediatas: '',
      nombre_informante: 'Hector Luna',
      puesto: 'Supervisor de Seguridad',
    }
  })

  return (
    <ScrollView className="flex-1 p-4">
      <Text className='font-bold text-xl'>Información General</Text>
      <CustomSelect control={control} name='dimension_id' label='Dimensión' options={dimension}/>

      <Text className='font-bold text-xl'>Incidente</Text>
      <CustomInput 
        control={control} 
        name='descripcion' 
        label='Descripción (¿Qué se estaba haciendo? - Describe cómo sucedió el cuasiaccidente)' 
        multiline
        numberOfLines={4} 
        maxLength={350}
      />
      <CustomInput 
        control={control} 
        name='antecedentes' 
        label='Antecedentes/causas preliminares' 
        multiline
        numberOfLines={4} 
        maxLength={350}
      />

      <Text className='font-bold text-xl'>Criterios del incidente</Text>
      <CustomSelect control={control} name='nivel_real' label='Nivel de impacto real' options={nivelImpactoReal}/> 
      <CustomSelect control={control} name='nivel_potencial' label='Nivel de impacto potencial' options={nivelImpactoPotencial}/>
      <CustomSelect control={control} name='danio' label='Daño' options={danio}/>
      <CustomInput 
        control={control} 
        name='acciones_inmediatas' 
        label='Acciones de control inmediatas (contención del incidente)' 
        multiline
        numberOfLines={4} 
        maxLength={350}
      />

      <Text className='font-bold text-xl'>Riesgos y controles críticos</Text>
      <Pressable
        className="bg-secondary rounded-full px-6 py-2 mb-4 mt-4 active:opacity-80 w-[70%] self-center"
        onPress={() => setIsModalOpen(true)}
      >
        <Text className="text-white text-center text-base font-semibold">Agregar riesgo / control crítico</Text>
        <CustomModal isVisible={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </Pressable>

      <Text className='font-bold text-xl'>Datos del informante</Text>
      <CustomInput control={control} name='nombre_informante' label='Nombre de la persona que registra el incidente' disabled />
      <CustomInput control={control} name='puesto' label='Puesto' disabled />

    </ScrollView>
  )
}

export default CuasiaccidenteFlash