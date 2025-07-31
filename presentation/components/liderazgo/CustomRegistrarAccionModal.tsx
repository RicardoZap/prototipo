import { empleados } from '@/presentation/helpers/data'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Pressable, Text, View } from 'react-native'
import Modal from 'react-native-modal'
import CustomDatePicker from '../form/CustomDatePicker'
import CustomInput from '../form/CustomInput'
import CustomSelect from '../form/CustomSelect'

type CustomModalProps = {
  isVisible: boolean
  onClose: () => void
}

const CustomRegistrarAccionesModal = ({ isVisible, onClose }: CustomModalProps) => {
  const { control } = useForm({
    defaultValues: {
      descripcion: '',
      plan_accion: '',
      fecha_limite: '',
      empleado_responsable: '',
    }
  })

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      animationIn="fadeInUp"
      animationOut="fadeOutDown"
      backdropOpacity={0.5}
      useNativeDriver
      hideModalContentWhileAnimating
    >
      <View className="bg-white p-6 rounded-2xl shadow-xl">
        <Text className="text-lg font-bold mb-4 text-center">Nueva Acción</Text>

        <CustomInput control={control} name='descripcion' label='Descripción' placeholder='Descripción'/>
        <CustomInput control={control} name='plan_accion' label='Plan de acción' placeholder='Plan de acción'/>
        <CustomDatePicker control={control} name='fecha_limite' label='Fecha límite de cumplimiento'/>

        <CustomSelect
          control={control}
          name="empleado_responsable"
          label="Empleado responsable"
          options={empleados}
        />

        <Pressable
          className="bg-secondary rounded-lg px-6 py-2 mt-6 active:opacity-80"
          onPress={onClose}
        >
          <Text className="text-white text-center text-base font-semibold">Cerrar</Text>
        </Pressable>
      </View>
    </Modal>
  )
}

export default CustomRegistrarAccionesModal
