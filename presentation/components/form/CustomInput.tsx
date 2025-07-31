import React from 'react'
import { Control, Controller } from 'react-hook-form'
import { Text, TextInput, View } from 'react-native'

type CustomInputProps = {
  control: Control<any>
  name: string
  placeholder?: string
  secureTextEntry?: boolean
  keyboardType?: 'default' | 'email-address' | 'numeric'
  label?: string
  className?: string
  disabled?: boolean
  multiline?: boolean
  numberOfLines?: number
  maxLength?: number
}

const CustomInput = ({
  control,
  name,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  label,
  className,
  disabled = false,
  multiline = false,
  numberOfLines = 1,
  maxLength
}: CustomInputProps) => {
  // Función para filtrar números válidos
  const handleNumericInput = (text: string, onChange: (value: string) => void) => {
    const filtered = text.replace(/[^0-9]/g, '')
    const positiveNumber = filtered.replace(/^-/, '')

    onChange(positiveNumber)
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <View className={`mb-2 ${className}`}>
          {label && <Text className="mb-1 text-gray-700 font-semibold">{label}</Text>}

          <TextInput
            className={`border p-2 rounded-lg ${error ? 'border-red-500' : 'border-gray-300'}`}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            onBlur={onBlur}
            onChangeText={(text) =>
              keyboardType === 'numeric'
                ? handleNumericInput(text, onChange)
                : onChange(text)
            }
            value={value}
            editable={!disabled}
            style={{ height: multiline ? numberOfLines * 24 : 40, fontSize: 16 }}
            multiline={multiline}
            numberOfLines={numberOfLines}
            maxLength={maxLength}
            textAlignVertical="top"
          />

          {/* Mostrar contador de caracteres si maxLength está definido */}
          {maxLength && (
            <Text className="text-right text-xs text-gray-500 mt-1">
              {value.length}/{maxLength}
            </Text>
          )}

          {error && <Text className="text-red-500 text-xs mt-1">{error.message}</Text>}
        </View>
      )}
    />
  )
}

export default CustomInput
