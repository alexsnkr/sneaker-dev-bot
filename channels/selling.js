let users = {}

module.exports = (message) => {
	const timestamp = users[message.author.id]
	const cooldown = 86400000

	const words = message.content.split(' ')

	if (!message.content.match(/^(WTS|WTT|WTR)/gi) || words.length > 100) {
		message.delete()
		return
	}

	if (!timestamp) {
		users[message.author.id] = message.createdTimestamp
	} else {
		const now = +new Date()
		if (now - timestamp < cooldown) {
			message.delete()
			return
		}
	}

	message.suppressEmbeds(true)
}
