const store = require('../lib/json-store')

module.exports = (message) => {
	const users = store.get('selling-services') ?? {}

	const timestamp = users[message.author.id]
	const cooldown = 48 * 60 * 60 * 1000

	const lines = message.content.split(/\r\n|\r|\n/)
	const lineLimit = 20

	if (!message.content.match(/^(WTS|WTT|WTR)/gi)) {
		message.author.send(
			"Your message in the #selling-services channel was deleted because it didn't start with WTS, WTT, or WTR.",
		)
		message.delete()
		return
	} else if (lines.length > lineLimit) {
		message.author.send(
			`Your message in the #selling-services channel was deleted because it went over the ${lineLimit} line limit.`,
		)
		message.delete()
		return
	}

	if (timestamp) {
		const now = +new Date()

		if (now - timestamp < cooldown) {
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
