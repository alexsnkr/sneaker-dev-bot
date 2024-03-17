export default (message) => {
	if (!message.content.match(/^(WTB|WTT|WTR)/gi)) {
		message.author.send("Your message in the #buying channel was deleted because it didn't start with WTB, WTT, or WTR.")
		message.delete()
		return
	}
}
