const carousel = document.querySelector(".carousel"),
firstImg = carousel.querySelectorAll("img")[0],
arrowIcons = document.querySelectorAll(".wrapper i");
let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;
const showHideIcons = () => {
    // showing and hiding prev/next icon according to carousel scroll left value
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // getting max scrollable width
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
}
arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14; // getting first img width & adding 14 margin value
        // if clicked icon is left, reduce width value from the carousel scroll left else add to it
        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 60); // calling showHideIcons after 60ms
    });
});
const autoSlide = () => {
    // if there is no image left to scroll then return from here
    if(carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 || carousel.scrollLeft <= 0) return;
    positionDiff = Math.abs(positionDiff); // making positionDiff value to positive
    let firstImgWidth = firstImg.clientWidth + 14;
    // getting difference value that needs to add or reduce from carousel left to take middle img center
    let valDifference = firstImgWidth - positionDiff;
    if(carousel.scrollLeft > prevScrollLeft) { // if user is scrolling to the right
        return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }
    // if user is scrolling to the left
    carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
}
const dragStart = (e) => {
    // updatating global variables value on mouse down event
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
}
const dragging = (e) => {
    // scrolling images/carousel to left according to mouse pointer
    if(!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    carousel.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
}
const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");
    if(!isDragging) return;
    isDragging = false;
    autoSlide();
}
carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);
document.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("touchend", dragStop);



/* scroll */

const anchors = document.querySelectorAll('a[href^="#"]')

for(let anchor of anchors) {
  anchor.addEventListener("click", function(e) {
    e.preventDefault()
    const goto = anchor.hasAttribute('href') ? anchor.getAttribute('href') : 'body'
    document.querySelector(goto).scrollIntoView({
      behavior: "smooth",
      block: "start"
    })
  })
}

/* scroll */


// Получаем ссылку с классом 'bar1'
var link = document.querySelector('.logo__link');

window.addEventListener('scroll', function() {
  // Получаем положение ссылки при каждой прокрутке
  var rect = link.getBoundingClientRect();

  // Выводим координаты в консоль одной строкой
  console.log('Положение: верх - ' + rect.top + ', право - ' + rect.right + ', низ - ' + rect.bottom + ', лево - ' + rect.left);
});

// JavaScript: Скрипт для включения музыки
document.addEventListener('DOMContentLoaded', (event) => {
  // Получаем элементы кнопки и аудио
  var music = document.getElementById('myMusic');
  var button = document.getElementById('toggleMusic');

  // Устанавливаем начальную громкость
  music.volume = 0.03;

  // Функция для включения музыки
  function toggleMusic() {
    if (music.muted) {
      music.muted = false; // Снимаем состояние muted
      music.play();
    } else {
      music.muted = true; // Возвращаем состояние muted
      music.pause();
    }
  }

  // Добавляем обработчик события клика к кнопке
  button.addEventListener('click', toggleMusic);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.nav__link').forEach((link) => {
        if (link.getAttribute('href').replace('#', '') === entry.target.id) {
          link.classList.add('nav__link--active');
        } else {
          link.classList.remove('nav__link--active');
        }
      });
    }
  });
}, {
  threshold: 0.7,
});

document.querySelectorAll('.section').forEach(
  (section) => observer.observe(section),
);


document.addEventListener('DOMContentLoaded', function() {
  var mediaQueryList = window.matchMedia('(max-width: 576px)');
  function handleMediaChange(e) {
    if (e.matches) {
      // Если размер экрана меньше или равен 576px
      var audio = document.getElementById('myMusic');
      audio.muted = false; // Отключить mute
      audio.play().catch(function(error) {
        console.error('Воспроизведение аудио не удалось:', error);
      });
    }
  }
  mediaQueryList.addListener(handleMediaChange);
  handleMediaChange(mediaQueryList); // Вызовите функцию при загрузке страницы
});
