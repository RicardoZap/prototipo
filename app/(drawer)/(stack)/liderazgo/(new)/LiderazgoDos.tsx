import { useLiderazgoForm } from '@/core/liderazgo-provider'
import CustomFileInput from '@/presentation/components/form/CustomFileInput'
import CustomInput from '@/presentation/components/form/CustomInput'
import CustomMultiSelect from '@/presentation/components/form/CustomMultiSelect'
import CustomSelectDropdown from '@/presentation/components/form/CustomSelect'
import RiskAlert from '@/presentation/components/liderazgo/RiskAlert'
import { actividadRealizada, controlesCriticosOpt, riesgoCriticoAsociado, tipoActividadCampo } from '@/presentation/helpers/data'
import { useLiderazgoStepper } from '@/presentation/hooks/useLiderazgoStepper'
import { useStepperContext } from '@/presentation/hooks/useStepperContext'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

const LiderazgoDos = () => {
  const {setRequiereCuasiaccidente} = useLiderazgoForm()
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
    const { goTo } = useLiderazgoStepper()
    const { setOnNext, setOnBack } = useStepperContext()
    const controles_opt = watch('controles_opt')
    const label_controles = controlesCriticosOpt.find(option => option.value === controles_opt)?.label

    useEffect(() => {
      setOnNext(() => () => {
        if (controles_opt === '1') {
          // "Sí" en controles críticos, ir a CA
          goTo(3) // paso 3 = 'CA'
        } else {
          // "No", saltar a PDL4
          goTo(5) // paso 5 = 'PDL4'
        }
      })
      setOnBack(() => () => {
        goTo(1) // Regresar a PDL1 desde PDL2
      })

      return () => {
        setOnNext(undefined)
        setOnBack(undefined)
      }
    }, [controles_opt])

    useEffect(() => {
      const label = controlesCriticosOpt.find(option => option.value === controles_opt)?.label
      setRequiereCuasiaccidente(label === 'Si')
    }, [controles_opt])

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
            <CustomMultiSelect
              control={control} 
              name="riesgo_id"
              data={riesgoCriticoAsociado}  
              labelField="label"
              valueField="value"
              label="Riesgo crítico asociado"
              searchPlaceholder="Buscar..."
              className="mt-2"
              onChangeExternal={(vals) => console.log(vals)}
              dropdownPosition='top'
            />
            <CustomFileInput control={control} name="file" label="Adjuntar evidencia" />
          </View>
        }
      </ScrollView>
    )
}

export default LiderazgoDos