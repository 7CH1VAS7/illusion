class Gallery {
    constructor() {
        this.track = document.getElementById('galleryTrack');
        this.slides = document.querySelectorAll('.gallery-slide');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.dotsContainer = document.getElementById('galleryDots');
        
        this.currentSlide = 0;
        this.slideCount = this.slides.length;
        
        this.init();
    }
    
    init() {
        if (!this.track || this.slideCount === 0) {
            console.warn('Галерея не найдена или нет слайдов');
            return;
        }
        
        this.createDots();
        
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        this.handleImageErrors();
        
        this.startAutoSlide();
        
        console.log('Галерея инициализирована, слайдов:', this.slideCount);
    }
    
    createDots() {
        this.dots = [];
        this.dotsContainer.innerHTML = '';
        const maxDots = Math.min(this.slideCount, 10);
        
        for (let i = 0; i < maxDots; i++) {
            const dot = document.createElement('div');
            dot.className = 'dot';
            if (i === 0) dot.classList.add('active');
            this.dotsContainer.appendChild(dot);
            this.dots.push(dot);
        }
    }
    
    handleImageErrors() {
        this.slides.forEach((slide, index) => {
            const img = slide.querySelector('img');
            if (img) {
                img.onerror = () => {
                    console.warn(`Ошибка загрузки изображения: ${img.src}`);
                    img.style.display = 'none';
                    const placeholder = document.createElement('div');
                    placeholder.className = 'image-placeholder';
                    placeholder.textContent = `Фото ${index + 1}`;
                    slide.appendChild(placeholder);
                };
            }
        });
    }
    
    goToSlide(slideIndex) {
        this.currentSlide = slideIndex;
        this.updateGallery();
    }
    
    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.slideCount;
        this.updateGallery();
    }
    
    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.slideCount) % this.slideCount;
        this.updateGallery();
    }
    
    updateGallery() {
        this.track.style.transform = `translateX(-${this.currentSlide * 100}%)`;
        const dotIndex = Math.floor(this.currentSlide / Math.ceil(this.slideCount / this.dots.length));
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === dotIndex);
        });
    }
    
    startAutoSlide() {
        this.autoSlideInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }
    
    stopAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Gallery();
});