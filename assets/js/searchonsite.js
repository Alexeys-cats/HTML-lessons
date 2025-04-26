function getJsonPath() {
   
    const depth = location.pathname.split('/').length - 2;
    return `${'../'.repeat(depth)}assets/json/data.json`;
  }
  
  function loadJSON() {
    fetch(getJsonPath())
      .then(response => {
        if (!response.ok) {
          throw new Error('Не удалось загрузить JSON');
        }
        return response.json();
      })
      .then(data => {
        renderCards(data);
      })
      .catch(error => {
        console.error('Ошибка при загрузке JSON:', error);
      });
  }
  
  function renderCards(data) {
    const container = document.getElementById('search-results');
    if (!container) return;
  
    container.innerHTML = '';
    data.forEach(item => {
      const card = document.createElement('div');
      card.className = 'boxline';
      card.innerHTML = `
        <h3>Тег <code>${item.title}</code></h3>
        <p><strong>Описание:</strong> ${item.description}</p>
        <p><strong>Пример:</strong> <code>${item.example}</code></p>
        <a href="${item.link}" target="_blank" rel="noopener noreferrer">Посмотреть пример</a>
      `;
      container.appendChild(card);
    });
  }
  
  function searchTags() {
    const input = document.getElementById('search-input');
    const query = input?.value.toLowerCase() ?? '';
    const cards = document.querySelectorAll('.boxline');
  
    cards.forEach(card => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(query) ? 'block' : 'none';
    });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    loadJSON();
    const input = document.getElementById('search-input');
    if (input) input.addEventListener('input', searchTags);
  });