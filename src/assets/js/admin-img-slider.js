
/* ====== IMAGE SLIDER IMAGES ======= */
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var height =  window.innerHeight-120;
    var slider_container = document.getElementsByClassName("slideshow-container");
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
        slideIndex = 1
    }    
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  
  //slider_container[0].style.minHeight = height+"px";  
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}
/* ====== //IMAGE SLIDER IMAGES ======= */

