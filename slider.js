document.addEventListener('DOMContentLoaded', function() {
    // Seleziona tutti gli slider
    const sliderContainers = document.querySelectorAll('.slider-container');

    sliderContainers.forEach(function(container) {
        const track = container.querySelector('.slider-track');
        const slides = container.querySelectorAll('.slider-slide');
        const prevButton = container.querySelector('.slider-prev');
        const nextButton = container.querySelector('.slider-next');

        let currentIndex = 0;
        const slideCount = slides.length;

        // Funzione per aggiornare la posizione dello slider
        function updateSliderPosition() {
            const offset = -currentIndex * 100;
            track.style.transform = `translateX(${offset}%)`;
        }

        // Freccia sinistra - vai all'immagine precedente
        prevButton.addEventListener('click', function() {
            currentIndex = (currentIndex - 1 + slideCount) % slideCount;
            updateSliderPosition();
        });

        // Freccia destra - vai all'immagine successiva
        nextButton.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % slideCount;
            updateSliderPosition();
        });

        // Navigazione con tastiera (frecce sinistra/destra)
        container.addEventListener('keydown', function(event) {
            if (event.key === 'ArrowLeft') {
                prevButton.click();
            } else if (event.key === 'ArrowRight') {
                nextButton.click();
            }
        });
    });
});