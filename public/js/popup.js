document.querySelector(".shop-cart").addEventListener("click", ShowPopup);
// При нажатии на значок корзины открывается всплывающее окно с товарами
function ShowPopup(e){
    var popup = document.getElementById("popup");
    popup.classList.toggle("show-popup");
    openCart(e)
}