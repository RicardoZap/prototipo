import { HTTPMethod } from "http-method-enum"
import { z } from "zod"

export const LiderazgoInformacionGeneralSchemaBase = z.object({
  eventOperationType: HTTPMethod,
  une_id: z.string().optional(), // centroTrabajo
  liv_per_involucrado: z.string().optional(), // personalInvolucrado
  liv_per_inv_empresa: z.string().optional(), // empresa contratista
  liv_nom_contra: z.string().optional(),
  liv_fec_liv: z.preprocess(
    (val) => {
      try {
        const date = new Date(val as string)

        if (!isNaN(date.getTime())) {
          const formatter = new Intl.DateTimeFormat('sv-SE', {
            timeZone: 'America/Mexico_City',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
          })

          const parts = formatter.formatToParts(date).reduce((acc, part) => {
            if (part.type !== 'literal') acc[part.type] = part.value
            return acc
          }, {} as Record<string, string>)

          const { year, month, day, hour, minute, second } = parts

          return `${year}-${month}-${day}T${hour}:${minute}:${second}.000-06:00`
        }

        return val
      } catch {
        return val
      }
    },
    z.string().nullable().optional()
  ),
  liv_hor: z.string().optional(), // horaRealizado
  etiqueta: z.string().optional(), // etiqueta , se queda igual
  are_id: z.string().optional(), // area
  lug_id: z.string().optional(), // lugar
  act_id: z.string().optional(), // actividadRealizada
  liv_tip_act: z.string().optional(), //Tipo de actividad
  liv_num_per_inv: z.string().optional(), //numPersonas
  liv_qui_contacto: z.string().optional(), //¿Con quien tuve el contacto?
  liv_tipo_pract: z.string().optional(), // tipo de practica
  liv_equip_nom_1: z.string().optional(),
  liv_equip_nom_2: z.string().optional(),
  liv_equip_nom_3: z.string().optional(),

})

export const LiderazgoInformacionGeneralSchema = LiderazgoInformacionGeneralSchemaBase.superRefine((data, ctx) => {
  if (data.liv_per_involucrado === "NT" && (!data.liv_per_inv_empresa || data.liv_per_inv_empresa.trim() === "")) {
    ctx.addIssue({
      path: ["liv_per_inv_empresa"],
      code: z.ZodIssueCode.custom,
      message: "Campo obligatorio"
    });
  }

  if (data.liv_per_involucrado === "NT" && (!data.liv_nom_contra || data.liv_nom_contra.trim() === "s")) {
    ctx.addIssue({
      path: ["liv_nom_contra"],
      code: z.ZodIssueCode.custom,
      message: "Campo obligatorio"
    })
  }

  if (data.liv_tipo_pract === "EQU" && (!data.liv_equip_nom_1)) {
    ctx.addIssue({
      path: ["liv_equip_nom_1"],
      code: z.ZodIssueCode.custom,
      message: "Campo obligatorio"
    })
  }

  if (data.liv_tipo_pract === "EQU" && (!data.liv_equip_nom_2)) {
    ctx.addIssue({
      path: ["liv_equip_nom_2"],
      code: z.ZodIssueCode.custom,
      message: "Campo obligatorio"
    })
  }

  if (data.liv_tipo_pract === "EQU" && (!data.liv_equip_nom_3)) {
    ctx.addIssue({
      path: ["liv_equip_nom_3"],
      code: z.ZodIssueCode.custom,
      message: "Campo obligatorio"
    })
  }

  const equipoNombres = [data.liv_equip_nom_1, data.liv_equip_nom_2, data.liv_equip_nom_3].filter((val) => val !== undefined && val !== null);

  if (new Set(equipoNombres).size !== equipoNombres.length && (data.liv_tipo_pract === "EQU")) {
    if (data.liv_equip_nom_1 === data.liv_equip_nom_2 || data.liv_equip_nom_1 === data.liv_equip_nom_3) {
      ctx.addIssue({
        path: ["liv_equip_nom_1"],
        code: z.ZodIssueCode.custom,
        message: "El nombre del integrante debe ser diferente a los demás",
      });
    }

    if (data.liv_equip_nom_2 === data.liv_equip_nom_3) {
      ctx.addIssue({
        path: ["liv_equip_nom_2"],
        code: z.ZodIssueCode.custom,
        message: "El nombre del integrante debe ser diferente a los demás",
      });
    }
  }

  if (data.liv_hor && data.liv_fec_liv) {
    const [horaMin, periodo] = data.liv_hor.trim().split(" ")

    if (!horaMin || !periodo) {
      ctx.addIssue({
        path: ["liv_hor"],
        code: z.ZodIssueCode.custom,
        message: "Formato de hora inválido (usa hh:mm AM/PM)",
      })
      return
    }

    let [hora, minuto] = horaMin.split(":").map(Number)

    if (isNaN(hora) || isNaN(minuto)) {
      ctx.addIssue({
        path: ["liv_hor"],
        code: z.ZodIssueCode.custom,
        message: "Formato de hora inválido (usa hh:mm AM/PM)",
      })
      return
    }

    if (periodo.toUpperCase() === "PM" && hora < 12) hora += 12
    if (periodo.toUpperCase() === "AM" && hora === 12) hora = 0

    const now = new Date()
    const [anio, mes, dia] = new Date(data.liv_fec_liv).toISOString().split('T')[0].split('-').map(Number)

    const hoy = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const fechaLiderazgo = new Date(anio, mes - 1, dia)

    // Solo validar la hora si la fecha es HOY
    if (fechaLiderazgo.getTime() === hoy.getTime()) {
      const horaActual = now.getHours()
      const minutoActual = now.getMinutes()

      if (hora > horaActual || (hora === horaActual && minuto > minutoActual)) {
        ctx.addIssue({
          path: ["liv_hor"],
          code: z.ZodIssueCode.custom,
          message: "La hora no puede ser mayor a la hora actual del sistema",
        })
      }
    }
  }


  if (data.eventOperationType === "POST") {

    if (!data.liv_tipo_pract) {
      ctx.addIssue({
        code: "custom",
        message: "Campo obligatorio",
        path: ["liv_tipo_pract"],
      });
    }

    if (!data.une_id) {
      ctx.addIssue({
        code: "custom",
        message: "Campo obligatorio",
        path: ["une_id"],
      });
    }

    if (!data.liv_per_involucrado) {
      ctx.addIssue({
        code: "custom",
        message: "Campo obligatorio",
        path: ["liv_per_involucrado"],
      });
    }

    if (!data.liv_fec_liv) {
      ctx.addIssue({
        code: "custom",
        message: "Campo obligatorio",
        path: ["liv_fec_liv"],
      });
    }

    if (!data.liv_hor) {
      ctx.addIssue({
        code: "custom",
        message: "Campo obligatorio",
        path: ["liv_hor"],
      });
    }

    if (!data.are_id) {
      ctx.addIssue({
        code: "custom",
        message: "Campo obligatorio",
        path: ["are_id"],
      });
    }

    if (!data.lug_id) {
      ctx.addIssue({
        code: "custom",
        message: "Campo obligatorio",
        path: ["lug_id"],
      });
    }

    if (!data.act_id) {
      ctx.addIssue({
        code: "custom",
        message: "Campo obligatorio",
        path: ["act_id"],
      });
    }

    if (!data.liv_tip_act) {
      ctx.addIssue({
        code: "custom",
        message: "Campo obligatorio",
        path: ["liv_tip_act"],
      });
    }

    if (!data.liv_qui_contacto) {
      ctx.addIssue({
        code: "custom",
        message: "Campo obligatorio",
        path: ["liv_qui_contacto"],
      });
    }

    if (!data.liv_num_per_inv || Number(data.liv_num_per_inv) <= 0) {
      ctx.addIssue({
        code: "custom",
        message: "Campo obligatorio",
        path: ["liv_num_per_inv"],
      });
    }


  }
}).transform(data => {
  return data
})

export type LiderazgoInformacionGeneral = z.infer<typeof LiderazgoInformacionGeneralSchema>
export type LiderazgoInformacionGeneralBase = z.infer<typeof LiderazgoInformacionGeneralSchemaBase>