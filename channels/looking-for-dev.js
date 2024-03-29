export default (message) => {
	const messageContent = message.content.toLowerCase()
	const requiredFields = ['project type', 'compensation', 'current project state', 'programming language']
	const hasFields = requiredFields.every((field) => messageContent.includes(field))

	if (!hasFields) {
		message.author.send(
			`Your message in the #looking-for-dev channel was deleted because it follow the correct format:
\`\`\`
[Project Type]: 
[Compensation]: 
[Current Project State]: 
[Programming Language]: 
[Other Info]: 
\`\`\``,
		)

		message.delete()
		return
	}

	const lines = messageContent.split('\n')
	const compensationLine = lines.find((line) => line.includes('[compensation]'))

	if (!/\d/g.test(compensationLine) || /\b0.*[$£€%]|[$£€%]0/g.test(compensationLine)) {
		message.author.send(
			"Your message in the #looking-for-dev channel was deleted because it didn't include a price or percentage.",
		)

		message.delete()
		return
	}
}
