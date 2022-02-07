const store = require('../lib/json-store')

module.exports = (message) => {
	const users = store.get('selling') ?? {}

	const timestamp = users[message.author.id]
	const cooldown = 86400000

	const words = message.content.split(' ')

	if (!message.content.match(/^(WTS|WTT|WTR)/gi)) {
		message.author.send(
			"Your message in the #selling channel was deleted because it didn't start with WTS, WTT, or WTR.",
		)
		message.delete()
		return
	} else if (words.length > 100) {
		message.author.send('Your message in the #selling channel was deleted because it went over the 100 word limit.')
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
