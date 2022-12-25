import config from './config'
import express from 'express'
import https from 'https'
import querystring from 'querystring'
import davinci from './davinci'

const app = express()

app.get('/login', (req: express.Request, res: express.Response) => {
  const twitchAuthUrl = new URL(config.twitchAuthorizeUrl)
  twitchAuthUrl.searchParams.append('client_id', config.clientId)
  twitchAuthUrl.searchParams.append('redirect_uri', config.callbackUrl)
  twitchAuthUrl.searchParams.append('response_type', 'code')
  twitchAuthUrl.searchParams.append('scope', 'chat:read chat:edit')
  res.redirect(twitchAuthUrl.toString())
})

app.get(new URL(config.callbackUrl).pathname, (req: express.Request, res: express.Response) => {
  const data = querystring.stringify({
    client_id: config.clientId,
    client_secret: config.clientSecret,
    code: req.query?.code?.toString(),
    grant_type: 'authorization_code',
    redirect_uri: config.callbackUrl
  })

  const tokenUrl = new URL(config.twitchTokenUrl)
  const options: https.RequestOptions = {
    hostname: tokenUrl.hostname,
    port: 443,
    path: tokenUrl.pathname,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': data.length
    }
  }

  // Make the request
  const request = https.request(options, (response) => {
    // Collect the response data
    let responseData = '';
    response.on('data', (chunk) => {
      responseData += chunk;
    });

    // When the response has finished, parse the JSON and send the access token to the client
    response.on('end', () => {
      const body = JSON.parse(responseData);
      const accessToken = body.access_token;
      const refreshToken = body.refresh_token;
      davinci({ accessToken, refreshToken })
      res.send(`Starting DaVinci!`);
    });
  });

  request.end(data);
})

davinci()

app.listen(config.httpPort, () => {
  console.log('Express HTTP listening on', config.httpPort)
})
