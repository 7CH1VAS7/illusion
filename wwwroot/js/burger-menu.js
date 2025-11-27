class BurgerMenu {
    constructor() {
        this.burgerMenu = document.getElementById('burgerMenu');
        this.navLinks = document.getElementById('navLinks');
        this.menuOverlay = this.createOverlay();
        
        // Флаг для отслеживания состояния меню
        this.isMenuOpen = false;
        
        this.init();
    }
    
    createOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'menu-overlay';
        document.body.appendChild(overlay);
        return overlay;
    }
    
    init() {
        // Обработчик клика по бургеру
        this.burgerMenu.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleMenu();
        });
        
        // Предотвращаем закрытие при клике внутри меню
        this.navLinks.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Закрытие меню при клике на ссылку
            if (e.target.tagName === 'A') {
                this.closeMenu();
            }
        });
        
        // Закрытие меню при клике на оверлей
        this.menuOverlay.addEventListener('click', () => {
            this.closeMenu();
        });
        
        // Закрытие меню при клике в любом месте документа
        document.addEventListener('click', (e) => {
            if (this.isMenuOpen && !this.navLinks.contains(e.target) && !this.burgerMenu.contains(e.target)) {
                this.closeMenu();
            }
        });
        
        // Закрытие меню при изменении размера окна
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                this.closeMenu();
            }
        });
        
        // Закрытие меню при нажатии Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.closeMenu();
            }
        });
    }
    
    toggleMenu() {
        if (this.navLinks.classList.contains('active')) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }
    
    openMenu() {
        this.navLinks.classList.add('active');
        this.burgerMenu.classList.add('active');
        this.menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.isMenuOpen = true;
    }
    
    closeMenu() {
        this.navLinks.classList.remove('active');
        this.burgerMenu.classList.remove('active');
        this.menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
        this.isMenuOpen = false;
    }
}

// Инициализация когда DOM загружен
document.addEventListener('DOMContentLoaded', () => {
    new BurgerMenu();
});