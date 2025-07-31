import { useCurrentLocation } from '@/core/current-location'
import CustomDatePicker from '@/presentation/components/form/CustomDatePicker'
import CustomInput from '@/presentation/components/form/CustomInput'
import CustomSelect from '@/presentation/components/form/CustomSelect'
import CustomTimePicker from '@/presentation/components/form/CustomTimePicker'
import { actividades, areas, centroTrabajo, conQuien, empleados, lugares, pertenezcoA, tareas, tipoPractica } from '@/presentation/helpers/data'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

const InformacionGeneral = () => {
  const { location } = useCurrentLocation()

  const { control, handleSubmit, watch, setValue } = useForm({
    defaultValues: { 
      une_id: '', 
      tipo_emp: '',
      contratista: '',
      nom_cont: '',
      fecha: '',
      hora: '',
      latitud: '',
      longitud: '',
      area_id: '',
      lugar_id: '',
      tarea_id: '',
      act_id: '',
      num_person: 0,
      con_id: '',
      tipo_prac: '',
      emp_1: '',
      emp_2: '',
      emp_3: ''
    }
  })

  // Watch para manejar condiciones en campos
  const tipo_emp = watch('tipo_emp')
  const tipo_prac = watch('tipo_prac')

  useEffect(() => {
    if (location) {
      //console.log('Ubicación:', location.latitude, location.longitude)
      setValue('latitud', location.latitude.toString())
      setValue('longitud', location.longitude.toString())
    }
  }, [location])

  return (
    <ScrollView className="flex-1 p-4">
      <CustomSelect control={control} name="une_id" label="Centro de Trabajo" options={centroTrabajo} />
      <CustomSelect control={control} name="tipo_emp" label="Pertenezco a:" options={pertenezcoA} />

      {tipo_emp === 'NT' && (
        <View>
          <CustomInput control={control} name="contratista" label="Nombre de tu empresa contratista" placeholder="Nombre de la empresa contratista" keyboardType='default' />
          <CustomSelect control={control} name="nom_cont" label="Nombre de la persona contratista que registra el LV" options={empleados} />
        </View>
      )}

      <CustomDatePicker control={control} name="fecha" label="Fecha" placeholder="Selecciona una fecha" />
      <CustomTimePicker control={control} name="hora" label="Hora" placeholder="Selecciona la hora" />

      <Text className="font-bold mb-2 text-xl">Geolocalización</Text>
      <View className='flex-row gap-5 mb-3'>
        <CustomInput control={control} name="latitud" label="Latitud" placeholder={location?.latitude?.toString() || 'Cargando...'} className='flex-1' disabled/>
        <CustomInput control={control} name="longitud" label="Longitud" placeholder={location?.longitude?.toString() || 'Cargando...'} className='flex-1' disabled/>
      </View>

      <Text className="font-bold mb-2 text-xl">¿Dónde llevé a cabo mi liderazgo visible?</Text>
      <CustomSelect control={control} name="area_id" label='Área / Proceso' options={areas}/>
      <CustomSelect control={control} name="lugar_id" label='Lugar' options={lugares}/>
      <CustomSelect control={control} name="tarea_id" label='Tarea / Actividad' options={tareas}/>
      <CustomSelect control={control} name="act_id" label='Tipo de actividad' options={actividades}/>
      <CustomInput control={control} name="num_person" label="Número de personas impactadas" placeholder="Ejemplo: 1, 2" keyboardType='numeric' />
      <CustomSelect control={control} name="con_id" label='¿Con quién tuve el contacto?' options={conQuien} dropdownPosition='top'/>
      <CustomSelect control={control} name="tipo_prac" label='Seleccione el tipo de práctica' options={tipoPractica} dropdownPosition='top' />

      {tipo_prac === '2' && (
        <View>
          <CustomSelect control={control} name="emp_1" label='Nombre integrante 1 del equipo' options={empleados}/>
          <CustomSelect control={control} name="emp_2" label='Nombre integrante 2 del equipo' options={empleados} dropdownPosition='top'/>
          <CustomSelect control={control} name="emp_3" label='Nombre integrante 3 del equipo' options={empleados} dropdownPosition='top'/>
        </View>
      )}
    </ScrollView>
  )
}

export default InformacionGeneral
