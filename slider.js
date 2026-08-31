document.addEventListener('DOMContentLoaded', function() {
    // ===== SLIDER LOGIC =====
    const sliderContainers = document.querySelectorAll('.slider-container');

    sliderContainers.forEach(function(container) {
        const track = container.querySelector('.slider-track');
        const slides = container.querySelectorAll('.slider-slide');
        const prevButton = container.querySelector('.slider-prev');
        const nextButton = container.querySelector('.slider-next');

        let currentIndex = 0;
        const slideCount = slides.length;

        function updateSliderPosition() {
            const offset = -currentIndex * 100;
            track.style.transform = `translateX(${offset}%)`;
        }

        prevButton.addEventListener('click', function(e) {
            e.stopPropagation();
            currentIndex = (currentIndex - 1 + slideCount) % slideCount;
            updateSliderPosition();
        });

        nextButton.addEventListener('click', function(e) {
            e.stopPropagation();
            currentIndex = (currentIndex + 1) % slideCount;
            updateSliderPosition();
        });

        container.addEventListener('keydown', function(event) {
            if (event.key === 'ArrowLeft') {
                prevButton.click();
            } else if (event.key === 'ArrowRight') {
                nextButton.click();
            }
        });
    });

    // ===== ACCORDION TOGGLE LOGIC (Mobile) =====
    const accordionCards = document.querySelectorAll('.chapter-card.accordion-card');

    accordionCards.forEach(function(card) {
        card.addEventListener('click', function(e) {
            // Non attivare se clicca su bottone slider
            if (e.target.closest('.slider-arrow')) {
                return;
            }

            // Toggle la classe active
            card.classList.toggle('active');
        });
    });
});
