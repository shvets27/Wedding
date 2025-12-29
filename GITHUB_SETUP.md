# Инструкция по настройке GitHub для проекта Wedding

## Быстрый старт через GitHub Desktop

### 1. Создание репозитория на GitHub.com
- Откройте https://github.com и войдите
- Нажмите "+" → "New repository"
- Название: `Wedding` (или другое)
- Выберите Public или Private
- **НЕ** добавляйте README, .gitignore, license (они уже есть)
- Нажмите "Create repository"

### 2. Инициализация в GitHub Desktop
1. Откройте GitHub Desktop
2. File → Add Local Repository
3. Нажмите "Choose..." и выберите папку `D:\Nikita\Wedding`
4. Если появится сообщение "This directory does not appear to be a Git repository", нажмите "create a repository"

### 3. Публикация на GitHub
1. В GitHub Desktop нажмите "Publish repository"
2. Выберите ваш аккаунт
3. Выберите репозиторий, созданный на шаге 1
4. Нажмите "Publish repository"

### 4. Первый коммит
1. В GitHub Desktop вы увидите все файлы проекта
2. Введите сообщение коммита: "Initial commit - Wedding website"
3. Нажмите "Commit to main"
4. Нажмите "Push origin" для отправки на GitHub

## Важные файлы, которые будут загружены:
- ✅ Все исходные файлы Vue компонентов
- ✅ Конфигурационные файлы (package.json, vite.config.js)
- ✅ Шрифты
- ✅ HTML и CSS файлы
- ✅ Музыкальный файл (public/music.mp3)

## Файлы, которые НЕ будут загружены (благодаря .gitignore):
- ❌ node_modules/ (зависимости)
- ❌ dist/ (собранные файлы)
- ❌ Временные файлы

## После загрузки на GitHub:
Вы сможете:
- Просматривать код онлайн
- Клонировать проект на другие компьютеры
- Настроить автоматический деплой (если нужно)
- Поделиться проектом с другими

## Полезные команды (если установите Git CLI):
```bash
git status          # Проверить статус
git add .           # Добавить все файлы
git commit -m "..." # Сделать коммит
git push            # Отправить на GitHub
```





