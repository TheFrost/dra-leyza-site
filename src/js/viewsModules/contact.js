import { $ } from '../tools/utils'
import { TimelineMax, TweenMax } from 'gsap'

export default class Contact {
  static instance = null

  constructor () {
    // singleton pattern
    if (Contact.instance !== null) {
      return Contact.instance
    }
    Contact.instance = this

    this.submitHandler = this.submitHandler.bind(this)
  }

  init () {
    this.setupSelectors()
    this.dynamicBindEvents('add')
  }

  setupSelectors () {
    this.DOM = {
      form: $('.form'),
      button: $('.form__submit-button'),
      loader: $('.form__submit-loader'),
      feedback: $('.form__submit-feedback'),
      label: $('.form__submit-label'),
      message: $('.form__message p')
    }
  }

  dynamicBindEvents (action) {
    const { form } = this.DOM

    form[`${action}EventListener`]('submit', this.submitHandler)
  }

  submitHandler (e) {
    e.preventDefault()

    const { form } = this.DOM

    this.triggerFeedback('sending')

    const request = [...form]
      .filter(input => input.type !== 'submit')
      .reduce((obj, input) => {
        const { name, value } = input
        obj[name] = value
        return obj
      }, {})

    this.fetchSend(request)
      .then(() => this.triggerFeedback('success'))
      .catch(() => this.triggerFeedback('error'))
  }

  fetchSend (request) {
    return new Promise((resolve, reject) => window.grecaptcha
      .execute(
        '6LdFULcUAAAAAPNuqRWxPl-H2oaDZmJQ8SbZgAqd',
        { action: 'contacto' }
      )
      .then(token => window.fetch('sent.php', {
        method: 'POST',
        body: { token, ...request }
      }))
      .then(res => res.json())
      .then(res => res.success ? resolve() : reject(res))
    )
  }

  triggerFeedback (state) {
    const { button, loader, feedback, label, message } = this.DOM

    button.classList.add('js-nohover')

    const feedbackTimeline = new TimelineMax()
      .to(loader, 0.3, {
        scale: 0,
        ease: 'Expo.easeInOut'
      })
      .to(button, 0.3, {
        scale: 1,
        ease: 'Expo.easeInOut'
      })
      .to(message, 0.3, {
        y: '0%',
        ease: 'Expo.easeInOut'
      }, '-=0.3')
      .to(label, 0.5, {
        y: '0%',
        delay: 5
      })
      .to(feedback, 0.5, {
        y: '100%'
      }, '-=0.5')
      .to(message, 0.5, {
        y: '100%',
        ease: 'Expo.easeInOut'
      }, '-=0.5')
      .eventCallback('onComplete', () => {
        button.classList.remove('js-nohover')
      })
      .pause()

    const feedbackActions = {
      sending () {
        const tl = new TimelineMax({ delay: 0.5 })
          .to(button, 0.5, {
            scale: 0,
            ease: 'Expo.easeInOut'
          })
          .to(loader, 0.5, {
            scale: 1,
            ease: 'Expo.easeInOut'
          })
          .eventCallback('onComplete', () => {
            TweenMax.set(label, { y: '-100%' })
            TweenMax.set(feedback, { y: '0%' })
          })
          .pause()

        tl.play()
      },

      success () {
        message.textContent = '¡Tu mensaje ha sido enviado con éxito!'
        feedback.classList.remove('error')
        feedback.classList.add('success')
        feedbackTimeline.play()
      },

      error () {
        message.textContent = 'Ha ocurrido un error, intenta nuevamente por favor.'
        feedback.classList.remove('success')
        feedback.classList.add('error')

        feedbackTimeline.play()
      }
    }

    feedbackActions[state]()
  }

  dispose () {
    this.dynamicBindEvents('remove')
  }
}
