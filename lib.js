import 'dotenv/config'
import { Client, Intents, MessageManager } from 'discord.js'

const client = new Client({ intents: [Intents.FLAGS.GUILDS] })

client.once('ready', () => console.log('discord.js client ready.')

client.login(process.env.DISCORD_TOKEN)

export function getClient() { return client }

export async function editMessage(channelId, messageId, content) {
  let channel = await client.channels.fetch(channelid)
  let msg = await channel.messages.fetch(messageId)
  MessageManager.edit(msg, content)
}


