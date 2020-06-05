document.addEventListener("DOMContentLoaded", () => {
    AOS.init();

    ProgressBar.multipleProgressBar('.progress', true)
    ClipBoardElement.listenAllToCopy('click', '.contact > p', true)
});
