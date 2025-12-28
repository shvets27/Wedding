# Инструкция по копированию проекта в D:\Nikita\Wedding

## Автоматическое копирование

Запустите PowerShell скрипт:

```powershell
.\copy-to-production.ps1
```

## Ручное копирование

Скопируйте следующие файлы и папки из текущей папки `wedding` в `D:\Nikita\Wedding`:

### Обязательные файлы:
- `index.html`
- `package.json`
- `vite.config.js`
- `README.md`
- `.gitignore`

### Папки:
- `src/` (вся папка со всем содержимым)
- `.github/` (если существует)

### НЕ копируйте:
- `node_modules/`
- `.vite/`
- `dist/`
- `package-lock.json`
- `*.log`
- `*.php`
- `*.py`
- `IMG_*.JPG`
- `*.jpg`, `*.png`, `*.mp4`, `*.otf`
- `*-section.png`
- `Frame*.png`
- `script.js`
- `styles.css` (в корне, но `src/styles.css` нужен!)
- `event.ics`
- `copy_images.py`
- `wedding/` (вложенная папка)

## После копирования

1. Перейдите в папку `D:\Nikita\Wedding`
2. Установите зависимости: `npm install`
3. Проверьте работу: `npm run dev`
4. Соберите проект: `npm run build`

