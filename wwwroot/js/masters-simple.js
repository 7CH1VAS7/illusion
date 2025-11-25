// masters-scroll.js - чистый скролл без точек
console.log('🚀 Запуск карусели со свободным скроллом');

document.addEventListener('DOMContentLoaded', function() {
    // Элементы
    const container = document.querySelector('.carousel-container');
    const track = document.getElementById('mastersTrack');
    
    console.log('📋 Найдены элементы:', {
        container: !!container,
        track: !!track
    });
    
    if (!container || !track) {
        console.error('❌ Не найдены элементы карусели');
        return;
    }
    
    // Скрываем кнопки навигации и точки
    const prevBtn = document.getElementById('mastersPrev');
    const nextBtn = document.getElementById('mastersNext');
    const dotsContainer = document.getElementById('mastersDots');
    
    if (prevBtn) prevBtn.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'none';
    if (dotsContainer) dotsContainer.style.display = 'none';
    
    console.log('🎴 Карусель готова - используйте перетаскивание для скролла');
    
    // Отключаем ховер-эффекты на мобильных
    const isMobile = window.innerWidth <= 1024;
    if (isMobile) {
        document.body.classList.add('mobile-device');
    }
    
    // Drag & Drop функциональность
    let isDragging = false;
    let startX;
    let scrollLeft;
    let velocity = 0;
    let lastX;
    let animationFrame;
    let lastTime = 0;

    function startDrag(e) {
        isDragging = true;
        const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        startX = clientX;
        scrollLeft = container.scrollLeft;
        container.style.cursor = 'grabbing';
        container.style.scrollBehavior = 'auto';
        container.style.userSelect = 'none';
        
        // Предотвращаем выделение карточек
        document.body.style.userSelect = 'none';
        
        // Сбрасываем анимацию
        cancelAnimationFrame(animationFrame);
        velocity = 0;
        lastX = clientX;
        lastTime = performance.now();
    }

    function duringDrag(e) {
        if (!isDragging) return;
        
        e.preventDefault();
        const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        const walk = (clientX - startX) * 1.5;
        container.scrollLeft = scrollLeft - walk;
        
        // Рассчитываем скорость для инерции
        const currentTime = performance.now();
        const deltaTime = currentTime - lastTime;
        if (deltaTime > 0) {
            velocity = (lastX - clientX) / deltaTime;
            lastX = clientX;
            lastTime = currentTime;
        }
    }

    function endDrag() {
        if (!isDragging) return;
        
        isDragging = false;
        container.style.cursor = 'grab';
        container.style.userSelect = 'auto';
        document.body.style.userSelect = 'auto'; // Восстанавливаем выделение
        
        // Добавляем инерцию
        if (Math.abs(velocity) > 0.1) {
            applyInertia();
        }
        
        // Включаем плавность через небольшой таймаут
        setTimeout(() => {
            container.style.scrollBehavior = 'smooth';
        }, 100);
    }

    function applyInertia() {
        const friction = 0.92;
        const minVelocity = 0.1;
        
        function animate() {
            if (Math.abs(velocity) < minVelocity || isDragging) {
                return;
            }
            
            container.scrollLeft += velocity * 20;
            velocity *= friction;
            
            animationFrame = requestAnimationFrame(animate);
        }
        
        animate();
    }

    // События для мыши
    container.addEventListener('mousedown', startDrag);
    container.addEventListener('mousemove', duringDrag);
    container.addEventListener('mouseup', endDrag);
    container.addEventListener('mouseleave', endDrag);

    // События для тач-устройств
    container.addEventListener('touchstart', startDrag, { passive: false });
    container.addEventListener('touchmove', duringDrag, { passive: false });
    container.addEventListener('touchend', endDrag, { passive: false });
    container.addEventListener('touchcancel', endDrag, { passive: false });

    // Предотвращаем вертикальный скролл при горизонтальном перетаскивании
    container.addEventListener('touchmove', function(e) {
        if (isDragging) {
            e.preventDefault();
        }
    }, { passive: false });

    // Улучшаем производительность
    container.style.willChange = 'scroll-position';
    container.style.backfaceVisibility = 'hidden';

    // Устанавливаем курсор grab после загрузки
    container.style.cursor = 'grab';

    console.log('✅ Карусель со свободным скроллом готова к работе!');
    console.log('🎮 Управление: перетаскивание мышью / свайп пальцем');
});