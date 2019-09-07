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
        controls: ['togrid', 'next'],
        href: [
          '/servicios',
          '/servicios/miomectomia-laparoscopica'
        ]
      },
      miomectomia: {
        controls: ['togrid', 'prev', 'next'],
        href: [
          '/servicios',
          '/servicios/ultrasonido',
          '/servicios/endometriosis'
        ]
      },
      endometriosis: {
        controls: ['togrid', 'prev', 'next'],
        href: [
          '/servicios',
          '/servicios/miomectomia-laparoscopica',
          '/servicios/reseccion-laparoscopica-de-quistes'
        ]
      },
      reseccion: {
        controls: ['togrid', 'prev', 'next'],
        href: [
          '/servicios',
          '/servicios/endometriosis',
          '/servicios/estudio-de-infertilidad'
        ]
      },
      infertilidad: {
        controls: ['togrid', 'prev', 'next'],
        href: [
          '/servicios',
          '/servicios/reseccion-laparoscopica-de-quistes',
          '/servicios/histeroscopia-de-consultorio'
        ]
      },
      histeroscopia: {
        controls: ['togrid', 'prev', 'next'],
        href: [
          '/servicios',
          '/servicios/estudio-de-infertilidad',
          '/servicios/atencion-de-parto'
        ]
      },
      parto: {
        controls: ['togrid', 'prev', 'next'],
        href: [
          '/servicios',
          '/servicios/histeroscopia-de-consultorio',
          '/servicios/atencion-de-parto-por-cesarea'
        ]
      },
      cesarea: {
        controls: ['togrid', 'prev', 'next'],
        href: [
          '/servicios',
          '/servicios/atencion-de-parto',
          '/servicios/menopausia-y-climaterio'
        ]
      },
      menopausia: {
        controls: ['togrid', 'prev', 'next'],
        href: [
          '/servicios',
          '/servicios/atencion-de-parto-por-cesarea',
          '/servicios/colposcopia'
        ]
      },
      colposcopia: {
        controls: ['togrid', 'prev', 'next'],
        href: [
          '/servicios',
          '/servicios/menopausia-y-climaterio',
          '/servicios/control-prenatal'
        ]
      },
      prenatal: {
        controls: ['togrid', 'prev', 'next'],
        href: [
          '/servicios',
          '/servicios/colposcopia',
          '/servicios/planificacion-familiar'
        ]
      },
      planificacion: {
        controls: ['togrid', 'prev'],
        href: [
          '/servicios',
          '/servicios/control-prenatal'
        ]
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
