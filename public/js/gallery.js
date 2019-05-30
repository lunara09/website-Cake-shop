
  //Для отображения фото в оплный размер
  function setBigImage(foto) {
    document.getElementById("bigimg").classList.add("bigimg-show");
    document.getElementById("bigimg").src = foto.src;
    document.getElementsByClassName("gallery-title")[0].classList.toggle("gallery-title-show");
    document.getElementById("close").classList.toggle("close-show");
  }

  // Для закрытия фото
  function closeImage(){
    document.getElementById("bigimg").classList.toggle("bigimg-show");
    document.getElementsByClassName("gallery-title")[0].classList.toggle("gallery-title-show");
    document.getElementById("bigimg").src = null;
    document.getElementById("close").classList.toggle("close-show");
  }