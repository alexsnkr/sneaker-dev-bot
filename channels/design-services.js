import store from '../lib/json-store.js'

export default (message) => {
	const words = message.content.split(' ')

	if (words.length > 130) {
		message.author.send(
			'Your message in the #design-services channel was deleted because it went over the 130 word limit.',
		)
		message.delete()
		return
	}
}
