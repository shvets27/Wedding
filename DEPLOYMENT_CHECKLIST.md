# Чеклист для деплоя на GitHub

## ✅ Перед загрузкой на GitHub

- [x] Проект скопирован в `D:\Nikita\Wedding`
- [x] Все временные файлы удалены (PHP, Python, старые изображения)
- [x] `.gitignore` настроен правильно
- [x] `README.md` содержит инструкции
- [x] GitHub Actions workflow настроен (`.github/workflows/deploy.yml`)

## 📋 Шаги для загрузки на GitHub

### 1. Инициализация Git

```bash
cd D:\Nikita\Wedding
git init
git add .
git commit -m "Initial commit: Wedding website - THE SHVETS FAMILY"
```

### 2. Создание репозитория на GitHub

1. Перейдите на https://github.com
2. Нажмите **New repository**
3. Название: `wedding-website` (или другое)
4. Выберите **Public**
5. **НЕ добавляйте** README, .gitignore, лицензию
6. Нажмите **Create repository**

### 3. Подключение к GitHub

```bash
# Замените YOUR_USERNAME и REPO_NAME
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git branch -M main
git push -u origin main
```

### 4. Настройка GitHub Pages

1. Перейдите в **Settings** → **Pages**
2. **Source**: выберите **GitHub Actions**
3. Сохраните

### 5. Проверка

Через 1-2 минуты сайт будет доступен по адресу:
```
https://YOUR_USERNAME.github.io/REPO_NAME/
```

## 🔄 Обновление сайта

После любых изменений:

```bash
git add .
git commit -m "Описание изменений"
git push
```

GitHub Actions автоматически соберет и опубликует обновления.

