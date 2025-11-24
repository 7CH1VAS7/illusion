// masters-grid.js - сетка с кнопкой "Показать еще"
console.log('🚀 Запуск карусели с сеткой');

document.addEventListener('DOMContentLoaded', function() {
    const showMoreBtn = document.getElementById('showMoreBtn');
    const container = document.getElementById('mastersContainer');
    const hiddenCards = document.querySelectorAll('.master-card.hidden');
    
    console.log('📋 Найдены элементы:', {
        showMoreBtn: !!showMoreBtn,
        container: !!container,
        hiddenCards: hiddenCards.length
    });
    
    if (!showMoreBtn || !container) {
        console.error('❌ Не найдены необходимые элементы');
        return;
    }
    
    let isExpanded = false;
    
    showMoreBtn.addEventListener('click', function() {
        if (!isExpanded) {
            // Показываем все карточки
            hiddenCards.forEach(card => {
                card.classList.remove('hidden');
            });
            container.classList.add('expanded');
            showMoreBtn.textContent = 'СКРЫТЬ';
            isExpanded = true;
            console.log('📖 Показаны все карточки');
        } else {
            // Скрываем дополнительные карточки
            hiddenCards.forEach(card => {
                card.classList.add('hidden');
            });
            container.classList.remove('expanded');
            showMoreBtn.textContent = 'ПОКАЗАТЬ ЕЩЕ';
            isExpanded = false;
            console.log('📕 Скрыты дополнительные карточки');
            
            // Прокрутка к началу секции
            container.scrollIntoView({ behavior: 'smooth' });
        }
    });
    
    console.log('✅ Карусель с сеткой готова к работе!');
    console.log(`🎴 Карточек всего: ${document.querySelectorAll('.master-card').length}`);
    console.log(`🎴 Скрытых карточек: ${hiddenCards.length}`);
});