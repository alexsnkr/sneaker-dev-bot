let users = {}

module.exports = (message) => {
	const timestamp = users[message.author.id]
	const cooldown = 86400000

	if (!timestamp) {
		users[message.author.id] = message.createdTimestamp
	} else {
		const now = +new Date()
		if (now - timestamp < cooldown) {
			message.delete()
			return
		}
	}

	const words = message.content.split(' ')

	if (!words[0].match(/WTS|WTT/g) || words.length > 100) {
		message.delete()
		return
	}

	message.suppressEmbeds(true)
}
