import dotenv from 'dotenv'
dotenv.config()

const clientId = process.env.TWITCH_CLIENT_ID ?? 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
const clientSecret = process.env.TWITCH_CLIENT_SECRET ?? 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
const callbackUrl = process.env.TWITCH_CALLBACK_URL ?? 'http://localhost'
const channelName = process.env.TWITCH_CHANNEL_NAME ?? 'ninja'
const openAiKey = process.env.OPENAI_KEY
const httpPort = process.env.HTTP_PORT
const dbFile = process.env.SQLITE_DB_FILE ?? 'xxx-messages.db'

export default {
  clientId,
  clientSecret,
  openAiKey,
  callbackUrl,
  channelName,
  httpPort,
  dbFile,
  twitchAuthorizeUrl: 'https://id.twitch.tv/oauth2/authorize',
  twitchTokenUrl: 'https://id.twitch.tv/oauth2/token'
}
