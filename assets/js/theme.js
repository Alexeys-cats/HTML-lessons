const btnTheme = document.getElementById('ThemeBtn');

btnTheme.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');

    if (document.body.classList.contains('dark-theme')) {
        btnTheme.textContent = 'Светлая тема';
    } else {
        btnTheme.textContent = 'Темная тема';
    }
});
 localStorage.setItem('theme', dark ? 'dark' : 'light');