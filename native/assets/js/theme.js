const btnTheme = document.getElementById('ThemeBtn');

function updateThemeButton() {
    if (document.body.classList.contains('dark-theme')) {
        btnTheme.innerHTML = '☀️ Светлая тема';
        localStorage.setItem('theme', 'dark');
    } else {
        btnTheme.innerHTML = '🌙 Темная тема';
        localStorage.setItem('theme', 'light');
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
    
    updateThemeButton();
});


btnTheme.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    updateThemeButton();
});