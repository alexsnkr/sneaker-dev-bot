const Discord = require('discord.js')
const client = new Discord.Client()
const channels = require('./channels')
const { token, mod_roles } = require('./config.json')

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', (message) => {
	if (message.channel.type === 'dm') return

	const isMod = message.member.roles.cache.some((role) => mod_roles.includes(role.id))
	if (isMod) return

	const channelName = message.channel.name
	channels[channelName]?.(message)
})

client.login(token)
