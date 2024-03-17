import 'dotenv/config'

import { Client, GatewayIntentBits } from 'discord.js'
import store from './lib/json-store.js'
import channels from './channels/index.js'

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		'MessageContent',
		GatewayIntentBits.GuildMessageReactions,
	],
})
const emojiNames = ['positive', 'impartial', 'negative']

client.on('ready', async () => {
	console.log(`Logged in as ${client.user.tag}!`)

	await store.hydrate()
})

client.on('messageCreate', (message) => {
	try {
		if (message.channel.type === 'dm') return

		const modRoles = process.env.MOD_ROLES.split(',')
		const isMod = message.member ? message.member.roles.cache.some((role) => modRoles.includes(role.id)) : false

		if (isMod) return

		const channelName = message.channel.name
		channels[channelName]?.(message)
	} catch (error) {
		console.log(error)
	}
})

client.on('threadCreate', (thread) => {
	if (thread.parent?.id === process.env.FORUM_ID) {
		emojiNames.forEach(async (emojiName) => {
			const emoji = client.emojis.cache.find((emoji) => emoji.name === emojiName)
			if (emoji) {
				const message = await thread.fetchStarterMessage()
				message.react(emoji).catch((error) => console.error(`Failed to add emoji ${emojiName}:`, error))
			}
		})
	}
})

client.login(process.env.TOKEN)
