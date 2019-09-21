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

    this.isSending = false
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
    if (this.isSending) return

    const { form } = this.DOM

    this.isSending = true

    this.triggerFeedback('sending')

    const request = [...form]
      .filter(input => input.type !== 'submit')
      .reduce((obj, input) => {
        const { name, value } = input
        obj[name] = value
        return obj
      }, {})

    window.setTimeout(() => {
      this.fetchSend(request)
        .then(() => this.triggerFeedback('success'))
        .catch(() => this.triggerFeedback('error'))
    }, 1000)
  }

  fetchSend (request) {
    return new Promise((resolve, reject) => window.grecaptcha
      .execute(
        '6LdFULcUAAAAAPNuqRWxPl-H2oaDZmJQ8SbZgAqd',
        { action: 'contacto' }
      )
      .then(token => {
        window.fetch('sent.php', {
          method: 'POST',
          body: JSON.stringify({ token, ...request }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(res => res.json())
          .then(res => res.success ? resolve() : reject(res))
          .catch(err => reject(err))
      })
    )
  }

  triggerFeedback (state) {
    const { button, loader, feedback, label, message } = this.DOM

    button.classList.add('js-nohover')

    const feedbackTimeline = new TimelineMax()
      .to(loader, 0.5, {
        scale: 0,
        ease: 'Expo.easeInOut'
      })
      .to(button, 0.5, {
        scale: 1,
        ease: 'Expo.easeInOut'
      })
      .to(message, 0.5, {
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
        this.isSending = false
      })
      .pause()

    const feedbackActions = {
      sending () {
        const tl = new TimelineMax()
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
