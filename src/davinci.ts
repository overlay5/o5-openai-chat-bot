import config from './config'
import db from './db'
import { RefreshingAuthProvider } from '@twurple/auth';

interface Options {
    accessToken?: string
    refreshToken?: string
}

interface TokenRow {
  id: number
  data: string
}

async function startDavinci(options: Options = {}) {
  let { accessToken, refreshToken } = options

  let tokenData = null
  if (accessToken && refreshToken) {
    // If accessToken and refreshToken are provided as options, use them
    tokenData = { accessToken, refreshToken }
  } else {
    // try to load the token data from the database
    await db.all("SELECT * FROM tokens ORDER BY id DESC LIMIT 1", (error, rows: TokenRow[]) => {
      if (error) {
        console.error(error)
        return
      }
      if (rows && rows.length > 0) {
        tokenData = JSON.parse(rows[0].data)
      }
    })
  }

  if (tokenData) {
    // Create the twitchAuthProvider only if the tokenData object is not null
    const twitchAuthProvider = new RefreshingAuthProvider(
      { clientId: config.clientId, clientSecret: config.clientSecret,
          onRefresh: async newTokenData => db.run(
              "INSERT INTO tokens (data) VALUES (?)",
              [JSON.stringify(newTokenData)], error => { if (error) console.error(error); }
          )
      }, tokenData)
  }
}

export default startDavinci

