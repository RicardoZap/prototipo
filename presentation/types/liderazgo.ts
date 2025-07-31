export type Liderazgo = {
  liderazgoInformacion: {
    une_id: string
    liv_per_involucrado: string
    liv_per_inv_empresa: string
    liv_nom_contra: string
    liv_fec_liv: string
    liv_hor: string
    are_id: string
    lug_id: string
    act_id: string
    liv_tip_act: string
    liv_num_per_inv: string
    liv_qui_contacto: string
    liv_tipo_pract: string
    liv_equip_nom_1: string
    liv_equip_nom_2: string
    liv_equip_nom_3: string
  }
  liderazgoUno: {
    liv_por_que: string
    liv_por_que_aux: string
    liv_tem_com: string
    liv_tem_com_aux: string
  }
  liderazgoDos: {
    liv_act_tipo: string
    liv_act_cam: string
    liv_des_ver: string
    liv_det_con: string
    rie_id: string
    archivo: any[]
    cua_id: number | null
    riesgosControles: any[]
    descripcion_acciones: string
  }
  liderazgoTres: {
    liv_gen_mon: string
    liv_plan_tipo: string
    liv_gen_mon_com: string
    liv_pla_acc: string
    liv_res_emp_id: string
    liv_fec_cum: string
    acciones: any[]
  }
  liderazgoCuatro: {
    liv_cic_rec: boolean
    liv_cic_por: string
    liv_rec_qui: string
    liv_cue: boolean
    liv_cue_qui: string
    liv_cue_exp: string
  }
}
