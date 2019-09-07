import { $, pubsub } from '../tools/utils'

export default class Services {
  static instance = null

  constructor () {
    // singleton pattern
    if (Services.instance !== null) {
      return Services.instance
    }
    Services.instance = this

    this.controlsSettings = {
      uniform: {
        area: 'top',
        copy: 'La mejor atención con la calidez humana y profesionalismo en los servicios de:'
      },
      uniformDetail: {
        area: 'bottom'
      },
      ultrasonido: {
        controls: ['next'],
        href: ['/servicios/miomectomia-laparoscopica']
      },
      miomectomia: {
        controls: ['prev', 'next'],
        href: [
          '/servicios/ultrasonido',
          '/servicios/endometriosis'
        ]
      },
      endometriosis: {
        controls: ['prev', 'next'],
        href: [
          '/servicios/miomectomia-laparoscopica',
          '/servicios/reseccion-laparoscopica-de-quistes'
        ]
      },
      reseccion: {
        controls: ['prev', 'next'],
        href: [
          '/servicios/endometriosis',
          '/servicios/estudio-de-infertilidad'
        ]
      },
      infertilidad: {
        controls: ['prev', 'next'],
        href: [
          '/servicios/reseccion-laparoscopica-de-quistes',
          '/servicios/histeroscopia-de-consultorio'
        ]
      },
      histeroscopia: {
        controls: ['prev', 'next'],
        href: [
          '/servicios/estudio-de-infertilidad',
          '/servicios/atencion-de-parto'
        ]
      },
      parto: {
        controls: ['prev', 'next'],
        href: [
          '/servicios/histeroscopia-de-consultorio',
          '/servicios/atencion-de-parto-por-cesarea'
        ]
      },
      cesarea: {
        controls: ['prev', 'next'],
        href: [
          '/servicios/atencion-de-parto',
          '/servicios/menopausia-y-climaterio'
        ]
      },
      menopausia: {
        controls: ['prev', 'next'],
        href: [
          '/servicios/atencion-de-parto-por-cesarea',
          '/servicios/colposcopia'
        ]
      },
      colposcopia: {
        controls: ['prev', 'next'],
        href: [
          '/servicios/menopausia-y-climaterio',
          '/servicios/control-prenatal'
        ]
      },
      prenatal: {
        controls: ['prev', 'next'],
        href: [
          '/servicios/colposcopia',
          '/servicios/planificacion-familiar'
        ]
      },
      planificacion: {
        controls: ['prev'],
        href: ['/servicios/control-prenatal']
      }
    }
  }

  init () {
    this.setupControls()
  }

  setupControls () {
    const { serviceControls } = $('.wrapper').dataset

    pubsub.publish('controls:setup', [
      this.controlsSettings.uniform,
      ...serviceControls !== undefined
        ? [{
          ...this.controlsSettings.uniformDetail,
          ...this.controlsSettings[serviceControls]
        }] : []
    ])
  }
}
