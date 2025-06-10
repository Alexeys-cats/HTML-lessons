const escapeHTML = (str) => {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
};

let htmlData = [];
let cssData = {};
let quizData = [];
let allData = [];

async function loadAllData() {
    try {
        const [htmlResponse, cssResponse, quizResponse] = await Promise.all([
            await fetch("../assets/json/data-html.json"),
            await fetch("../assets/json/data-css.json"),
            await fetch("../assets/json/data-quiz.json")
        ]);

        if (!htmlResponse.ok || !cssResponse.ok || !quizResponse.ok) {
            throw new Error('Не удалось загрузить один или несколько JSON файлов');
        }

        htmlData = await htmlResponse.json();
        cssData = await cssResponse.json();
        quizData = await quizResponse.json();

        prepareSearchData();
        
        console.log('Все данные загружены успешно');
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
    }
}

function prepareSearchData() {
    allData = [];

    htmlData.forEach(item => {
        allData.push({
            type: 'html',
            name: item.name,
            title: `HTML тег &lt;${item.name}&gt;`,
            description: item.description,
            example: item.example,
            start: item.start,
            end: item.end,
            searchText: `${item.name} ${item.description} ${item.example}`.toLowerCase()
        });
    });

    Object.keys(cssData).forEach(property => {
        const item = cssData[property];
        allData.push({
            type: 'css',
            name: property,
            title: `CSS свойство ${property}`,
            description: `Начальное значение: ${item.initial}`,
            values: item.values ? item.values.join(', ') : '',
            syntax: item.syntax,
            webkit: item.webkit,
            moz: item.moz,
            searchText: `${property} ${item.initial} ${item.values ? item.values.join(' ') : ''} css`.toLowerCase()
        });
    });

    // quizData.forEach((item, index) => {
    //     allData.push({
    //         type: 'quiz',
    //         name: `Вопрос ${index + 1}`,
    //         title: item.question,
    //         description: item.explanation,
    //         theme: item.theme,
    //         options: item.options,
    //         correctAnswer: item.correctAnswer,
    //         searchText: `${item.question} ${item.explanation} ${item.theme} ${item.options.join(' ')}`.toLowerCase()
    //     });
    // });
}

function performSearch(query) {
    if (!query.trim()) {
        return [];
    }

    const searchTerm = query.toLowerCase().trim();
    const results = allData.filter(item => 
        item.searchText.includes(searchTerm)
    );

    return results.sort((a, b) => {
        const aIndex = a.searchText.indexOf(searchTerm);
        const bIndex = b.searchText.indexOf(searchTerm);
        
        if (a.name.toLowerCase().includes(searchTerm) && !b.name.toLowerCase().includes(searchTerm)) {
            return -1;
        }
        if (b.name.toLowerCase().includes(searchTerm) && !a.name.toLowerCase().includes(searchTerm)) {
            return 1;
        }
        
        return aIndex - bIndex;
    });
}

function displayResults(results) {
    const container = document.getElementById('search-results');
    if (!container) return;

    if (results.length === 0) {
        container.innerHTML = '<div class="no-results">Результаты не найдены</div>';
        return;
    }

    container.innerHTML = results.map(item => {
        switch (item.type) {
            case 'html':
                return `
                    <div class="search-result html-result">
                        <div class="result-header">
                            <span class="result-type html-type">HTML</span>
                            <h3>${item.title}</h3>
                        </div>
                        <p class="result-description">${escapeHTML(item.description)}</p>
                        <div class="result-example">
                            <strong>Пример:</strong>
                            <code>${escapeHTML(item.example)}</code>
                        </div>
                        ${item.start && item.end ? 
                            `<div class="result-tags">
                                <span class="tag-info">Открывающий: <code>${escapeHTML(item.start)}</code></span>
                                <span class="tag-info">Закрывающий: <code>${escapeHTML(item.end)}</code></span>
                            </div>` : 
                            `<div class="result-tags">
                                <span class="tag-info">Одиночный тег: <code>${escapeHTML(item.start)}</code></span>
                            </div>`
                        }
                    </div>
                `;
            
            case 'css':
                return `
                    <div class="search-result css-result">
                        <div class="result-header">
                            <span class="result-type css-type">CSS</span>
                            <h3>${item.title}</h3>
                        </div>
                        <p class="result-description">${escapeHTML(item.description)}</p>
                        ${item.values ? `<div class="css-values"><strong>Возможные значения:</strong> ${item.values}</div>` : ''}
                        ${item.syntax ? `<div class="css-syntax"><strong>Синтаксис:</strong> <code>${escapeHTML(item.syntax)}</code></div>` : ''}
                        <div class="css-support">
                            <span class="support-info">WebKit: ${item.webkit ? '✅' : '❌'}</span>
                            <span class="support-info">Mozilla: ${item.moz ? '✅' : '❌'}</span>
                        </div>
                    </div>
                `;
            
            case 'quiz':
                return `
                    <div class="search-result quiz-result">
                        <div class="result-header">
                            <span class="result-type quiz-type">${item.theme?.toUpperCase() || 'QUIZ'}</span>
                            <h3>${escapeHTML(item.title)}</h3>
                        </div>
                        <p class="result-description">${escapeHTML(item.description)}</p>
                        <div class="quiz-options">
                            <strong>Варианты ответов:</strong>
                            <ul>
                                ${item.options.map((option, index) => 
                                    `<li class="${index === item.correctAnswer ? 'correct-answer' : ''}">${escapeHTML(option)}</li>`
                                ).join('')}
                            </ul>
                        </div>
                    </div>
                `;
            
            default:
                return '';
        }
    }).join('');
}

function handleSearch() {
    const input = document.getElementById('search-input');
    const query = input?.value || '';
    
    if (query.trim() === '') {
        document.getElementById('search-results').innerHTML = '';
        return;
    }

    const results = performSearch(query);
    displayResults(results);
}

function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

function createSearchInterface(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = `
        <div class="search">
          <input
            type="text" id="search-input" placeholder="Поиск по тегам, стилям или скриптам..."/>
        </div>
        
        <div class="filters-compact" id="filters-compact">
          <div class="filter-block" data-filter="content">
            <div class="filter-title">📂 Контент</div>
            <div class="filter-dropdown">
              <label><input type="checkbox" id="filter-html" checked> HTML теги</label>
              <label><input type="checkbox" id="filter-css" checked> CSS свойства</label>
              <label><input type="checkbox" id="filter-quiz" checked> Вопросы викторины</label>
            </div>
          </div>
          
          <div class="filter-block" data-filter="fields">
            <div class="filter-title">🔍 Поиск в</div>
            <div class="filter-dropdown">
              <label><input type="checkbox" id="search-name" checked> Названия</label>
              <label><input type="checkbox" id="search-description" checked> Описания</label>
              <label><input type="checkbox" id="search-examples" checked> Примеры</label>
              <label><input type="checkbox" id="search-values" checked> Значения</label>
            </div>
          </div>
          
          <div class="filter-block" data-filter="browsers">
            <div class="filter-title">🌐 Браузеры</div>
            <div class="filter-dropdown">
              <label><input type="checkbox" id="browser-webkit"> Только WebKit</label>
              <label><input type="checkbox" id="browser-moz"> Только Mozilla</label>
              <label><input type="checkbox" id="browser-both"> Оба браузера</label>
            </div>
          </div>
          
          <div class="filter-block" data-filter="sort">
            <div class="filter-title">⚡ Сортировка</div>
            <div class="filter-dropdown">
              <select id="sort-options">
                <option value="relevance">По релевантности</option>
                <option value="alphabetical">По алфавиту</option>
                <option value="type">По типу</option>
              </select>
            </div>
          </div>
          
          <div class="filter-block" data-filter="limit">
            <div class="filter-title">📊 Показать</div>
            <div class="filter-dropdown">
              <select id="results-limit">
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="all">Все</option>
              </select>
            </div>
          </div>
          
          <div class="filter-block reset-block">
            <button id="reset-filters">🔄 Сброс</button>
          </div>
        </div>
        
        <div id="search-results"></div>
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    createSearchInterface('search-container');
    
    loadAllData();
    
    const input = document.getElementById('search-input');
    if (input) {
        const debouncedSearch = debounce(handleSearch, 300);
        input.addEventListener('input', debouncedSearch);
    }
    
    // Инициализируем фильтры после создания интерфейса
    setTimeout(() => {
        initializeFilters();
    }, 100);
});

let filtersState = {
    contentTypes: {
        html: true,
        css: true,
        quiz: true
    },
    searchFields: {
        name: true,
        description: true,
        examples: true,
        values: true
    },
    browserSupport: {
        webkit: false,
        moz: false,
        both: false
    },
    sortBy: 'relevance',
    limit: 'all'
};

function initializeFilters() {
    
    // Добавляем обработчики кликов для мобильных устройств
    initializeMobileFilters();
    
    ['html', 'css', 'quiz'].forEach(type => {
        const checkbox = document.getElementById(`filter-${type}`);
        if (checkbox) {
            checkbox.addEventListener('change', () => {
                filtersState.contentTypes[type] = checkbox.checked;
                handleSearch();
            });
        }
    });
    
    ['name', 'description', 'examples', 'values'].forEach(field => {
        const checkbox = document.getElementById(`search-${field}`);
        if (checkbox) {
            checkbox.addEventListener('change', () => {
                filtersState.searchFields[field] = checkbox.checked;
                updateSearchData();
                handleSearch();
            });
        }
    });
    
    ['webkit', 'moz', 'both'].forEach(browser => {
        const checkbox = document.getElementById(`browser-${browser}`);
        if (checkbox) {
            checkbox.addEventListener('change', () => {
                filtersState.browserSupport[browser] = checkbox.checked;
                handleSearch();
            });
        }
    });
    
    const sortSelect = document.getElementById('sort-options');
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            filtersState.sortBy = sortSelect.value;
            handleSearch();
        });
    }
    
    const limitSelect = document.getElementById('results-limit');
    if (limitSelect) {
        limitSelect.addEventListener('change', () => {
            filtersState.limit = limitSelect.value;
            handleSearch();
        });
    }
    
    const resetButton = document.getElementById('reset-filters');
    if (resetButton) {
        resetButton.addEventListener('click', resetFilters);
    }
}

function updateSearchData() {
    allData.forEach(item => {
        let searchText = '';
        
        if (filtersState.searchFields.name) {
            searchText += ` ${item.name}`;
        }
        
        if (filtersState.searchFields.description) {
            searchText += ` ${item.description || ''}`;
        }
        
        if (filtersState.searchFields.examples && item.example) {
            searchText += ` ${item.example}`;
        }
        
        if (filtersState.searchFields.values) {
            if (item.values) searchText += ` ${item.values}`;
            if (item.options) searchText += ` ${item.options.join(' ')}`;
        }
        
        item.searchText = searchText.toLowerCase();
    });
}

function filterByContentType(results) {
    return results.filter(item => {
        return filtersState.contentTypes[item.type];
    });
}

function filterByBrowserSupport(results) {
    if (!filtersState.browserSupport.webkit && 
        !filtersState.browserSupport.moz && 
        !filtersState.browserSupport.both) {
        return results;
    }
    
    return results.filter(item => {
        if (item.type !== 'css') return true;
        
        if (filtersState.browserSupport.webkit && item.webkit && !item.moz) return true;
        if (filtersState.browserSupport.moz && item.moz && !item.webkit) return true;
        if (filtersState.browserSupport.both && item.webkit && item.moz) return true;
        
        return false;
    });
}

function sortResults(results) {
    switch (filtersState.sortBy) {
        case 'alphabetical':
            return results.sort((a, b) => a.name.localeCompare(b.name));
        
        case 'type':
            return results.sort((a, b) => {
                const typeOrder = { html: 1, css: 2, quiz: 3 };
                if (typeOrder[a.type] !== typeOrder[b.type]) {
                    return typeOrder[a.type] - typeOrder[b.type];
                }
                return a.name.localeCompare(b.name);
            });
        
        case 'relevance':
        default:
            return results; 
    }
}

function limitResults(results) {
    if (filtersState.limit === 'all') {
        return results;
    }
    
    const limit = parseInt(filtersState.limit);
    return results.slice(0, limit);
}

function performSearchWithFilters(query) {
    let results = performSearch(query);
    
    results = filterByContentType(results);
    results = filterByBrowserSupport(results);
    results = sortResults(results);
    results = limitResults(results);
    
    return results;
}

function handleSearch() {
    const input = document.getElementById('search-input');
    const query = input?.value || '';
    
    if (query.trim() === '') {
        document.getElementById('search-results').innerHTML = '';
        updateResultsInfo(0);
        return;
    }

    const results = performSearchWithFilters(query);
    displayResults(results);
    updateResultsInfo(results.length, query);
}

function updateResultsInfo(count, query = '') {
    const container = document.getElementById('search-results');
    if (!container) return;
    
    const existingInfo = document.querySelector('.results-info');
    if (existingInfo) {
        existingInfo.remove();
    }
    
    if (count > 0) {
        const info = document.createElement('div');
        info.className = 'results-info';
        info.textContent = `Найдено результатов: ${count}${query ? ` для "${query}"` : ''}`;
        container.parentNode.insertBefore(info, container);
    }
}

function initializeMobileFilters() {
    // Проверяем, являемся ли мы на мобильном устройстве
    const isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;
    
    if (isMobile) {
        // Добавляем обработчики кликов для заголовков фильтров
        document.querySelectorAll('.filter-block').forEach(filterBlock => {
            // Пропускаем кнопку сброса
            if (filterBlock.classList.contains('reset-block')) return;
            
            const filterTitle = filterBlock.querySelector('.filter-title');
            if (filterTitle && !filterTitle.hasAttribute('data-mobile-initialized')) {
                filterTitle.setAttribute('data-mobile-initialized', 'true');
                filterTitle.addEventListener('click', (e) => {
                    e.stopPropagation();
                    toggleFilterDropdown(filterBlock);
                });
            }
        });
        
        // Закрываем фильтры при клике вне их (добавляем только один раз)
        if (!document.body.hasAttribute('data-mobile-click-initialized')) {
            document.body.setAttribute('data-mobile-click-initialized', 'true');
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.filter-block')) {
                    closeAllFilters();
                }
            });
        }
    }
}

function toggleFilterDropdown(filterBlock) {
    const isActive = filterBlock.classList.contains('active');
    
    // Закрываем все другие фильтры
    closeAllFilters();
    
    // Переключаем текущий фильтр
    if (!isActive) {
        filterBlock.classList.add('active');
    }
}

function closeAllFilters() {
    document.querySelectorAll('.filter-block.active').forEach(block => {
        block.classList.remove('active');
    });
}

function resetFilters() {
    filtersState = {
        contentTypes: { html: true, css: true, quiz: true },
        searchFields: { name: true, description: true, examples: true, values: true },
        browserSupport: { webkit: false, moz: false, both: false },
        sortBy: 'relevance',
        limit: 'all'
    };

    ['html', 'css', 'quiz'].forEach(type => {
        const checkbox = document.getElementById(`filter-${type}`);
        if (checkbox) checkbox.checked = true;
    });
    
    ['name', 'description', 'examples', 'values'].forEach(field => {
        const checkbox = document.getElementById(`search-${field}`);
        if (checkbox) checkbox.checked = true;
    });
    
    ['webkit', 'moz', 'both'].forEach(browser => {
        const checkbox = document.getElementById(`browser-${browser}`);
        if (checkbox) checkbox.checked = false;
    });
    
    const sortSelect = document.getElementById('sort-options');
    if (sortSelect) sortSelect.value = 'relevance';
    
    const limitSelect = document.getElementById('results-limit');
    if (limitSelect) limitSelect.value = 'all';
    
    // Закрываем все фильтры
    closeAllFilters();
    
    updateSearchData();
    handleSearch();
}

