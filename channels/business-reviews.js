const moment = require('moment')

module.exports = (message) => {
	const timestamp = moment(message.member.joinedTimestamp)

	if (moment().diff(timestamp, 'days') < 7) {
		message.author.send(
			'Your message in the #business-reviews channel was deleted because you have not been a member of the server for at least 7 days.',
		)
		message.delete()
		return
	}
}
