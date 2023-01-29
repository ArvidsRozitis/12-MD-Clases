//Abstrakcijas jātaisa ja paspēšu

console.log('Ready for coding');
//------------mainīgie
const images = [
    'https://picsum.photos/id/237/200/300',
    'https://picsum.photos/id/200/200/300',
    'https://picsum.photos/id/250/200/300',
    'https://picsum.photos/id/242/200/300',
    'https://picsum.photos/id/235/200/300',
    'https://picsum.photos/id/228/200/300',
    'https://picsum.photos/id/225/200/300'
]
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

//------------rasējums3
class ImageCarouselExtendedExtended extends ImageCarouselExtended {
    littleImageContainer: HTMLDivElement
    constructor(selector: string, images: string[]) {
        super(selector, images);
        this.littleImageContainer = this.rootElemment.querySelector('.js-little-img-container');
        

        images.forEach((image, i) => {
            const littleImage = document.createElement('img');
            littleImage.classList.add('little__img');
            littleImage.src = image
            if(i === 0) {
                littleImage.classList.add('little__img--active')
            }
            this.littleImageContainer.appendChild(littleImage);            
        })

        const littleImages = this.littleImageContainer.querySelectorAll('.little__img')
        this.prewImageButton.addEventListener('click', () => {
            littleImages.forEach((image) => {
                image.classList.remove('little__img--active')
            })
            littleImages[this.currentImageIndex].classList.add('little__img--active')
        });

        this.nextImageButton.addEventListener('click', () => {
            const littleImages = this.littleImageContainer.querySelectorAll('.little__img')
            littleImages.forEach((image) => {
                image.classList.remove('little__img--active')
            })
            littleImages[this.currentImageIndex].classList.add('little__img--active')
        });

        littleImages.forEach((image) => {
            image.addEventListener('click', (e) => {
                console.log(image)
                const letKnowIndex = [...littleImages]
                this.mainImage.src = image.getAttribute('src')
                this.currentImageIndex = letKnowIndex.indexOf(image)
                const dots = this.dotContainer.querySelectorAll('.carousel__dot')
                dots.forEach((dot) => {
                    dot.classList.remove('carousel__dot--active')
                })
                dots[this.currentImageIndex].classList.add('carousel__dot--active')

                console.log(letKnowIndex.indexOf(image))
                littleImages.forEach((image) => {
                    image.classList.remove('little__img--active')
                })
                littleImages[this.currentImageIndex].classList.add('little__img--active')
            })
        })
    }
}
//------------rasējums3

//------------rasējums4
class ImageCarouselExtendedExtendedExtended extends ImageCarouselExtendedExtended {
    constructor(selector: string, images: string[]) {
        super(selector, images);

        setInterval(() => {
            if(images.length-1 === this.currentImageIndex) {
                this.currentImageIndex = 0
            } else {
                this.currentImageIndex+=1
            }
            this.mainImage.src = this.images[this.currentImageIndex]
            const dots = this.dotContainer.querySelectorAll('.carousel__dot')
            dots.forEach((dot) => {
                dot.classList.remove('carousel__dot--active')
            })
            dots[this.currentImageIndex].classList.add('carousel__dot--active')
            console.log(this.currentImageIndex)
            const littleImages = this.littleImageContainer.querySelectorAll('.little__img')
            littleImages.forEach((image) => {
                image.classList.remove('little__img--active')
            })
            littleImages[this.currentImageIndex].classList.add('little__img--active')


        },3000)
    }
}
//------------rasējums4


//------------izsaukums
const carousel = new ImageCarouselBase('.js-image-carousel', images);
const carouselExtended = new ImageCarouselExtended('.js-image-carousel-extended', images);
const carouselExtendedExtended = new ImageCarouselExtendedExtended('.js-image-carousel-extended-extended', images);
const carouselExtendedExtendedExtended = new ImageCarouselExtendedExtendedExtended('.js-image-carousel-extended-extended-extended', images);
console.log(carousel.images)
//------------izsaukums

