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

        this.handlePrew()
        this.handleNext()
    }

    handlePrew() {
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
    }

    handleNext() {
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
    dot: HTMLDivElement
    constructor(selector: string, images: string[]) {
        super(selector, images);

        this.dotContainer = this.rootElemment.querySelector('.js-dot-container')
        this.dot = document.createElement('div')
        this.drawAllDots()
        this.colorPrewDot()
        this.colorNextDot()
    }
    drawAllDots(){
        images.forEach((image, i) => {
            const dot = document.createElement('div')
            dot.classList.add('carousel__dot')
            if(i === 0) {
                dot.classList.add('carousel__dot', 'carousel__dot--active')
            }
            this.dotContainer.appendChild(dot)
        })
    }
    colorPrewDot(){
        this.prewImageButton.addEventListener('click', () => {
            const dots = this.dotContainer.querySelectorAll('.carousel__dot')
            this.handleDotClases()
            dots[this.currentImageIndex].classList.add('carousel__dot--active')
        });

    }
    colorNextDot(){
        this.nextImageButton.addEventListener('click', () => {
            this.handleDotClases()
        });
    }
    handleDotClases(){
        const dots = this.dotContainer.querySelectorAll('.carousel__dot')
        dots.forEach((dot) => {
            dot.classList.remove('carousel__dot--active')
        })
        dots[this.currentImageIndex].classList.add('carousel__dot--active')
    }
}
//------------rasējums2

//------------rasējums3
class ImageCarouselExtendedExtended extends ImageCarouselExtended {
    littleImageContainer: HTMLDivElement
    littleImage: HTMLImageElement
    littleImages: NodeListOf<Element>
    constructor(selector: string, images: string[]) {
        super(selector, images);
        this.littleImageContainer = this.rootElemment.querySelector('.js-little-img-container');
        this.littleImage = document.createElement('img');
        this.littleImages =this.littleImageContainer.querySelectorAll('.little__img')
        
        this.addLittleImages()
        this.prewLittleImgActive()
        this.nextLittleImgActive()
        this.handleClickOnLittleImage()        
    }
    addLittleImages(){
        images.forEach((image, i) => {
            this.littleImage = document.createElement('img');
            this.littleImage.classList.add('little__img');
            this.littleImage.src = image
            if(i === 0) {
                this.littleImage.classList.add('little__img--active')
            }
            this.littleImageContainer.appendChild(this.littleImage);            
        })
    }
    prewLittleImgActive(){
        
        this.prewImageButton.addEventListener('click', () => {
            this.littleImages.forEach((image) => {
                image.classList.remove('little__img--active')
            })
            this.littleImages[this.currentImageIndex].classList.add('little__img--active')
        });
    }
    nextLittleImgActive(){
        this.nextImageButton.addEventListener('click', () => {
            this.littleImages.forEach((image) => {
                image.classList.remove('little__img--active')
            })
            this.littleImages[this.currentImageIndex].classList.add('little__img--active')
        });
    }
    handleClickOnLittleImage() {
        const littleImages = this.littleImageContainer.querySelectorAll('.little__img')
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
    isPaused: boolean
    littleImages: NodeListOf<Element>
    modal: HTMLDivElement
    modalImage: HTMLImageElement

    constructor(selector: string, images: string[]) {
        super(selector, images);

        this.modal = this.rootElemment.querySelector('.js-modal');
        this.modalImage = this.rootElemment.querySelector('.js-modal-image');
        this.isPaused = false
        this.littleImages = this.littleImageContainer.querySelectorAll('.little__img')
        setInterval(() => {
            if(!this.isPaused) {
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
                this.littleImages.forEach((image) => {
                    image.classList.remove('little__img--active')
                })
                this.littleImages[this.currentImageIndex].classList.add('little__img--active')

                this.mainImage.addEventListener('click', () => {
                    this.isPaused = true;
                    console.log('images on pause')
                    this.modal.classList.add('modal--visable');
                    this.modalImage.src = this.images[this.currentImageIndex]                     
                })

                const closeModalMark: HTMLSpanElement = this.rootElemment.querySelector('.js-close-modal'); 
                closeModalMark.addEventListener('click', () =>{ 
                    this.modal.classList.remove('modal--visable');
                    this.isPaused = false;
                })

                this.pauseOnLittleImageClick()
                this.pauseOnPreviousImageButton()
                this.pauseOnNextImageButton()                
            }        
        }, 2000)
    }
    pauseOnPreviousImageButton() {
        this.prewImageButton.addEventListener('click', () => {
            this.isPaused = true;
            console.log('images on pause')
            setTimeout(() => {
                this.isPaused = false;
                console.log('enough back to work');                                                
            }, 3000);  
        })
    }
    pauseOnNextImageButton() {
        this.nextImageButton.addEventListener('click', () => {
            this.isPaused = true;
            console.log('images on pause')
            setTimeout(() => {
                this.isPaused = false;
                console.log('enough back to work');                                                
            }, 3000);   
        })
    }
    pauseOnLittleImageClick() {
        this.littleImages.forEach((image) => {
            image.addEventListener('click', () => {
                this.isPaused = true;
                console.log('images on pause')
                setTimeout(() => {
                    this.isPaused = false;
                    console.log('enough back to work');                                                
                }, 2000);      
            })
        })
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

