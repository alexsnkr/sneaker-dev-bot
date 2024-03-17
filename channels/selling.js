import store from '../lib/json-store.js'
import moment from 'moment'

export default (message) => {
	const users = store.get('selling') ?? {}

	const timestamp = users[message.author.id]

	const lines = message.content.split(/\r\n|\r|\n/)
	const lineLimit = 8

	if (timestamp) {
		const date = moment(timestamp)

		if (moment().diff(date, 'hours') < 24) {
			message.author.send(
				'Your message in the #selling channel was deleted because you have already posted there in the last 24 hours.',
			)
			message.delete()
			return
		}
	}

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

	if (message.content.includes('discord.gg/' || 'discordapp.com/invite/')) {
		message.author.send('Your message in the #selling channel was deleted because it contained an invite link.')
		message.delete()
		return
	}

	users[message.author.id] = message.createdTimestamp
	store.set('selling', users)
}
