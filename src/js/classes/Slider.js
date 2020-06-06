class Slider {
    static SLIDE_CLASS = 'slide';
    static SLIDER_CLASS = 'slider';

    lastTouches = undefined;
    slideOffset = 0;
    slideSteps = [];

    hasSlide = false;
    slideNumber = 0;

    constructor(slider, duration) {
        this.sliderWrapper = DOMManager.getElementFromSelector(slider)
        this.slider = this.sliderWrapper.querySelector(`.${Slider.SLIDER_CLASS}`)

        this.setDuration(duration);
        this.setSlideData();
        this.setHasSlide();

        if (!this.hasSlide) {
            this.sliderWrapper.addEventListener('touchmove', this.slide.bind(this))
        }
    }

    static init({slider, duration}) {
        new Slider(slider, duration)
    }

    slide(event) {
        if (this.lastTouches !== undefined && !this.hasSlide) {

            const deltaX = event.touches[0].clientX - this.lastTouches;
            const direction = deltaX/Math.abs(deltaX);
            const canSlide = (this.slideOffset+direction) >= -this.slideNumber
                && (this.slideOffset+direction) <= 0;

            if (canSlide){
                this.setSlideOffset(direction);
                const step = this.getSlideStep(direction);

                this.slider.style.transform = `translateX(${step}%)`;
                this.hasSlide = true;
                setTimeout(function (hasSlide) {
                    this.hasSlide = false
                    this.lastTouches = undefined
                }.bind(this), 500)

                // console.log(canSlide, direction, this.slideOffset, step, `translateX(${step}%)`)
            }

        }

        this.lastTouches = event.touches[0].clientX
    }

    setDuration(duration) {
        if (undefined === duration) {
            duration = 500;
        }

        this.slider.style.transition += `transform ${duration/1000}s ease`;
    }

    setSlideData() {
        const slides = this.slider.querySelectorAll(`.${Slider.SLIDE_CLASS}`);
        this.slideNumber = slides.length
        let contentWidth = 0;
        slides.forEach(function(slide) {
           contentWidth += slide.getBoundingClientRect().width
        })

        const delta = 1 - this.sliderWrapper.getBoundingClientRect().width / (contentWidth);
        this.slideNumber = delta < 0 ? 0 : this.slideNumber;
        this.slideStep =  new Array(this.slideNumber).fill((delta*100));

    }

    setSlideOffset(direction) {
        let offset = this.slideOffset + direction

        if(1 === this.slideNumber || offset > 0) {
            offset = 0
        }else if (offset < -this.slideNumber) {
            offset = this.slideNumber - 1;
        }

        this.slideOffset = offset;
    }

    setHasSlide() {
        return this.sliderWrapper.getBoundingClientRect().width
            < this.slideStep * this.slideNumber;
    }

    getSlideStep(direction) {
        if (1 === this.slideNumber) {
            return direction*this.slideStep[0]
        } else {
            return  this.slideOffset*this.slideStep[Math.abs(this.slideOffset)]
        }
    }
}
