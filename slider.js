document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".chapter-card.accordion-card");

  cards.forEach((card) => {
    const container = card.querySelector(".slider-container");
    if (!container) return;

    const track = container.querySelector(".slider-track");
    const slides = container.querySelectorAll(".slider-slide");
    const prevBtn = container.querySelector(".slider-prev");
    const nextBtn = container.querySelector(".slider-next");

    let currentIndex = 0;
    const slideCount = slides.length;

    function updateSliderPosition() {
      const wrapper = container.querySelector(".slider-wrapper");
      const slideWidth = wrapper?.clientWidth || 0;
      track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }

    function goPrev(e) {
      if (e) e.stopPropagation();
      currentIndex = (currentIndex - 1 + slideCount) % slideCount;
      updateSliderPosition();
    }

    function goNext(e) {
      if (e) e.stopPropagation();
      currentIndex = (currentIndex + 1) % slideCount;
      updateSliderPosition();
    }

    prevBtn?.addEventListener("click", goPrev);
    nextBtn?.addEventListener("click", goNext);

    container.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") goPrev(event);
      if (event.key === "ArrowRight") goNext(event);
    });

    window.addEventListener("resize", () => requestAnimationFrame(updateSliderPosition));
    window.addEventListener("orientationchange", () => requestAnimationFrame(updateSliderPosition));

    updateSliderPosition();
  });
});
