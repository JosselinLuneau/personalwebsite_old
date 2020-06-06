document.addEventListener("DOMContentLoaded", () => {
    AOS.init();

    ProgressBar.multipleProgressBar('.progress', true)
    ClipBoardElement.listenAllToCopy('click', '.contact > p', true)
    Slider.init({slider: ".slider-wrapper", duration: 600});
});
