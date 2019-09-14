import { $ } from '../tools/utils'

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
      form: $('.form')
    }
  }

  dynamicBindEvents (action) {
    const { form } = this.DOM

    form[`${action}EventListener`]('submit', this.submitHandler)
  }

  submitHandler (e) {
    console.log(e)
    window.grecaptcha
      .execute('6LdZb7gUAAAAABQfdkmDqM2MN9KMcI4ne58RAIyP', { action: 'contacto' })
      .then(console.log)
  }

  dispose () {
    this.dynamicBindEvents('remove')
  }
}
