import CustomInput from '@/presentation/components/form/CustomInput'
import CustomSelect from '@/presentation/components/form/CustomSelect'
import CustomRegistrarAccionesModal from '@/presentation/components/liderazgo/CustomRegistrarAccionModal'
import { genere_monitore } from '@/presentation/helpers/data'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Pressable, Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

const LiderazgoTres = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { control, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      genere_monitore: '',
      tipo_plan: '',
      otro_tipo: '',
    }
  })

  return (
    <ScrollView className="flex-1 p-4">
      <CustomSelect control={control} name='genere_monitore' label='¿Generé o monitoreé un plan de acción?' options={genere_monitore}/>
      <CustomSelect control={control} name='tipo_plan' label='Tipo de plan generado o monitoreado' options={genere_monitore}/>
      <CustomInput 
        control={control} 
        name='otro_tipo' 
        label='Escribe el otro tipo:' 
        multiline
        numberOfLines={4} 
        maxLength={350}
      />
      <Text className='font-bold text-xl mt-4'>Acciones registradas</Text>
      <Pressable
        className="bg-secondary rounded-full px-6 py-2 mb-4 mt-4 active:opacity-80 w-[70%] self-center"
        onPress={() => setIsModalOpen(true)}
      >
        <Text className="text-white text-center text-base font-semibold">Registrar acción</Text>
        <CustomRegistrarAccionesModal isVisible={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </Pressable>

    </ScrollView>
  )
}

export default LiderazgoTres