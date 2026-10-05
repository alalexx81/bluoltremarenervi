document.addEventListener("DOMContentLoaded", () => {
  const isTouchDevice = () =>
    window.matchMedia("(hover: none) and (pointer: coarse)").matches;

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

    function scrollCardToCenter() {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.top + window.scrollY + rect.height / 2;
      const targetY = cardCenter - window.innerHeight / 2;

      window.scrollTo({
        top: Math.max(0, targetY),
        behavior: "smooth",
      });
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

    card.addEventListener("click", (e) => {
      if (e.target.closest(".slider-arrow")) return;
      if (!isTouchDevice()) return;
      e.preventDefault();
      e.stopPropagation();
    });

    card.addEventListener(
      "touchend",
      (e) => {
        if (e.target.closest(".slider-arrow")) return;
        if (!isTouchDevice()) return;
        e.preventDefault();
        e.stopPropagation();
      },
      { passive: false }
    );

    window.addEventListener("resize", () =>
      requestAnimationFrame(updateSliderPosition)
    );
    window.addEventListener("orientationchange", () =>
      requestAnimationFrame(updateSliderPosition)
    );

    updateSliderPosition();
  });
});
