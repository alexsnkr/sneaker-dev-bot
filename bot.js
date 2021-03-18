const Discord = require('discord.js')
const client = new Discord.Client()
const channels = require('./channels')
const { token } = require('./config.json')

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', (message) => {
	const channelName = message.channel.name

	if (channels[channelName]) {
		channels[channelName](message)
	}
})

client.login(token)
