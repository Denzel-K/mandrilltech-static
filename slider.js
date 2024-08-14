
const slides = document.querySelectorAll('.slide_item');
const backButton = document.getElementById('back');
const forwardButton = document.getElementById('foward');
let currentIndex = 0;

function showSlide(index) {
  // Hide all slides and remove the active class
  slides.forEach(slide => {
    slide.classList.add('hidden_slide');
    slide.classList.remove('active');
  });

  // Show the current slide and add the active class
  slides[index].classList.remove('hidden_slide');
  slides[index].classList.add('active');
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length; // Move to the next slide
  showSlide(currentIndex);
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length; // Move to the previous slide
  showSlide(currentIndex);
}

forwardButton.addEventListener('click', nextSlide);
backButton.addEventListener('click', prevSlide);

// Automatic sliding
setInterval(nextSlide, 6000); // Slide every 5 seconds

// Initially show the first slide
showSlide(currentIndex);


const moreButtons = document.querySelectorAll('.more-btn');