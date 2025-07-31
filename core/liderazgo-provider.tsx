import { Liderazgo } from '@/presentation/types/liderazgo';
import React, { createContext, ReactNode, useContext, useRef, useState } from 'react';

export type EmpleadoSimple = { id: number; nombre: string }
export type ContratistaSimple = { id: number; razonSocial: string }
export type RiesgoCriticoSimple = { id: number; nombre: string }

type LiderazgoFormContextType = {
  formData: Liderazgo
  setFormData: (data: Partial<Liderazgo>) => void
  submitFinal: boolean
  setSubmitFinal: (value: boolean) => void
  isNavigatingStepRef: React.MutableRefObject<boolean>
  setIsNavigatingStep: (value: boolean) => void
  empleadoProvider: EmpleadoSimple[]
  setEmpleadoProvider: (value: EmpleadoSimple[]) => void
  empleadoContratistaProvider: EmpleadoSimple[]
  setEmpleadoContratistaProvider: (value: EmpleadoSimple[]) => void
  contratistaIdProvider: number
  setContratistaIdProvider: (value: number) => void
  contratistasProvider: ContratistaSimple[]
  setContratistasProvider: (value: ContratistaSimple[]) => void
  unidadTrabajo: string
  setUnidadTrabajo: (value: string) => void
  riesgosCriticos: RiesgoCriticoSimple[]
  setRiesgosCriticos: (value: RiesgoCriticoSimple[]) => void
}

const LiderazgoFormContext = createContext<LiderazgoFormContextType | undefined>(undefined)

export const LiderazgoFormProvider = ({ children, defaultValues }: { children: ReactNode; defaultValues?: Liderazgo }) => {
  const [submitFinal, setSubmitFinal] = useState(false)
  const isNavigatingStepRef = useRef(false)

  const setIsNavigatingStep = (value: boolean) => {
    isNavigatingStepRef.current = value
  }

  const [empleadoProvider, setEmpleadoProvider] = useState<EmpleadoSimple[]>([])
  const [empleadoContratistaProvider, setEmpleadoContratistaProvider] = useState<EmpleadoSimple[]>([])
  const [contratistaIdProvider, setContratistaIdProvider] = useState(0)
  const [contratistasProvider, setContratistasProvider] = useState<ContratistaSimple[]>([])
  const [unidadTrabajo, setUnidadTrabajo] = useState('')
  const [riesgosCriticos, setRiesgosCriticos] = useState<RiesgoCriticoSimple[]>([])

  /*const API = axios.create({
    baseURL: 'https://tu-api.com/', // 
    headers: {
      'Content-Type': 'application/json',
    },
  })

  // Fetch inicial de empleados y contratistas
  useEffect(() => {
    const fetchData = async () => {
      try {
        const empleadosRes = await API.get<EmpleadoSimple[]>('api/ssoma/v1/empleado/consultar/activosPorTipo')
        setEmpleadoProvider(empleadosRes.data)

        const contratistasRes = await API.get<ContratistaSimple[]>('api/ssoma/v1/empresasContratistas/consultar/tipos')
        setContratistasProvider(contratistasRes.data)
      } catch (error) {
        console.error('Error en fetch inicial', error)
      }
    }
    fetchData()
  }, [])

  // Fetch de empleados por contratista
  useEffect(() => {
    const fetchByContratista = async () => {
      if (!contratistaIdProvider) return
      try {
        const res = await API.get<EmpleadoSimple[]>(
          `api/ssoma/v1/empleado/consultar/por-con_id`,
          { params: { con_id: contratistaIdProvider, tipo: 'NT' } }
        )
        setEmpleadoContratistaProvider(res.data)
      } catch (error) {
        console.error('Error en fetch de empleados por contratista', error)
      }
    }
    fetchByContratista()
  }, [contratistaIdProvider])

  // Fetch de riesgos por unidad de trabajo
  useEffect(() => {
    const fetchRiesgos = async () => {
      if (!unidadTrabajo) return
      try {
        const res = await API.get<RiesgoCriticoSimple[]>(
          `api/ssoma/v1/riesgoControl/consultar/porUnidad`,
          { params: { uneId: unidadTrabajo } }
        )
        setRiesgosCriticos(res.data)
      } catch (error) {
        console.error('Error en fetch de riesgos', error)
      }
    }
    fetchRiesgos()
  }, [unidadTrabajo]) */

  const [formData, setFormData] = useState<Liderazgo>(
    defaultValues ?? {
      liderazgoInformacion: {
        une_id: '',
        liv_per_involucrado: '',
        liv_per_inv_empresa: '',
        liv_nom_contra: '',
        liv_fec_liv: '',
        liv_hor: '',
        are_id: '',
        lug_id: '',
        act_id: '',
        liv_tip_act: '',
        liv_num_per_inv: '',
        liv_qui_contacto: '',
        liv_tipo_pract: '',
        liv_equip_nom_1: '',
        liv_equip_nom_2: '',
        liv_equip_nom_3: '',
      },
      liderazgoUno: {
        liv_por_que: '',
        liv_por_que_aux: '',
        liv_tem_com: '',
        liv_tem_com_aux: '',
      },
      liderazgoDos: {
        liv_act_tipo: '',
        liv_act_cam: '',
        liv_des_ver: '',
        liv_det_con: '',
        rie_id: '',
        archivo: [],
        cua_id: null,
        riesgosControles: [],
        descripcion_acciones: '',
      },
      liderazgoTres: {
        liv_gen_mon: '',
        liv_plan_tipo: '',
        liv_gen_mon_com: '',
        liv_pla_acc: '',
        liv_res_emp_id: '',
        liv_fec_cum: '',
        acciones: [],
      },
      liderazgoCuatro: {
        liv_cic_rec: false,
        liv_cic_por: '',
        liv_rec_qui: '',
        liv_cue: false,
        liv_cue_qui: '',
        liv_cue_exp: '',
      },
    }
  )

  const updateFormData = (data: Partial<Liderazgo>) => {
    setFormData((prev) => ({
      ...prev,
      ...data,
    }))
  }

  return (
    <LiderazgoFormContext.Provider
      value={{
        formData,
        setFormData: updateFormData,
        submitFinal,
        setSubmitFinal,
        isNavigatingStepRef,
        setIsNavigatingStep,
        empleadoProvider,
        setEmpleadoProvider,
        contratistaIdProvider,
        setContratistaIdProvider,
        empleadoContratistaProvider,
        setEmpleadoContratistaProvider,
        contratistasProvider,
        setContratistasProvider,
        unidadTrabajo,
        setUnidadTrabajo,
        riesgosCriticos,
        setRiesgosCriticos,
      }}
    >
      {children}
    </LiderazgoFormContext.Provider>
  )
}

export const useLiderazgoForm = () => {
  const context = useContext(LiderazgoFormContext)
  if (!context) {
    throw new Error('useLiderazgoForm must be used within a LiderazgoFormProvider')
  }
  return context
}