const TelegramBot = require("node-telegram-bot-api");
const { initializeApp } = require("firebase/app");
const { getDatabase, ref, set, get, child,update,remove } = require("firebase/database");
const dayjs = require("dayjs");
const axios = require("axios")
let last_username="Азиз";
let last_userid="";
const admins = ["7055406122","7965035846"]
const userTimers = {};
let managerstring="";
const firebaseConfig = {
  apiKey: "AIzaSyD2XAwoDZ994tR-ppf2w4G1gE_kIv7dH2Y",
  authDomain: "telegrambot1-9c41e.firebaseapp.com",
  projectId: "telegrambot1-9c41e",
  storageBucket: "telegrambot1-9c41e.firebasedatabase.app",
  messagingSenderId: "976285407857",
  appId: "1:976285407857:web:6afffb8ef7726c3668d9d0",
  measurementId: "G-VDPJXCGNRX",
  databaseURL: "https://telegrambot1-9c41e-default-rtdb.europe-west1.firebasedatabase.app",
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const bot = new TelegramBot("7043917766:AAHDB8qj9_uMzDSIc7jY-r98P37diGGw9co", { polling: true });
const adminbot = new TelegramBot("7760163924:AAEdXY-WBT82M76Aj88ggtw-JConZ7Mejdw",{polling: true});
const questions = [
  "Вам есть 18 лет?",
  "Вы зарегистрированы на какой-нибудь биржи по типу Binance, Bybit, OKX?",
  "Есть опыт в P2P торговле?",
];
async function checkUserById(userId) {

  try {
    // Получаем все данные из раздела 'users'
    const usersRef = ref(database, 'users');
    const usersSnapshot = await get(usersRef);
    
    if (usersSnapshot.exists()) {
      const allUsers = usersSnapshot.val();
      
      // Перебираем все данные и ищем нужный userId
      for (const section in allUsers) {
        const sectionUsers = allUsers[section]; // Это будет объект пользователей в section (например, 'verified' или 'not_verified')
        
        for (const userKey in sectionUsers) {
  

          if (sectionUsers[userKey] === userId.toString()) {
            console.log(`User found in ${section}:`, sectionUsers[userKey]);
            return true;
          }
        }
      }
    }

    console.log('User not found in any section.');
  } catch (error) {
    console.error('Error checking user:', error);
  }
}
async function getPhotos(path) {
  try {
    const dbRef = ref(database);
    const snapshot = await get(child(dbRef, path));
    if (snapshot.exists()) {
      return Object.values(snapshot.val()); // Возвращаем массив фото ID
      
    } else {
      console.log("Фотографии не найдены.");
      return [];
    }
  } catch (error) {
    console.error("Ошибка при получении фотографий из Firebase:", error);
    return [];
  }
}
async function getValueByPath(path) {
  try {
    const dbRef = ref(database);
    const snapshot = await get(child(dbRef, path));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log(`Данных нет по пути: ${path}`);
      return null;
    }
  } catch (error) {
    console.error("Ошибка при получении данных из Firebase:", error);
    return null;
  }
}
async function saveUserToNotVerified(username,userId) {
  try {
    const dbRef = ref(database, `users/not_verified/${username}`);
    await set(dbRef, userId.toString()); // Сохраняем userId как значение
  } catch (error) {
    console.error("Ошибка при сохранении пользователя в not_verified:", error);
  }
}
adminbot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const username = msg.from.first_name;
  const usersRef = ref(database, `admins/${username}`);

  try {
    // Сохраняем информацию о пользователе
    await set(usersRef, chatId);

  } catch (error) {
    console.error("Ошибка сохранения ID пользователя:", error);
  }
});
let messages = {
  1: `Ты потерял 153$ 💰

😉Именно такую сумму вчера заработало несколько человек.
Сделано 5 свапов на 5%, 4%, 1,5%, 3%, 1%, 

Рассмотрим пример с бюджета в 1000$ 💶

1 Круг, токен HMSTR:  отдаем 1000$ - получаем 1050$

2 Круг, токен NOT: отдаем 1050$ - получаем 1092$

3 Круг, токен TRX: отдаем 1092$ - получаем 1108$

4 Круг, токен CATI: отдаем 1108 $ - получаем 1141.5$ 

5 Круг, токен BTC: отдаем 1141$ - получаем 1153$ 

———————————————

Уделяя нашей работе всего 2-5 часов каждый день, вы будете зарабатывать от 150$ при бюджете в 1000$. А что если бюджет больше, или же постоянно увеличивать.

Это стабильный заработок с полным отсутствием рисков так как мы работаем только с биржами и проверенными обменниками

➡️связь с менеджером - @

Не упускай возможности 🚀`,
  2: `Ты потерял 307$$ 💰

😉Именно такую сумму вчера заработало несколько человек.
Сделано 9 свапов на 2%, 3%, 1,8%, 3.3%, 1.6%, 4.7%, 3.1%, 5.5%, 2.3%

Рассмотрим пример с бюджета в 1000$ 💶

1 Круг, токен LTC:  отдаем 1000$ - получаем 1020$

2 Круг, токен TON: отдаем 1020$ - получаем 1050$

3 Круг, токен DOGE: отдаем 1050$ - получаем 1069$

4 Круг, токен NOT: отдаем 1069$ - получаем 1104$ 

5 Круг, токен ETH: отдаем 1104$ - получаем 1122$ 

6 Круг, токен DOGS: отдаем 1122$ - получаем 1175$ 

7 Круг, токен TON: отдаем 1175$ - получаем 1211$ 

8 Круг, токен PIXFI: отдаем 1211$ - получаем 1278$ 

9 Круг, токен ATOM: отдаем 1278$ - получаем 1307$ 

———————————————

Уделяя нашей работе всего 2-5 часов каждый день, вы будете зарабатывать от 150$ при бюджете в 1000$. А что если бюджет больше, или же постоянно увеличивать.

Это стабильный заработок с полным отсутствием рисков так как мы работаем только с биржами и проверенными обменниками

➡️связь с менеджером - @

Не упускай возможности 🚀`,
  3: `Ты потерял 165$$ 💰

😉Именно такую сумму вчера заработало несколько человек.
Сделано 3 свапов на
4.3%, 6%, 5.4%

Рассмотрим пример с бюджета в 1000$ 💶

1 Круг, токен DOGS:  отдаем 1000$ - получаем 1043$

2 Круг, токен PEPE: отдаем 1043$ - получаем 1105$

3 Круг, токен HMSTR: отдаем 1105$ - получаем 1165$

———————————————

Уделяя нашей работе всего 2-5 часов каждый день, вы будете зарабатывать от 150$ при бюджете в 1000$. А что если бюджет больше, или же постоянно увеличивать.

Это стабильный заработок с полным отсутствием рисков так как мы работаем только с биржами и проверенными обменниками

➡️связь с менеджером - @

Не упускай возможности 🚀`,
  4: `Привет, Ты потерял уже около 1000$$ 💰

Все кто начали работать с первого дня, сделали практически х1.5-2 от начальной суммы входа

———————————————

Уделяя нашей работе всего 2-5 часов каждый день, вы будете зарабатывать от 150$ при бюджете в 1000$. А что если бюджет больше, или же постоянно увеличивать.

Это стабильный заработок с полным отсутствием рисков так как мы работаем только с биржами и проверенными обменниками

➡️связь с менеджером - @

Не упускай возможности 🚀`,
  7: `Привет, вижу тебе не совсем интересно, но хочу поделиться результатами участников нашей команды.

Взяли в пример 3 трейдера, каждый из них начал работать с суммой 1000$ 💰

Первый сделал - 4568$, чистыми 3568$ 🚀

Второй сделал - 3920$, чистыми 2920$ 🚀

Третий сделал - 3485$, чистыми 2485$ 🚀

Хочешь делать такие же результаты ?

Напиши нашему менеджеру @ «➕» в ЛС`,
  15: `Привет👋

Снова хочу поделиться результатами участников нашей команды.

Взяли в пример 3 трейдера, каждый из них начал работать с суммой 1000$ 💰

Первый сделал - 10290$, чистыми 9290$ 🚀

Второй сделал - 11850$, чистыми 10850$ 🚀

Третий сделал - 8697$, чистыми 7697$ 🚀

Хочешь делать такие же результаты ?

Напиши нашему менеджеру @ «➕» в ЛС`,
};

async function startMessageFlow(userId) {
  managerstring = await getValueByPath("glav_admin")
  // Если процесс уже запущен для этого пользователя, ничего не делаем
  if (userTimers[userId]) {
    console.log(`Для пользователя ${userId} уже запущен процесс.`);
    return;
  }

  console.log(`Запуск процесса для пользователя ${userId}`);

  // Дата старта отсчета
  const startDate = dayjs();

  // Массив дней, когда должны быть отправлены сообщения
  const daysToSend = Object.keys(messages).map(Number);

  // Устанавливаем таймеры для каждого дня
  userTimers[userId] = [];
  for (const day of daysToSend) {
    const delay =day*24*60*60*1000; // Конвертируем дни в миллисекунды
    const photos = await getPhotos("photos"+day.toString());
    console.log(day)
    const mediaGroup = await Promise.all(
      photos.map(async (fileId) => {
        // Получаем информацию о файле
        const file = await adminbot.getFile(fileId);
        const fileUrl = `https://api.telegram.org/file/bot${"7760163924:AAEdXY-WBT82M76Aj88ggtw-JConZ7Mejdw"}/${file.file_path}`;
    
        // Загружаем файл как поток
        const response = await axios.get(fileUrl, { responseType: "stream" });
    
        // Возвращаем объект для MediaGroup
        return {
          type: "photo",
          media: response.data, // Поток данных для отправки
        };
      })
    );


    
    const timer = setTimeout(async () => {
      const message = messages[day].replace("@",managerstring);
      console.log(`Отправка пользователю ${userId} на день ${day}: ${message}`);
      // Здесь вызовите вашу функцию отправки сообщения, например:
      
      bot.sendMediaGroup(userId,mediaGroup);
      
      await bot.sendMessage(userId,message);
      
      // Удаляем таймер из хранилища, если это последний день
      if (day === Math.max(...daysToSend)) {
        console.log(`Процесс для пользователя ${userId} завершен.`);
        delete userTimers[userId];
      }
    }, delay);

    userTimers[userId].push(timer);
  }

  console.log(`Процесс для пользователя ${userId} успешно запущен.`);
}

async function sendMessageToAll() {
  const db = database;
  const usersRef = ref(db, "admins");
  const usersSnapshot = await get(usersRef);

  if (usersSnapshot.exists()) {
    const users = usersSnapshot.val();

    for (const userId in users) {
      const telegramId = users[userId];

      // Отправляем сообщение с кнопкой
      adminbot.sendMessage(telegramId, last_username+" прошел квиз. Он вам написал?", {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "да",
                callback_data: `verify_${telegramId}`, // Callback для обработки
              },{
                text: "нет",
                callback_data: `not_verify_${telegramId}`, // Callback для обработки
              },
            ],
          ],
        },
      });
    }
  } else {
    console.log("No users in not_verified.");
  }
}

adminbot.on('callback_query', async (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;
  db = database;
  // Проверяем, была ли нажата кнопка подтверждения
  if (data.startsWith('verify')) {

    try {
      console.log(last_username,last_userid)
      const userRef = ref(db, `users/not_verified/`);
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        const userData = snapshot.val();

        // Перемещаем пользователя в verified
        const verifiedRef = ref(db, `users/verified/`);
        await update(verifiedRef, userData);

        // Удаляем из not_verified
        await remove(userRef);

        // Уведомляем пользователя
        adminbot.sendMessage(chatId, "статус подтвержден!");
      } else {
        adminbot.sendMessage(chatId, "статус уже подтвержден или запись не найдена.");
      }
    } catch (error) {
      console.error('Ошибка при обработке подтверждения:', error);
      adminbot.sendMessage(chatId, "Произошла ошибка при подтверждении.");
    }
  }
  else if(data.startsWith('not_verify')){
   await startMessageFlow(last_userid);
  }
});







bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const community = await getValueByPath("community");
  const isUserQuizCompleted = await checkUserById(userId);
  
  const photos = await getPhotos("photos");
  
  if (isUserQuizCompleted) {
    managerstring = await getValueByPath("glav_admin")
      
    
    bot.sendMessage(chatId, "Вы уже прошли квиз. Напишите + нашему менеджеру "+managerstring);
    return;
  }
  else{
    const mediaGroup = await Promise.all(
      photos.map(async (fileId) => {
        // Получаем информацию о файле
        const file = await adminbot.getFile(fileId);
        const fileUrl = `https://api.telegram.org/file/bot${"7760163924:AAEdXY-WBT82M76Aj88ggtw-JConZ7Mejdw"}/${file.file_path}`;
    
        // Загружаем файл как поток
        const response = await axios.get(fileUrl, { responseType: "stream" });
    
        // Возвращаем объект для MediaGroup
        return {
          type: "photo",
          media: response.data, // Поток данных для отправки
        };
      })
    );


    await bot.sendMediaGroup(chatId,mediaGroup);
  
    
  const options = {
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [{ text: "Начать квиз", callback_data: "start_quiz" }]
      ]
    }
  };

    bot.sendMessage(
      chatId,
      `Приветствую 👋, это бот\nСообщества [CryptoForce](${community}) 💰\nЧтобы получить инструкцию и доступ к закрытым обменникам БЕСПЛАТНО вам нужно ответить на три простых вопроса🚀\n⬇️⬇️⬇️`,
      options
    );
  }
});


bot.on("callback_query", async (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  const userId = callbackQuery.from.id;
  const username = callbackQuery.from.first_name;
  const action = callbackQuery.data;
  const admin = await getValueByPath("glav_admin")
  const community = await getValueByPath("community")
  if (action === "start_quiz") {

    let previousMessageId = null;
  


      let questionIndex = 0;

      const sendQuestion = async (index, previousMessageId) => {
        if (previousMessageId) {
          try {
            await bot.deleteMessage(chatId, previousMessageId);
          } catch (err) {
            console.log("Не удалось удалить предыдущее сообщение:", err);
          }
        }

        if (index < questions.length) {
          const options = {
            reply_markup: {
              inline_keyboard: [
                [{ text: "Да", callback_data: `answer_yes_${index}` }, { text: "Нет", callback_data: `answer_no_${index}` }]
              ]
            }
          };

          const sentMessage = await bot.sendMessage(chatId, questions[index], options);
          return sentMessage.message_id;
        } else {
          await bot.sendMessage(chatId, "Спасибо, что ответили на вопросы 🎉\nОтправьте '➕' нашему менеджеру "+admin+"   Для получения инструкции \nНаш канал по Обмену криптовалюты ⬇️⬇️⬇️\n[ПОДПИСАТЬСЯ]("+community+")",{parse_mode: "Markdown"});
          await saveUserToNotVerified(username,userId); 
           last_username = username;
          last_userid = userId;
          sendMessageToAll();
          return null;
        }
      };


      previousMessageId = await sendQuestion(questionIndex, previousMessageId);

      bot.on("callback_query", async (callbackQuery) => {
        const userAnswer = callbackQuery.data;
        const index = parseInt(userAnswer.split("_")[2]);

        if (questionIndex < questions.length) {
          questionIndex++;
          previousMessageId = await sendQuestion(questionIndex, previousMessageId);
        } else {
          try {
            await bot.deleteMessage(chatId, previousMessageId);
          } catch (err) {
            console.log("Не удалось удалить последний вопрос:", err);
          }
          
        
        }

        bot.answerCallbackQuery(callbackQuery.id, {
          text: "Ответ принят!",
          show_alert: false,
          
        });
      });
    }
  }
);

// Хранилище состояния для каждого пользователя
let userState = {};

// Обработчик старта бота, выводит 9 кнопок
adminbot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  if(admins.includes(chatId.toString())){
  const options = {
    reply_markup: {
      keyboard: [
        ['День 1', 'День 2', 'День 3'],
        ['День 4', 'День 7', 'День 15'],
        ['День 0', 'Админ', 'Сообщество']
      ],
      resize_keyboard: true,
      one_time_keyboard: true,
    }
  };
  adminbot.sendMessage(chatId, 'Выберите день или раздел:', options);
}else{
  adminbot.sendMessage(chatId, 'у вас нет прав админа',);

}
});

// Обработчик нажатия на кнопки "День 1", "День 2" и т.д.
adminbot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  if(admins.includes(chatId.toString())){
  // Проверяем, что msg.text существует и является строкой
  if (typeof text === 'string') {
    // Если уже обрабатываем фото, игнорируем
    if (userState[chatId] && userState[chatId].waitingForPhoto) {
      return; // Если бот уже ожидает фото, игнорируем остальные сообщения
    }

    // Обработчик для "День 0"
    if (text === 'День 0') {
      const dayRef = 'photos'; // Сохраняем в ключ 'photos'
  
      // Устанавливаем состояние, что бот ожидает фото
      userState[chatId] = { waitingForPhoto: true };
  
      // Уведомляем пользователя
      adminbot.sendMessage(chatId, 'Пожалуйста, отправьте  3 фотографии для День 0.');
  
      // Создаем массив для хранения всех полученных фото
      const photoIds = [];
  
      // Используем обработчик для сбора всех фотографий
      const photoListener = adminbot.on('photo', async (photoMsg) => {
          // Достаем массив размеров фотографии
          const photos = photoMsg.photo;
  
          if (photos && photos.length > 0) {
              // Берем фотографию с максимальным качеством
              const photoId = photos[photos.length - 1].file_id;
  
              // Добавляем `file_id` в список
              photoIds.push(photoId);
  
              // Отправляем фото обратно, чтобы показать, что они обработаны
              
          }
  
          // Если собрали 3 фотографии, прекращаем ожидание
          if (photoIds.length >= 3) {
              // Удаляем старые фотографии из Firebase
              const photosRefPath = ref(database, `/photos`);
              await remove(photosRefPath);
  
              // Сохраняем новые `photoIds` в Firebase
              await set(ref(database, `/photos`), photoIds);
  
              // Отправляем уведомление
              await adminbot.sendMessage(chatId, 'Фотографии для День 0 успешно сохранены.');
  
              // Сбрасываем состояние пользователя
              userState[chatId].waitingForPhoto = false;
  
              // Убираем слушатель, чтобы он не обрабатывал новые сообщения
              adminbot.removeListener('photo', photoListener);
          }
      });
  }

    // Обработчик нажатия на кнопки "День 1", "День 2", ... "День 15"
    else if (text.startsWith('День')) {
      const day = text.split(' ')[1]; // Получаем номер дня (1, 2, 3 и т.д.)
      const dayRef = `photos${day}`; // Формируем ключ для Firebase
  
      // Устанавливаем состояние, что бот ожидает фото
      userState[chatId] = { waitingForPhoto: true };
  
      // Уведомляем пользователя
      adminbot.sendMessage(chatId, `Пожалуйста, отправьте 3 фотографии для День ${day}.`);
  
      // Создаем массив для хранения всех фотографий
      const photoIds = [];
  
      // Обработчик для получения фотографий
      const photoListener = adminbot.on('photo', async (photoMsg) => {
          const photos = photoMsg.photo;
  
          if (photos && photos.length > 0) {
              // Берем фотографию с максимальным качеством
              const photoId = photos[photos.length - 1].file_id;
  
              // Сохраняем уникальный `file_id`
              photoIds.push(photoId);
  
              // Отправляем фото обратно для подтверждения
             
          }
  
          // Если собрано 3 фотографии, завершаем ожидание
          if (photoIds.length >= 3) {
              // Удаляем старые фотографии из Firebase
              const dayRefPath = ref(database, `/${dayRef}`);
              await remove(dayRefPath);
  
              // Сохраняем новые фотографии
              await set(ref(database, `/${dayRef}`), photoIds);
  
              // Уведомляем пользователя об успехе
              await adminbot.sendMessage(chatId, `Фотографии для День ${day} успешно сохранены.`);
  
              // Сбрасываем состояние
              userState[chatId].waitingForPhoto = false;
  
              // Убираем слушатель
              adminbot.removeListener('photo', photoListener);
          }
      });
  }
  

    // Обработчик кнопки "Сообщество"
    if (text === 'Сообщество') {
      adminbot.sendMessage(chatId, 'Пожалуйста, напишите сообщение для сообщества.');
      adminbot.once('message', async (communityMsg) => {
        const communityMessage = communityMsg.text;
        const communityRef = ref(database, '/community');
        await set(communityRef, communityMessage);
        adminbot.sendMessage(chatId, 'Сообщение для сообщества сохранено.');
      });
    }

    // Обработчик кнопки "Админ"
    if (text === 'Админ') {
      adminbot.sendMessage(chatId, 'Пожалуйста, напишите сообщение для админа.');
      adminbot.once('message', async (adminMsg) => {
        const adminMessage = adminMsg.text;
        const adminRef = ref(database, '/glav_admin');
        await set(adminRef, adminMessage);
        adminbot.sendMessage(chatId, 'Сообщение для админа сохранено.');
      });
    }
  }}else{
  adminbot.sendMessage(chatId, 'у вас нет прав админа');
    
  }
});

// Обработчик ошибок polling
adminbot.on('polling_error', (error) => {
  console.error('Polling error:', error);
});
