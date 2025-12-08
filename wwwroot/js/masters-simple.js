console.log('🚀 Запуск карусели со свободным скроллом');

document.addEventListener('DOMContentLoaded', function() {
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
    const prevBtn = document.getElementById('mastersPrev');
    const nextBtn = document.getElementById('mastersNext');
    const dotsContainer = document.getElementById('mastersDots');
    
    if (prevBtn) prevBtn.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'none';
    if (dotsContainer) dotsContainer.style.display = 'none';
    
    console.log('🎴 Карусель готова - используйте перетаскивание для скролла');
    const isMobile = window.innerWidth <= 1024;
    if (isMobile) {
        document.body.classList.add('is-mobile');
        const cards = document.querySelectorAll('.master-card');
        cards.forEach(card => {
            card.style.transition = 'none';
            card.style.webkitTransition = 'none';
        });
    }
    
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
        
        document.body.style.userSelect = 'none';
        
        if (isMobile) {
            document.body.style.webkitTapHighlightColor = 'transparent';
            document.body.style.webkitTouchCallout = 'none';
        }
        
        cancelAnimationFrame(animationFrame);
        velocity = 0;
        lastX = clientX;
        lastTime = performance.now();
        
        isHorizontalScroll = false;
    }

    function duringDrag(e) {
        if (!isDragging) return;
        
        const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
        
        if (!isHorizontalScroll && !isVerticalScrollDetermined) {
            const deltaX = Math.abs(clientX - startX);
            const deltaY = Math.abs(clientY - startY);
            
            if (deltaX > deltaY && deltaX > 5) {
                isHorizontalScroll = true;
                e.preventDefault();
            } else if (deltaY > deltaX && deltaY > 5) {
                isDragging = false;
                container.style.cursor = 'grab';
                container.style.userSelect = 'auto';
                document.body.style.userSelect = 'auto';
                return;
            }
        }
        
        if (isHorizontalScroll) {
            e.preventDefault();
            const walk = (clientX - startX) * 1.5;
            container.scrollLeft = scrollLeft - walk;
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
        
        if (isMobile) {
            document.body.style.webkitTapHighlightColor = '';
            document.body.style.webkitTouchCallout = '';
        }
        
        if (isHorizontalScroll && Math.abs(velocity) > 0.1) {
            applyInertia();
        }
        
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

    let isVerticalScrollDetermined = false;

    container.addEventListener('mousedown', startDrag);
    container.addEventListener('mousemove', duringDrag);
    container.addEventListener('mouseup', endDrag);
    container.addEventListener('mouseleave', endDrag);

    container.addEventListener('touchstart', startDrag, { passive: true });
    container.addEventListener('touchmove', duringDrag, { passive: false });
    container.addEventListener('touchend', endDrag, { passive: true });
    container.addEventListener('touchcancel', endDrag, { passive: true });

    container.style.willChange = 'scroll-position';
    container.style.backfaceVisibility = 'hidden';
    container.style.cursor = 'grab';

    console.log('✅ Карусель со свободным скроллом готова к работе!');
    console.log('🎮 Управление: перетаскивание мышью / свайп пальцем');
});