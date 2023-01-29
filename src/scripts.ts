

console.log('Ready for coding');
//------------mainīgie
const images = ['https://picsum.photos/id/237/200/300', 'https://picsum.photos/id/200/200/300', 'https://picsum.photos/id/250/200/300']
//------------mainīgie

//------------rasējums1
class ImageCarouselBase {
    rootElemment: HTMLDivElement;
    prewImageButton: HTMLButtonElement;
    nextImageButton:  HTMLButtonElement;
    images: string[]
    mainImage: HTMLImageElement
    currentImageIndex: number

    constructor(selector: string, images: string[]) {
        this.rootElemment = document.querySelector(selector);
        this.mainImage = this.rootElemment.querySelector('.js-main-image')
        this.prewImageButton = this.rootElemment.querySelector('.js-prew-image')
        this.nextImageButton = this.rootElemment.querySelector('.js-next-image')
        this.images = images
        this.currentImageIndex = 0
        
        
        this.mainImage.src = this.images[this.currentImageIndex]
        this.prewImageButton.addEventListener('click', () => {
            if (this.currentImageIndex === 0){
                this.currentImageIndex = this.images.length -1;
                this.mainImage.src = this.images[this.currentImageIndex]
            } else {
                this.currentImageIndex -=1
                this.mainImage.src = this.images[this.currentImageIndex]
            }
            console.log(this.currentImageIndex)
        })
        this.nextImageButton.addEventListener('click', () => {
            if (this.currentImageIndex === this.images.length-1){
                this.currentImageIndex = 0
                this.mainImage.src = this.images[this.currentImageIndex]
            } else {
                this.currentImageIndex +=1
                this.mainImage.src = this.images[this.currentImageIndex]
            }
            console.log(this.currentImageIndex)
        })
    }
}
//------------rasējums1

//------------rasējums2
class ImageCarouselExtended extends ImageCarouselBase {
    dotContainer: HTMLDivElement
    constructor(selector: string, images: string[]) {
        super(selector, images);

        this.dotContainer = this.rootElemment.querySelector('.js-dot-container')
        
        images.forEach((image, i) => {
            const dot = document.createElement('div')
            dot.classList.add('carousel__dot')
            if(i === 0) {
                dot.classList.add('carousel__dot', 'carousel__dot--active')
            }
            this.dotContainer.appendChild(dot)
        })
        this.prewImageButton.addEventListener('click', () => {
            const dots = this.dotContainer.querySelectorAll('.carousel__dot')
            dots.forEach((dot) => {
                dot.classList.remove('carousel__dot--active')
            })
            dots[this.currentImageIndex].classList.add('carousel__dot--active')
        });
        this.nextImageButton.addEventListener('click', () => {
            const dots = this.dotContainer.querySelectorAll('.carousel__dot')
            dots.forEach((dot) => {
                dot.classList.remove('carousel__dot--active')
            })
            dots[this.currentImageIndex].classList.add('carousel__dot--active')
        });
    }
}
//------------rasējums2
class ImageCarouselExtendedExtended extends ImageCarouselExtended {
    constructor(selector: string, images: string[]) {
        super(selector, images);
    }

}
//------------rasējums3


//------------rasējums3

//------------izsaukums
const carousel = new ImageCarouselBase('.js-image-carousel', images);
const carouselExtended = new ImageCarouselExtended('.js-image-carousel-extended', images);
const carouselExtendedExtended = new ImageCarouselExtendedExtended('.js-image-carousel-extended-extended', images);
console.log(carousel.images)
//------------izsaukums

