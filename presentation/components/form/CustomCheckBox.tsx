import React from 'react'
import { Controller } from 'react-hook-form'
import { Pressable, Text, View } from 'react-native'

type CustomCheckboxProps = {
  control: any
  name: string
  label: string
}

const CustomCheckbox = ({ control, name, label }: CustomCheckboxProps) => {
  return (
    <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => (
            <Pressable
            onPress={() => onChange(!value)}
            className="flex-row items-center gap-2 mb-2"
            >
            <View
                className={`w-7 h-8 border-2 rounded mb-4 mt-4 ${
                value ? 'bg-primary border-primary' : 'border-gray-400'
                } items-center justify-center`}
            >
                {value && (
                <Text className="text-white text-xl font-bold">✓</Text>
                )}
            </View>
            <Text className="text-base text-black">{label}</Text>
            </Pressable>
        )}
    />
  )
}

export default CustomCheckbox
