import * as DocumentPicker from 'expo-document-picker'
import React from 'react'
import { Control, Controller } from 'react-hook-form'
import { Pressable, Text, View } from 'react-native'

type CustomFileInputProps = {
  control: Control<any>
  name: string
  label?: string
}

const CustomFileInput = ({ control, name, label }: CustomFileInputProps) => {
  const pickDocument = async (onChange: (file: any) => void) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*', // puedes limitar a "application/pdf" o "image/*"
        copyToCacheDirectory: true,
      })

      if (!result.canceled) {
        const file = result.assets[0] // El archivo seleccionado
        onChange(file)
        }
    } catch (error) {
      console.log('Error al seleccionar archivo:', error)
    }
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View className="mb-4">
          {label && <Text className="mb-1 text-gray-700 font-semibold">{label}</Text>}

          <Pressable
            className={`border p-3 rounded-lg bg-gray-100 active:opacity-70 ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
            onPress={() => pickDocument(onChange)}
          >
            <Text className="text-gray-700">
              {value?.name ? value.name : 'Seleccionar archivo'}
            </Text>
          </Pressable>

          {error && <Text className="text-red-500 text-xs mt-1">{error.message}</Text>}
        </View>
      )}
    />
  )
}

export default CustomFileInput
