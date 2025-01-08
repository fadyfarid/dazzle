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

window.addEventListener('scroll', () => { const ourStory = document.querySelector('.ourstory'); const rect = ourStory.getBoundingClientRect(); if (rect.top >= 0 && rect.bottom <= window.innerHeight) { ourStory.classList.add('trigger-slide'); } else { ourStory.classList.remove('trigger-slide'); } });

const videos = document.querySelectorAll('.video');
let currentIndex = 0;

document.getElementById('prev').addEventListener('click', () => {
  currentIndex = (currentIndex === 0) ? videos.length - 1 : currentIndex - 1;
  updateVideoVisibility();
  playCurrentVideo();
});

document.getElementById('next').addEventListener('click', () => {
  currentIndex = (currentIndex === videos.length - 1) ? 0 : currentIndex + 1;
  updateVideoVisibility();
  playCurrentVideo();
});

function updateVideoVisibility() {
  videos.forEach((video, index) => {
    video.parentElement.parentElement.style.display = (index === currentIndex) ? 'block' : 'none';
    video.pause(); // Pause all videos
    video.currentTime = 0; // Reset video to start
  });
}

function playCurrentVideo() {
  videos[currentIndex].play();
}

// Initially display and play the first video
updateVideoVisibility();
playCurrentVideo();

// Add event listener for when the video ends
videos.forEach((video, index) => {
  video.addEventListener('ended', () => {
    currentIndex = (currentIndex === videos.length - 1) ? 0 : currentIndex + 1;
    updateVideoVisibility();
    playCurrentVideo();
  });
});

const menuToggle = document.querySelector('.menu-toggle');
const navUl = document.querySelector('nav ul');

menuToggle.addEventListener('click', () => {
  navUl.classList.toggle('show');
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('nav')) {
    navUl.classList.remove('show');
  }
});
