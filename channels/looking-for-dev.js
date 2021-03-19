module.exports = (message) => {
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
	}

	if (messageContent.match(/\$\$|££|€€|%%/)) {
		message.author.send(
			"Your message in the #looking-for-dev channel was deleted because it didn't include a price or percentage.",
		)

		message.delete()
	}
}
