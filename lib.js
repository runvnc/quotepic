import 'dotenv/config'
import discord from 'discord.js'
const { Client, MessageManager, IntentsBitField, InteractionWebhook } = discord
const client = new Client({intents: [IntentsBitField.Flags.Guilds]})

client.once('ready', () => console.log('discord.js client ready.') )

client.login(process.env.DISCORD_TOKEN)

export function getClient() { return client }

export async function editMessage(token, content) {
  let hook = new InteractionWebhook(client, process.env.APP_ID, token)
  await hook.editMessage('@original', content)
}


