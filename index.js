const TelegramBot = require("node-telegram-bot-api");
const fs = require("fs");
const dot = require("dotenv").config();

/** В файле .env должен лежать токен для бота внутри скобок "" */
const token = dot.parsed.TOKEN;

// Создаю файл .env если его не существует.
// Его нельзя класть в репозиторий, чтобы не украли токен от приложения
fs.open(".env", (err) => {
  if (err) {
    console.log(".env doesn`t exist");
    fs.writeFile(".env", 'TOKEN=""', function (err) {
      if (err) throw err;
      console.log("New .env saved");
    });
  }
});

/** Сам бот вместе с токеном */
const bot = new TelegramBot(token, { polling: true });

bot.on("new", (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, "Привет, дружочек, пирожочек!");
});

/** Если бот получает конкретный текст ... */
bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];

  bot.sendMessage(chatId, resp);
});

/** Если бот получает любое сообщения типа message */
bot.on("message", (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, "Я получил сообщение - если нет кнопок нажми /start");
});

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Привет!", {
    reply_markup: {
      keyboard: [
        [{ text: "1" }, "2"], 
        ["3"], 
        ["4"]
    ],
    },
  });
});
