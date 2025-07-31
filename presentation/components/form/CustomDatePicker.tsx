import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import React, { useState } from 'react'
import { Control, Controller } from 'react-hook-form'
import { Platform, Pressable, Text, View } from 'react-native'

type CustomDatePickerProps = {
  control: Control<any>
  name: string
  label?: string
  placeholder?: string
}

const CustomDatePicker = ({ control, name, label, placeholder = 'Selecciona una fecha' }: CustomDatePickerProps) => {
  const [showPicker, setShowPicker] = useState(false)

  const togglePicker = () => setShowPicker(!showPicker)

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View style={{ marginBottom: 16 }}>
          {label && <Text style={{ marginBottom: 4, fontWeight: 'bold', color: '#111827' }}>{label}</Text>}

          <Pressable
            onPress={togglePicker}
            style={{
              borderWidth: 1,
              borderColor: error ? '#ef4444' : '#d1d5db',
              borderRadius: 8,
              paddingVertical: 10,
              paddingHorizontal: 8
            }}
          >
            <Text style={{ color: value ? '#111827' : '#9ca3af' }}>
              {value ? new Date(value).toLocaleDateString() : placeholder}
            </Text>
          </Pressable>

          {showPicker && (
            <DateTimePicker
              value={value ? new Date(value) : new Date()}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event: DateTimePickerEvent, selectedDate?: Date) => {
                togglePicker()
                if (selectedDate) onChange(selectedDate.toISOString())
              }}
            />
          )}

          {error && <Text style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>{error.message}</Text>}
        </View>
      )}
    />
  )
}

export default CustomDatePicker
