import Highway from '@dogstudio/highway'
import { pubsub } from '../tools/utils'

export default class Transition extends Highway.Transition {
  in ({ from, done }) {
    from.remove()

    pubsub.publish('controls:reset')
    pubsub.publish('manager:setup')
    pubsub.publish('ps:update')
    pubsub.publish('overlayOut')

    done()
  }

  out ({ trigger, done }) {
    const direction = trigger.dataset
      ? trigger.dataset.direction
      : null

    pubsub.publish('overlayIn', direction || 'right')
    pubsub.publish('manager:dispose')
    pubsub.suscribe('inActionEnd', done, null, true)
  }
}
