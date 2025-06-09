// Автоматическое управление версиями для избежания кеширования CSS
(function() {
    // Функция для обновления версий CSS файлов
    function updateCSSVersions() {
        const cssLinks = document.querySelectorAll('link[rel="stylesheet"]');
        const timestamp = Date.now();
        
        cssLinks.forEach(link => {
            const href = link.getAttribute('href');
            
            // Проверяем, есть ли уже версия в URL
            if (href && href.includes('.css')) {
                // Удаляем старую версию если есть
                const baseUrl = href.split('?')[0];
                
                // Добавляем новую версию с timestamp
                link.setAttribute('href', `${baseUrl}?v=${timestamp}`);
            }
        });
    }
    
    // Функция для принудительного обновления CSS в режиме разработки
    function forceReloadCSS() {
        const cssLinks = document.querySelectorAll('link[rel="stylesheet"]');
        
        cssLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.includes('.css')) {
                const baseUrl = href.split('?')[0];
                const newTimestamp = Date.now();
                
                // Создаем новый элемент link
                const newLink = document.createElement('link');
                newLink.rel = 'stylesheet';
                newLink.href = `${baseUrl}?v=${newTimestamp}`;
                
                // Заменяем старый элемент
                link.parentNode.insertBefore(newLink, link.nextSibling);
                link.remove();
            }
        });
    }
    
    // Проверяем, находимся ли в режиме разработки
    function isDevelopmentMode() {
        return window.location.hostname === 'localhost' || 
               window.location.hostname === '127.0.0.1' ||
               window.location.hostname === '' ||
               window.location.protocol === 'file:';
    }
    
    // Функция для проверки обновлений (для продакшена)
    function checkForUpdates() {
        // Проверяем localStorage на наличие последней версии
        const lastVersion = localStorage.getItem('css-version');
        const currentVersion = '20250609.2119'; // Обновляйте эту версию при изменениях CSS
        
        if (lastVersion !== currentVersion) {
            // Обновляем версии CSS файлов
            updateCSSVersions();
            
            // Сохраняем новую версию
            localStorage.setItem('css-version', currentVersion);
            
            console.log('CSS files updated to version:', currentVersion);
        }
    }
    
    // Инициализация при загрузке страницы
    document.addEventListener('DOMContentLoaded', function() {
        if (isDevelopmentMode()) {
            // В режиме разработки всегда обновляем CSS
            console.log('Development mode: Force reloading CSS files');
            forceReloadCSS();
            
            // Опционально: автоматическое обновление каждые 30 секунд в dev режиме
            // setInterval(forceReloadCSS, 30000);
        } else {
            // В продакшене проверяем версии
            checkForUpdates();
        }
    });
    
    // Глобальная функция для ручного обновления CSS (для отладки)
    window.reloadCSS = forceReloadCSS;
    
})(); 