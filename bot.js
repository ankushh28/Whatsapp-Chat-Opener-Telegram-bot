const TelegramBot = require('node-telegram-bot-api');

const token = '6584727885:AAHcHXI90xT54s0uYYE2T5NKyem5c6iChlY';
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  const welcomeMessage = `
    🌟 Welcome to the WhatsApp Chat Opener Bot! 🌟
    
    This bot helps you generate WhatsApp chat links from phone numbers. 📱💬
    
    To generate a WhatsApp chat link, simply send a phone number in any valid format. 📨

    Examples:
    9414767321

    Let's get started! 😃
  `;

  bot.sendMessage(chatId, welcomeMessage);
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  
  if(text !== '/start'){
    const whatsappLink = `https://wa.me/+91${msg.text}`;

    bot.sendMessage(chatId, 'Here is your WhatsApp chat link:', {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Open WhatsApp Chat',
              url: whatsappLink,
            },
          ],
        ],
      },
    });
  }
  
});

bot.on('callback_query', (query) => {
  if (query.data === 'generate_link') {
    bot.answerCallbackQuery(query.id);
  }
});