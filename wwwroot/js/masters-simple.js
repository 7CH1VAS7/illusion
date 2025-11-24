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
    
    // Drag & Drop функциональность для десктопа
    let isDragging = false;
    let startX;
    let scrollLeft;
    
    function startDrag(e) {
        isDragging = true;
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
        container.style.cursor = 'grabbing';
        container.style.scrollBehavior = 'auto'; // Отключаем плавность при перетаскивании
    }
    
    function duringDrag(e) {
        if (!isDragging) return;
        
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2; // Умножаем для более быстрого скролла
        container.scrollLeft = scrollLeft - walk;
    }
    
    function endDrag() {
        isDragging = false;
        container.style.cursor = 'grab';
        container.style.scrollBehavior = 'smooth'; // Включаем плавность обратно
    }
    
    // События для мыши
    container.addEventListener('mousedown', startDrag);
    container.addEventListener('mousemove', duringDrag);
    container.addEventListener('mouseup', endDrag);
    container.addEventListener('mouseleave', endDrag);
    
    // События для тач-устройств
    container.addEventListener('touchstart', (e) => {
        startDrag({
            pageX: e.touches[0].pageX,
            offsetLeft: container.offsetLeft
        });
    });
    
    container.addEventListener('touchmove', (e) => {
        duringDrag({
            pageX: e.touches[0].pageX,
            offsetLeft: container.offsetLeft
        });
    });
    
    container.addEventListener('touchend', endDrag);
    
    // Устанавливаем курсор grab после загрузки
    container.style.cursor = 'grab';
    
    console.log('✅ Карусель со свободным скроллом готова к работе!');
    console.log('🎮 Управление: перетаскивание мышью / свайп пальцем');
});