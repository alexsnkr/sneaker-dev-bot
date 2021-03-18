module.exports = (message) => {
	const words = message.content.split(' ')

	if (!words[0].match(/WTB|WTT|WTR/g)) {
		message.delete()
	}

	message.suppressEmbeds(true)
}
