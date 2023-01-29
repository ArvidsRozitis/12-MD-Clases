import { HtmlTagObject } from "html-webpack-plugin";

console.log('Ready for coding');
//------------mainīgie
const images = ['https://picsum.photos/id/237/200/300', 'https://picsum.photos/id/200/200/300', 'https://picsum.photos/id/250/200/300']
//------------mainīgie

//------------rasējums
class ImageCarousel {
    rootElemment: HTMLDivElement;
    prewImageButton: HTMLButtonElement;
    nextImageButton:  HTMLButtonElement;
    images: string[]
    mainImage: HTMLImageElement

    constructor(selector: string, images: string[]) {
        this.rootElemment = document.querySelector(selector);
        this.mainImage = this.rootElemment.querySelector('.js-main-image')
        this.prewImageButton = this.rootElemment.querySelector('.js-prew-image')
        this.nextImageButton = this.rootElemment.querySelector('.js-next-image')
        this.images = images
        
        let currentImageIndex = 0
        this.mainImage.src = this.images[currentImageIndex]
        this.prewImageButton.addEventListener('click', () => {
            if (currentImageIndex === 0){
                currentImageIndex = this.images.length -1;
                this.mainImage.src = this.images[currentImageIndex]
            } else {
                currentImageIndex -=1
                this.mainImage.src = this.images[currentImageIndex]
            }
            console.log(currentImageIndex)
        })
        this.nextImageButton.addEventListener('click', () => {
            if (currentImageIndex === this.images.length-1){
                currentImageIndex = 0
                this.mainImage.src = this.images[currentImageIndex]
            } else {
                currentImageIndex +=1
                this.mainImage.src = this.images[currentImageIndex]
            }
            console.log(currentImageIndex)
        })
    }
}
//------------rasējums

//------------izsaukums
const carousel = new ImageCarousel('.js-image-carousel', images)
console.log(carousel.images)
//------------izsaukums

