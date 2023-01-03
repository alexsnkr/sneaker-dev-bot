const store = require('../lib/json-store')

module.exports = (message) => {
	const users = store.get('selling') ?? {}

	const timestamp = users[message.author.id]
	const cooldown = 24 * 60 * 60 * 1000

	const lines = message.content.split(/\r\n|\r|\n/)
	const lineLimit = 20

	if (message.content.match(/^(WTR|WTRO)/gi)) {
		message.author.send(
			'Your message in the #selling channel was deleted because it appears that you are attempting to sell a service. To sell services, please use the #selling-services channel.',
		)
		message.delete()
		return
	}

	if (!message.content.match(/^(WTS|WTT)/gi)) {
		message.author.send("Your message in the #selling channel was deleted because it didn't start with WTS or WTT.")
		message.delete()
		return
	}

	if (lines.length > lineLimit) {
		message.author.send(
			`Your message in the #selling channel was deleted because it went over the ${lineLimit} line limit.`,
		)
		message.delete()
		return
	}

	if (timestamp) {
		const now = +new Date()

		if (now - timestamp < cooldown) {
			message.author.send(
				'Your message in the #selling channel was deleted because you have already posted there in the last 24 hours.',
			)
			message.delete()
			return
		}
	}

	users[message.author.id] = message.createdTimestamp
	store.set('selling', users)
}
