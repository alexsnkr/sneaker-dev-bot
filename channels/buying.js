module.exports = (message) => {
	if (!message.content.match(/^(WTB|WTT|WTR)/gi)) {
		message.delete()
		message.author.send("Your message in the #buying channel was deleted because it didn't start with WTB, WTT, or WTR.")
		return
	}

	message.suppressEmbeds(true)
}
