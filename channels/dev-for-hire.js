import store from '../lib/json-store.js'
import moment from 'moment'

export default (message) => {
	const users = store.get('dev-for-hire') ?? {}

	const timestamp = users[message.author.id]

	if (timestamp) {
		const date = moment(timestamp)

		if (moment().diff(date, 'hours') < 24) {
			message.author.send(
				'Your message in the #dev-for-hire channel was deleted because you have already posted there in the last 24 hours.',
			)
			message.delete()
			return
		}
	}

	users[message.author.id] = message.createdTimestamp
	store.set('dev-for-hire', users)
}
