class ProgressBar {
    static PROGRESS_BAR_CLASS = '.progress_bar';

    constructor(element) {
        if (element instanceof String) {
            this.element = document.querySelector(element)
        } else {
            this.element = element;
        }
        this.setup()
    }

    setup() {
        const progressBar = this.getProgressBarElement();
        const level = progressBar.dataset.level;
        if (level) {
            progressBar.style.transition = 'width 0.8s ease';
            progressBar.style.width = `${level}%`;
        }
    }

    getProgressBarElement() {
        if (this.element.classList.contains(ProgressBar.PROGRESS_BAR_CLASS)) {
            return this.element
        }

        return this.element.querySelector(ProgressBar.PROGRESS_BAR_CLASS);
    }

    static multipleProgressBar(elements, classes = false) {
        let progress = elements
        if (classes) {
            progress = document.querySelectorAll(elements)
        }

        for (let element of progress) {
            new ProgressBar(element);
        }
    }

}
