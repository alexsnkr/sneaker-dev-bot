const Discord = require('discord.js')
const client = new Discord.Client()
const channels = require('./channels')
const { token, mod_roles, forum_id } = require('./config.json')

const store = require('./lib/json-store')

const emojiNames = ['positive', 'impartial', 'negative']

client.on('ready', async () => {
	console.log(`Logged in as ${client.user.tag}!`)

	await store.hydrate()
})

client.on('message', (message) => {
	try {
		if (message.channel.type === 'dm') return

		const isMod = message.member ? message.member.roles.cache.some((role) => mod_roles.includes(role.id)) : false
		if (isMod) return

		const channelName = message.channel.name
		channels[channelName]?.(message)
	} catch (error) {
		console.log(error)
	}
})

client.on('channelCreate', (channel) => {
	if (channel.parent?.id === forum_id) {
		emojiNames.forEach((emojiName) => {
			const emoji = client.emojis.cache.find((emoji) => emoji.name === emojiName)
			if (emoji) {
				channel.react(emoji).catch((error) => console.error(`Failed to add emoji ${emojiName}:`, error))
			}
		})
	}
})

client.login(token)
