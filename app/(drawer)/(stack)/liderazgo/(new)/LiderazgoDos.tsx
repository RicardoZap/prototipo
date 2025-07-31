import CustomFileInput from '@/presentation/components/form/CustomFileInput'
import CustomInput from '@/presentation/components/form/CustomInput'
import CustomSelectDropdown from '@/presentation/components/form/CustomSelect'
import RiskAlert from '@/presentation/components/liderazgo/RiskAlert'
import { actividadRealizada, controlesCriticosOpt, tipoActividadCampo } from '@/presentation/helpers/data'
import React from 'react'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

const LiderazgoDos = () => {
  const { control, handleSubmit, watch, setValue } = useForm({
      defaultValues: { 
        actividad_id: '', 
        act_realizada_id: '',
        desc: '',
        controles_opt: '',
        riesgo_id: '',
        evidencia: '',
      }
    })

    const controles_opt = watch('controles_opt')
    const label_controles = controlesCriticosOpt.find(option => option.value === controles_opt)?.label

    return (
      <ScrollView className="flex-1 p-4">
        <CustomSelectDropdown control={control} name="actividad_id" label="Tipo de actividad en campo" options={tipoActividadCampo} />
        <CustomSelectDropdown control={control} name="act_realizada_id" label="Seleccione la actividad realizada" options={actividadRealizada} />
        <CustomInput 
          control={control} 
          name="desc" 
          label="Descripción de la actividad realizada" 
          placeholder="Escribe una breve descripción" 
          multiline 
          numberOfLines={4} 
          maxLength={350} 
        />
        <CustomSelectDropdown control={control} name="controles_opt" label='¿Se detectaron controles críticos ausentes o fallidos?' options={controlesCriticosOpt} />
        {label_controles === 'Si' ? (
          <RiskAlert />
        ): <View>
            {/*<CustomMultiSelect /> */}
            <CustomFileInput control={control} name="file" label="Adjuntar evidencia" />
          </View>
        }
        

      </ScrollView>
    )
}

export default LiderazgoDos