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
    
    // Добавляем класс для мобильных устройств
    const isMobile = window.innerWidth <= 1024;
    if (isMobile) {
        document.body.classList.add('is-mobile');
        // Принудительно отключаем все transition для карточек
        const cards = document.querySelectorAll('.master-card');
        cards.forEach(card => {
            card.style.transition = 'none';
            card.style.webkitTransition = 'none';
        });
    }
    
    // Drag & Drop функциональность
    let isDragging = false;
    let isHorizontalScroll = false;
    let startX, startY;
    let scrollLeft;
    let velocity = 0;
    let lastX;
    let animationFrame;
    let lastTime = 0;

    function startDrag(e) {
        isDragging = true;
        const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
        
        startX = clientX;
        startY = clientY;
        scrollLeft = container.scrollLeft;
        container.style.cursor = 'grabbing';
        container.style.scrollBehavior = 'auto';
        container.style.userSelect = 'none';
        
        // Предотвращаем выделение карточек
        document.body.style.userSelect = 'none';
        
        // На мобильных отключаем все активные состояния
        if (isMobile) {
            document.body.style.webkitTapHighlightColor = 'transparent';
            document.body.style.webkitTouchCallout = 'none';
        }
        
        // Сбрасываем анимацию
        cancelAnimationFrame(animationFrame);
        velocity = 0;
        lastX = clientX;
        lastTime = performance.now();
        
        // Пока не знаем направление скролла
        isHorizontalScroll = false;
    }

    function duringDrag(e) {
        if (!isDragging) return;
        
        const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
        
        // Определяем направление скролла (только при первом движении)
        if (!isHorizontalScroll && !isVerticalScrollDetermined) {
            const deltaX = Math.abs(clientX - startX);
            const deltaY = Math.abs(clientY - startY);
            
            // Если движение больше по горизонтали - это горизонтальный скролл
            if (deltaX > deltaY && deltaX > 5) {
                isHorizontalScroll = true;
                e.preventDefault();
            } else if (deltaY > deltaX && deltaY > 5) {
                // Вертикальный скролл - отпускаем
                isDragging = false;
                container.style.cursor = 'grab';
                container.style.userSelect = 'auto';
                document.body.style.userSelect = 'auto';
                return;
            }
        }
        
        // Если это горизонтальный скролл - обрабатываем
        if (isHorizontalScroll) {
            e.preventDefault();
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
    }

    function endDrag() {
        if (!isDragging) return;
        
        isDragging = false;
        container.style.cursor = 'grab';
        container.style.userSelect = 'auto';
        document.body.style.userSelect = 'auto';
        
        // Восстанавливаем стандартные настройки для мобильных
        if (isMobile) {
            document.body.style.webkitTapHighlightColor = '';
            document.body.style.webkitTouchCallout = '';
        }
        
        // Добавляем инерцию только для горизонтального скролла
        if (isHorizontalScroll && Math.abs(velocity) > 0.1) {
            applyInertia();
        }
        
        // Включаем плавность через небольшой таймаут
        setTimeout(() => {
            container.style.scrollBehavior = 'smooth';
        }, 100);
        
        isHorizontalScroll = false;
        isVerticalScrollDetermined = false;
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

    // Переменная для отслеживания определения направления
    let isVerticalScrollDetermined = false;

    // События для мыши
    container.addEventListener('mousedown', startDrag);
    container.addEventListener('mousemove', duringDrag);
    container.addEventListener('mouseup', endDrag);
    container.addEventListener('mouseleave', endDrag);

    // События для тач-устройств
    container.addEventListener('touchstart', startDrag, { passive: true });
    container.addEventListener('touchmove', duringDrag, { passive: false });
    container.addEventListener('touchend', endDrag, { passive: true });
    container.addEventListener('touchcancel', endDrag, { passive: true });

    // Улучшаем производительность
    container.style.willChange = 'scroll-position';
    container.style.backfaceVisibility = 'hidden';

    // Устанавливаем курсор grab после загрузки
    container.style.cursor = 'grab';

    console.log('✅ Карусель со свободным скроллом готова к работе!');
    console.log('🎮 Управление: перетаскивание мышью / свайп пальцем');
});