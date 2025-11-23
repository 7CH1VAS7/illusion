class BurgerMenu {
    constructor() {
        this.burgerMenu = document.getElementById('burgerMenu');
        this.navLinks = document.getElementById('navLinks');
        this.menuOverlay = this.createOverlay();
        
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
        
        // Закрытие меню при клике на ссылку
        this.navLinks.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                this.closeMenu();
            }
        });
        
        // Закрытие меню при клике на оверлей
        this.menuOverlay.addEventListener('click', () => {
            this.closeMenu();
        });
        
        // Закрытие меню при изменении размера окна
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                this.closeMenu();
            }
        });
        
        // Закрытие меню при нажатии Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.navLinks.classList.contains('active')) {
                this.closeMenu();
            }
        });
    }
    
    toggleMenu() {
        this.navLinks.classList.toggle('active');
        this.burgerMenu.classList.toggle('active');
        this.menuOverlay.classList.toggle('active');
        
        // Блокировка скролла тела когда меню открыто
        document.body.style.overflow = this.navLinks.classList.contains('active') ? 'hidden' : '';
    }
    
    openMenu() {
        this.navLinks.classList.add('active');
        this.burgerMenu.classList.add('active');
        this.menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    closeMenu() {
        this.navLinks.classList.remove('active');
        this.burgerMenu.classList.remove('active');
        this.menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Инициализация когда DOM загружен
document.addEventListener('DOMContentLoaded', () => {
    new BurgerMenu();
});