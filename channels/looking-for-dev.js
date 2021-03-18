module.exports = (message) => {
	const messageContent = message.content.toLowerCase()
	const requiredFields = ['project type', 'compensation', 'current project state', 'programming language']
	const hasFields = requiredFields.every((field) => messageContent.includes(field))

	if (!hasFields || messageContent.match(/\$\$|££|€€|%%/)) {
		message.delete()
	}
}
