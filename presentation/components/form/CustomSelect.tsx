import React, { useState } from 'react'
import { Control, Controller } from 'react-hook-form'
import { StyleSheet, Text, View } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'

type Option = {
  label: string
  value: string | number
}

type CustomSelectProps = {
  control: Control<any>
  name: string
  label?: string
  placeholder?: string
  options: Option[],
  dropdownPosition?: 'auto' | 'top' | 'bottom'
}

const CustomSelect = ({
  control,
  name,
  label,
  placeholder = 'Seleccione',
  options,
  dropdownPosition = 'auto',
}: CustomSelectProps) => {
  const [isFocus, setIsFocus] = useState(false)

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View style={{ marginBottom: 16 }}>
          {label && <Text style={styles.label}>{label}</Text>}

          <Dropdown
            style={[
              styles.dropdown,
              error
                ? { borderColor: 'red' }
                : isFocus
                ? { borderColor: '#2563eb' } // Azul (Tailwind blue-600)
                : { borderColor: '#d1d5db' } // Gris
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={options}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? placeholder : '...'}
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              onChange(item.value)
              setIsFocus(false)
            }}
            dropdownPosition={dropdownPosition}
            search
          />

          {error && <Text style={styles.errorText}>{error.message}</Text>}
        </View>
      )}
    />
  )
}

// no se aplica el estilo de Tailwind, se usa StyleSheet para mantener la consistencia ya que no admite Tailwind CSS directamente
const styles = StyleSheet.create({
  dropdown: {
    height: 42,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8
  },
  placeholderStyle: {
    fontSize: 14,
    color: '#9ca3af' // Gris
  },
  selectedTextStyle: {
    fontSize: 14,
    color: '#111827' // Gris oscuro
  },
  label: {
    marginBottom: 4,
    color: '#111827',
    fontWeight: 'bold'
  },
  errorText: {
    color: '#ef4444',
    fontSize: 12,
    marginTop: 4
  }
})

export default CustomSelect
