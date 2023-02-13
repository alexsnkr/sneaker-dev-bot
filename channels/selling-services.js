const store = require('../lib/json-store')
const moment = require('moment')

module.exports = (message) => {
	const users = store.get('selling-services') ?? {}

	const timestamp = users[message.author.id]

	if (!message.content.match(/^(WTS|WTT|WTR)/gi)) {
		message.author.send(
			"Your message in the #selling-services channel was deleted because it didn't start with WTS, WTT, or WTR.",
		)
		message.delete()
		return
	}

	if (timestamp) {
		const date = moment(timestamp)

		if (date.diff(moment(), 'hours') < 24) {
			message.author.send(
				'Your message in the #selling-services channel was deleted because you have already posted there in the last 24 hours.',
			)
			message.delete()
			return
		}
	}

	users[message.author.id] = message.createdTimestamp
	store.set('selling-services', users)
}
