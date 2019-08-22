/**
 * Code base from article:
 * https://joshbedo.github.io/JS-Design-Patterns/
 */

export default class PubSub {
  static handlers = []

  constructor () {
    this.class = PubSub
  }

  suscribe (event, handler, context = null, isOnceType) {
    if (context === null) { context = handler }
    this.class.handlers.push({
      event,
      handler: handler.bind(context),
      isOnceType
    })
  }

  publish (eventEmited, args) {
    const { handlers } = this.class

    this.class.handlers = handlers.filter(handlerItem => {
      const { event, handler, isOnceType } = handlerItem

      if (eventEmited === event) {
        handler(args)
      }

      return !isOnceType
    })
  }
}
