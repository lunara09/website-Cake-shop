//Стандартный код для запуска экспресс приложения
const express = require("express");
const path = require('path');
const app = express();



// Так подключаются стили, изображения и js код в express
app.use(express.static(path.join(__dirname, 'public')));

//const data = require(__dirname  +'/cakes.json');


//маршрутизация по файлам
app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});
 
//нужно для аякс запроса
app.get("/search", function (req, res) {
  //Берем json фал и отправляем его на сторону клиента
  res.header("Content-Type",'application/json');
  res.sendFile(__dirname + '/cakes.json');
});

app.get("/faq",function (request, response) {
    response.sendFile(__dirname + "/faq.html");
  });

app.get("/contact",function (request, response) {
  response.sendFile(__dirname + "/contact.html");
});

app.get("/gallery",function (request, response) {
  response.sendFile(__dirname + "/gallery.html");
});

app.get("/order",function (request, response) {
  response.sendFile(__dirname + "/order.html");
});

app.get("/about",function (request, response) {
  response.sendFile(__dirname + "/about.html");
});
app.listen(3000);