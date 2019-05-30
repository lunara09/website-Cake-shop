var d = document,
    cartCont = d.getElementById('cart_content'); // блок вывода данных корзины

var cakes;
var countItems = localStorage.getItem("count-items") || 0;
document.getElementById("count-items").innerText = countItems;
window.onload = function() {

    $.ajax({
      url: 'http://localhost:3000/search',
      success: function(data) {
          cakes =  data.slice(0);
          render();
      }
  });
};

//Функция отображает товары на странице, берет данные из json и выводит их на экран
function render(){
  cakes.forEach(element => {
      var cart = document.createElement("div");
      cart.classList.add("cart");
      
      var img = document.createElement("img");
      img.src = "img/shop/" + element.src;
      img.classList.add("title");

      var name = document.createElement("h2");
      name.classList.add("name");
      name.appendChild(document.createTextNode(element.name));

      var desc = document.createElement("p");
      desc.classList.add("description");
      desc.appendChild(document.createTextNode(element.description));

      var price = document.createElement("p");
      price.classList.add("price");
      price.appendChild(document.createTextNode("$" + element.price));

      var button = document.createElement("button");
      button.classList.add("add");
      button.setAttribute("data-id", element.id);
      button.appendChild(document.createTextNode("Add to cart"));

      cart.appendChild(img);
      cart.appendChild(name);
      cart.appendChild(desc);
      cart.appendChild(price);
      cart.appendChild(button);

      document.getElementById("container").appendChild(cart);
        
  });

  itemBox = d.querySelectorAll('.cart'); // блок каждого товара
  // Устанавливаем обработчик события на каждую кнопку "Добавить в корзину"
  for(var i = 0; i < itemBox.length; i++){
    console.log(itemBox[i]);
    addEvent(itemBox[i].querySelector('.add'), 'click', addToCart);
  }
}
// Функция кроссбраузерной установка обработчика событий
function addEvent(elem, type, handler){
  if(elem.addEventListener){
    elem.addEventListener(type, handler, false);
  } else {
    elem.attachEvent('on'+type, function(){ handler.call( elem ); });
  }
  return false;
}
// Получаем данные из LocalStorage
function getCartData(){
  return JSON.parse(localStorage.getItem('cart'));
}
// Записываем данные в LocalStorage
function setCartData(o){
  localStorage.setItem('cart', JSON.stringify(o));
  return false;
}
// Добавляем товар в корзину
function addToCart(e){
  countItems++;
  localStorage.setItem("count-items" , countItems);
  this.disabled = true; // блокируем кнопку на время операции с корзиной
  var cartData = getCartData() || {}, // получаем данные корзины или создаём новый объект, если данных еще нет
      parentBox = this.parentNode, // родительский элемент кнопки "Добавить в корзину"
      itemId = this.getAttribute('data-id'), // ID товара
      itemTitle = parentBox.querySelector('.name').innerHTML, // название товара
      itemPrice = parentBox.querySelector('.price').innerHTML; // стоимость товара
  if(cartData.hasOwnProperty(itemId)){ // если такой товар уже в корзине, то добавляем +1 к его количеству
    cartData[itemId][2] += 1;
  } else { // если товара в корзине еще нет, то добавляем в объект
    cartData[itemId] = [itemTitle, itemPrice, 1];
  }
  
  if(!setCartData(cartData)){ // Обновляем данные в LocalStorage
    this.disabled = false; // разблокируем кнопку после обновления LS
  }
  // console.log(document.getElementById("count-items"));
  document.getElementById("count-items").innerText = localStorage.getItem("count-items");
  
 return false;
}
// // Устанавливаем обработчик события на каждую кнопку "Добавить в корзину"
// Открываем корзину со списком добавленных товаров
function openCart(e){
  var cartData = getCartData(), // вытаскиваем все данные корзины
      totalItems = '';
      var totalCount = 0;
  // если что-то в корзине уже есть, начинаем формировать данные для вывода
  if(cartData !== null){
    totalItems = '<table class="shopping_list"><tr><th>Name</th><th>Price</th><th>Count</th></tr>';
    for(var items in cartData){
      totalItems += '<tr>';
      for(var i = 0; i < cartData[items].length; i++){
        totalItems += '<td>' + cartData[items][i] + '</td>';
      }
      totalCount += Math.round(filterFloat(cartData[items][1].slice(1))) * filterFloat(cartData[items][2]);
      totalItems += '</tr>';
    }
    totalItems += "<tr><td>Total:</td><td>"+ totalCount +"</td><td></td></tr>";
    totalItems += '</table>';
    cartCont.innerHTML = totalItems;
  } else {
    // если в корзине пусто, то сигнализируем об этом
    cartCont.innerHTML = 'Cart is empty';
  }
  return false;
}

//Парсит строку в число с помощью регулярног выражения
var filterFloat = function (value) {
  if(/^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/
    .test(value))
    return Number(value);
return NaN;
}
/* Открыть корзину */
addEvent(d.getElementById('checkout'), 'click', openCart);
/* Очистить корзину */
addEvent(d.getElementById('clear_cart'), 'click', function(e){
  countItems = 0;
  localStorage.setItem("count-items" , countItems);
  document.getElementById("count-items").innerText = countItems;
  localStorage.removeItem('cart');
  cartCont.innerHTML = 'Корзина очишена.';
});