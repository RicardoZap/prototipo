import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { MultiSelect } from 'react-native-element-dropdown'

const data = [
  { label: 'Atrapamiento por partes móviles', value: '1' },
  { label: 'Caída de objetos', value: '2' },
  { label: 'Contacto con animales ponzoñosos agresivos', value: '3' },
  { label: 'Contacto con energía eléctrica', value: '4' },
]

const CustomMultiSelect = () => {
  const [selected, setSelected] = useState<string[]>([])

  return (
    <View className="p-4">
      <MultiSelect
        data={data}
        labelField="label"
        valueField="value"
        placeholder="Seleccione"
        search
        value={selected} // ✅ value es string[]
        onChange={(items) => setSelected(items as string[])} // ✅ items es string[]
        renderSelectedItem={() => null}
        renderInputSearch={() => null}
        renderLeftIcon={() => (
          <View>
            <Text style={{ flex: 1, color: selected.length ? '#000' : '#aaa' }}>
              {selected.length
                ? data
                    .filter((i) => selected.includes(i.value))
                    .map((i) => i.label)
                    .join(', ')
                : 'Seleccione'}
            </Text>
          </View>
        )}
      />
    </View>
  )
}

export default CustomMultiSelect
