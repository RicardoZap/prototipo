import React from 'react'
import { Control, Controller } from 'react-hook-form'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { MultiSelect } from 'react-native-element-dropdown'

type Option = Record<string, any>

type CustomMultiSelectProps<T extends Option = Option> = {
  control: Control<any>
  name: string
  data: T[] | undefined
  labelField: keyof T & string
  valueField: keyof T & string
  label?: string
  placeholder?: string
  searchPlaceholder?: string
  className?: string
  disabled?: boolean
  isLoading?: boolean
  onChangeExternal?: (values: string[]) => void
  // Extras opcionales
  maxHeight?: number
  dropdownPosition?: 'auto' | 'top' | 'bottom'
}

const CustomMultiSelect = <T extends Option>({
  control,
  name,
  data,
  labelField,
  valueField,
  label,
  placeholder = 'Seleccione',
  searchPlaceholder = 'Buscar...',
  className,
  disabled = false,
  isLoading = false,
  onChangeExternal,
  maxHeight = 300,
  dropdownPosition = 'auto'
}: CustomMultiSelectProps<T>) => {
  const safeData = Array.isArray(data) ? data : []
  const isDisabled = disabled || isLoading || !safeData.length

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={[]}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const selected: string[] = Array.isArray(value) ? value : []

        return (
          <View className={`mb-3 ${className ?? ''}`}>
            {label ? (
              <Text className="mb-1 text-gray-700 font-semibold">{label}</Text>
            ) : null}

            <View
              className={`rounded-xl border px-2 ${error ? 'border-red-500' : 'border-gray-300'} ${isDisabled ? 'opacity-60' : 'opacity-100'}`}
            >
              {isLoading ? (
                <View className="flex-row items-center justify-between py-3 px-2">
                  <Text className="text-gray-500">Cargando...</Text>
                  <ActivityIndicator />
                </View>
              ) : (
                <MultiSelect
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  search
                  data={safeData}
                  labelField={labelField}
                  valueField={valueField}
                  placeholder={placeholder}
                  searchPlaceholder={searchPlaceholder}
                  value={selected}
                  onChange={(items) => {
                    const next = items as string[]
                    onChange(next)
                    onChangeExternal?.(next)
                  }}
                  disable={isDisabled}
                  // chips y selección tradicionales:
                  selectedStyle={styles.selectedStyle}
                  maxHeight={maxHeight}
                  dropdownPosition={dropdownPosition}
                />
              )}
            </View>

            {error ? (
              <Text className="mt-1 text-xs text-red-500">
                {String(error.message || 'Campo inválido')}
              </Text>
            ) : null}

            {!isLoading && !safeData.length ? (
              <Text className="mt-1 text-xs text-gray-500">Sin opciones disponibles.</Text>
            ) : null}
          </View>
        )
      }}
    />
  )
}

export default CustomMultiSelect

const styles = StyleSheet.create({
  dropdown: {
    minHeight: 48,
    paddingVertical: 8
  },
  placeholderStyle: {
    fontSize: 16
  },
  selectedTextStyle: {
    fontSize: 14
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16
  },
  iconStyle: {
    width: 20,
    height: 20
  },
  selectedStyle: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4
  }
})
