import React from 'react'
import { useForm } from 'react-hook-form'
import { Pressable, Text, View } from 'react-native'
import Modal from 'react-native-modal'
import CustomSelect from '../form/CustomSelect'

type CustomModalProps = {
  isVisible: boolean
  onClose: () => void
}

const CustomModal = ({ isVisible, onClose }: CustomModalProps) => {
  const { control } = useForm({
    defaultValues: {
      riesgo: '',
      controles: ''
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
        <Text className="text-lg font-bold mb-4 text-center">Agregar riesgo / control</Text>

        <CustomSelect
          control={control}
          name="riesgo"
          label="Riesgo crítico"
          options={[{ label: 'Riesgo 1', value: '1' }, { label: 'Riesgo 2', value: '2' }]}
        />

        <CustomSelect
          control={control}
          name="controles"
          label="Control crítico"
          options={[{ label: 'Control 1', value: '1' }, { label: 'Control 2', value: '2' }]}
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

export default CustomModal
