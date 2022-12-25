import config from './config'
import { Configuration, OpenAIApi } from "openai"
import { StaticAuthProvider } from '@twurple/auth';
import { ChatClient } from '@twurple/chat';

const configuration = new Configuration({ apiKey: config.openAiKey })
const openai = new OpenAIApi(configuration);

// const chatClient = new ChatClient({ authProvider, channels: [config.channelName] });
// await chatClient.connect();

// Set up a counter to keep track of the message count
// let messageCount = 0;
// 
// chatClient.onMessage((channel, user, text) => {
// 	if (text === '!ping') {
// 		chatClient.say(channel, 'Pong!');
// 	} else if (text === '!dice') {
// 		const diceRoll = Math.floor(Math.random() * 6) + 1;
// 		chatClient.say(channel, `@${user} rolled a ${diceRoll}`)
// 	}
// })

//  while (true) {
//    // Get the chat messages from the channel
//    const chatMessages = await client.kraken.channels.getChatMessages(channelName);
//  
//    // Iterate over the messages and add them to the array of recent messages
//    for (const message of chatMessages.messages) {
//      db.run(
//        "INSERT INTO messages (message, sender, timestamp) VALUES (?, ?, ?)",
//        [message.message, message.sender, message.timestamp],
//        (error) => {
//          if (error) {
//            console.error(error);
//          }
//        }
//      );
//  
//      // Increment the message count
//      messageCount++;
//  
//      // If the message count has reached 20, generate a response using the OpenAI API
//      if (messageCount === 20) {
//        // Join the recent messages into a single string
//        const context = recentMessages.join("\n");
//        db.all("SELECT * FROM messages ORDER BY id DESC LIMIT 20", (error, rows) => {
//          if (error) {
//            console.error(error);
//            return;
//          }
//  
//          // Join the recent messages into a single string
//          const context = rows
//            .map((row) => `${row.sender}: ${row.message}`)
//            .join("\n");
//  
//          // Use the OpenAI API to generate a response based on the recent messages
//          const response = openai.completions.create({
//            engine: "davinci",
//            prompt: `Based on the recent messages in the chat, here is a response: \n\n${context}\n\n`,
//            maxTokens: 1024,
//            temperature: 0.5,
//          });
//  
//          // Use the Twitch API to send the response to the chat
//          client.kraken.channels.sendMessage(channelName, response.text);
//          
//          // Reset the message count
//          messageCount = 0;
//        });
//      }
//    }
//  }



