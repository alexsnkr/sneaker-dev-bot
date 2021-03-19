module.exports = (message) => {
	if (!message.content.match(/^(WTB|WTT|WTR)/gi)) {
		message.delete()
		return
	}

	message.suppressEmbeds(true)
}
