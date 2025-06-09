#!/usr/bin/env node

// Скрипт для автоматического обновления версий CSS файлов
// Запуск: node update-version.js

const fs = require('fs');
const path = require('path');

// Функция для генерации новой версии
function generateVersion() {
    const now = new Date();
    const version = `${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}.${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}`;
    return version;
}

// Функция для обновления версии в файле
function updateVersionInFile(filePath, newVersion) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Обновляем версии CSS файлов
        content = content.replace(
            /href="([^"]*\.css)(\?v=[^"]*)?"/g,
            `href="$1?v=${newVersion}"`
        );
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Обновлен: ${filePath}`);
        return true;
    } catch (error) {
        console.error(`❌ Ошибка при обновлении ${filePath}:`, error.message);
        return false;
    }
}

// Функция для обновления версии в version-cache.js
function updateVersionInJS(newVersion) {
    const jsFilePath = path.join(__dirname, 'assets', 'js', 'version-cache.js');
    
    try {
        let content = fs.readFileSync(jsFilePath, 'utf8');
        
        // Обновляем currentVersion в JS файле
        content = content.replace(
            /const currentVersion = '[^']*'/,
            `const currentVersion = '${newVersion}'`
        );
        
        fs.writeFileSync(jsFilePath, content, 'utf8');
        console.log(`✅ Обновлен version-cache.js`);
        return true;
    } catch (error) {
        console.error(`❌ Ошибка при обновлении version-cache.js:`, error.message);
        return false;
    }
}

// Основная функция
function main() {
    console.log('🚀 Начинаем обновление версий CSS файлов...\n');
    
    const newVersion = generateVersion();
    console.log(`📦 Новая версия: ${newVersion}\n`);
    
    // Список HTML файлов для обновления
    const htmlFiles = [
        'index.html',
        'pages/htmlpage.html',
        'pages/csspage.html',
        'pages/javascriptpage.html',
        'pages/quiz.html'
    ];
    
    let successCount = 0;
    
    // Обновляем все HTML файлы
    htmlFiles.forEach(file => {
        const filePath = path.join(__dirname, file);
        if (fs.existsSync(filePath)) {
            if (updateVersionInFile(filePath, newVersion)) {
                successCount++;
            }
        } else {
            console.log(`⚠️  Файл не найден: ${file}`);
        }
    });
    
    // Обновляем version-cache.js
    if (updateVersionInJS(newVersion)) {
        successCount++;
    }
    
    console.log(`\n✨ Готово! Обновлено файлов: ${successCount}`);
    console.log(`📝 Новая версия CSS: ${newVersion}`);
    console.log('\n💡 Теперь CSS файлы будут загружаться с новой версией, минуя кеш браузера.');
}

// Запускаем скрипт
if (require.main === module) {
    main();
}

module.exports = { updateVersionInFile, generateVersion }; 