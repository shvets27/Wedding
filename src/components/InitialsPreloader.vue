<template>
  <div v-if="isLoading" class="initials-preloader" :class="{ 'fade-out': isFadingOut }" @click="openInvitation">
    <div class="preloader-container">
      <!-- Изображение инициалов -->
      <div ref="initialsWrapper" class="initials-image-wrapper" :class="{ 'animating': isAnimating }">
        <img ref="initialsImage" src="/initials.png" alt="Initials" class="initials-image" />
      </div>
      
      <!-- Текст NIKITA & ALINA -->
      <div class="names-text">
        <span class="name name-left">NIKITA</span>
        <span class="ampersand">&</span>
        <span class="name name-right">ALINA</span>
      </div>
      
      <!-- Дата -->
      <div class="date-text">10 | 09 | 2026</div>
      
      <!-- Кнопка открыть приглашение -->
      <button 
        class="open-button" 
        :class="{ 'active': isButtonActive, 'visible': showButton }"
        @click.stop="openInvitation"
        :disabled="!isButtonActive"
      >
        OPEN
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const emit = defineEmits(['close', 'animate-image'])

const isLoading = ref(true)
const isFadingOut = ref(false)
const showButton = ref(false)
const animationComplete = ref(false)
const resourcesLoaded = ref(false)
const minTimeElapsed = ref(false)
const isAnimating = ref(false)
const initialsWrapper = ref(null)
const initialsImage = ref(null)

// Критические ресурсы для загрузки
const criticalImages = [
  'https://i8.imageban.ru/out/2025/12/22/fe76c72faee06f7f8c697e11f2738fd1.jpg',
  'https://i6.imageban.ru/out/2025/12/22/f02bfab3bee2e844b473eb3a8b3df752.jpg',
  'https://i1.imageban.ru/out/2025/12/28/02e6a3d976c75496a38b9d16107831d5.jpg'
]

const isButtonActive = computed(() => {
  return animationComplete.value && (resourcesLoaded.value || minTimeElapsed.value)
})

// Загрузка критических изображений
const loadCriticalImages = () => {
  let loadedCount = 0
  const totalImages = criticalImages.length
  
  criticalImages.forEach((src) => {
    const img = new Image()
    img.onload = () => {
      loadedCount++
      if (loadedCount === totalImages) {
        resourcesLoaded.value = true
      }
    }
    img.onerror = () => {
      loadedCount++
      if (loadedCount === totalImages) {
        resourcesLoaded.value = true
      }
    }
    img.src = src
  })
}

const openInvitation = async (e) => {
  e?.stopPropagation()
  if (!isButtonActive.value) return
  
  // Начинаем анимацию перемещения изображения
  if (initialsWrapper.value && initialsImage.value) {
    isAnimating.value = true
    
    // Получаем начальную позицию
    const startRect = initialsWrapper.value.getBoundingClientRect()
    
    // Вычисляем целевую позицию (центр верхней части HeroSection)
    // HeroSection может быть скрыт, поэтому используем window.innerWidth для расчета центра
    const heroSection = document.querySelector('.hero-section')
    let heroRect
    
    if (heroSection) {
      heroRect = heroSection.getBoundingClientRect()
    } else {
      // Если HeroSection еще не отрендерен, используем размеры окна
      heroRect = {
        left: 0,
        top: 0,
        width: window.innerWidth,
        height: window.innerHeight
      }
    }
    
    if (heroRect) {
      // Центр HeroSection по X
      const heroCenterX = heroRect.left + heroRect.width / 2
      // Центр текущей картинки по X
      const startCenterX = startRect.left + startRect.width / 2
      
      // Вычисляем смещение по X (чтобы центры совпали)
      const deltaX = heroCenterX - startCenterX
      
      // Позиция в самый верх секции
      const targetY = heroRect.top + 10 // Небольшой отступ для мобильных
      const deltaY = targetY - startRect.top
      
      // Определяем масштаб в зависимости от размера экрана
      // Для мобильных используем меньший scale
      let targetScale = 0.6
      if (window.innerWidth <= 480) {
        targetScale = 0.56  // Соответствует размеру 250px из 450px исходного
      } else if (window.innerWidth <= 768) {
        targetScale = 0.67  // Соответствует размеру 300px из 450px исходного
      }
      
      // Применяем анимацию
      initialsWrapper.value.style.transition = 'transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)'
      initialsWrapper.value.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${targetScale})`
      initialsWrapper.value.style.transformOrigin = 'center center'
      
      // Уменьшаем размер изображения
      initialsImage.value.style.transition = 'opacity 0.3s ease'
      
      // Отправляем событие для показа изображения в HeroSection
      emit('animate-image', {
        startRect,
        targetRect: {
          x: heroCenterX - startRect.width * (targetScale / 2),
          y: targetY,
          width: startRect.width * targetScale,
          height: startRect.height * targetScale
        }
      })
      
      // Запускаем музыку
      window.dispatchEvent(new CustomEvent('start-music'))
      
      // Ждем завершения анимации перед закрытием прелоадера
      setTimeout(() => {
        isFadingOut.value = true
        setTimeout(() => {
          emit('close')
          // Устанавливаем isLoading в false после emit, чтобы компонент удалился
          isLoading.value = false
        }, 300)
      }, 1200)
    } else {
      // Если не удалось найти элементы, просто закрываем
      isFadingOut.value = true
      setTimeout(() => {
        isLoading.value = false
        emit('close')
      }, 800)
    }
  } else {
    // Если элементы не найдены, закрываем без анимации
    isFadingOut.value = true
    setTimeout(() => {
      isLoading.value = false
      emit('close')
    }, 800)
  }
}

onMounted(() => {
  try {
    loadCriticalImages()
    
    // Минимальное время показа - 1.5 секунды
    setTimeout(() => {
      minTimeElapsed.value = true
    }, 1500)
    
    // Анимация завершена
    setTimeout(() => {
      animationComplete.value = true
      setTimeout(() => {
        showButton.value = true
      }, 300)
    }, 1000)
  } catch (error) {
    console.error('Error in preloader:', error)
    // В случае ошибки активируем кнопку через 2 секунды
    setTimeout(() => {
      animationComplete.value = true
      minTimeElapsed.value = true
      showButton.value = true
    }, 2000)
  }
})
</script>

<style scoped>
/* ============================================
   ОСНОВНЫЕ СТИЛИ
   ============================================ */
.initials-preloader {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fafafa;
  background: linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%);
  cursor: pointer;
  transition: opacity 0.8s ease, visibility 0.8s ease;
}

.initials-preloader.fade-out {
  opacity: 0;
  visibility: hidden;
}

/* ============================================
   КОНТЕЙНЕР
   ============================================ */
.preloader-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  text-align: center;
}

/* ============================================
   ИЗОБРАЖЕНИЕ ИНИЦИАЛОВ
   ============================================ */
.initials-image-wrapper {
  width: 450px;
  height: 450px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeInUp 1s ease-out;
  position: relative;
  z-index: 10001;
}

.initials-image-wrapper.animating {
  z-index: 10002;
}

.initials-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 5px 15px rgba(0, 0, 0, 0.1));
}

/* ============================================
   ТЕКСТ ИМЕН
   ============================================ */
.names-text {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  animation: fadeInUp 1s ease-out 0.3s both;
  flex-wrap: wrap;
  margin-top: -10px;
}

.name {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2rem;
  font-weight: 400;
  letter-spacing: 3px;
  color: #2c2c2c;
  text-transform: uppercase;
}

.ampersand {
  font-family: 'PARISIAN', serif;
  font-size: 2.5rem;
  color: #E8B4A0;
  font-weight: 400;
  line-height: 1;
}

/* ============================================
   ДАТА
   ============================================ */
.date-text {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.6rem;
  font-weight: 400;
  letter-spacing: 2px;
  color: #2c2c2c;
  text-align: center;
  animation: fadeInUp 1s ease-out 0.5s both;
  margin-top: -15px;
}

/* ============================================
   КНОПКА ОТКРЫТЬ ПРИГЛАШЕНИЕ
   ============================================ */
.open-button {
  padding: 0;
  background: transparent;
  border: none;
  color: #2c2c2c;
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.3rem;
  font-weight: 400;
  letter-spacing: 3px;
  text-transform: uppercase;
  cursor: pointer;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease;
  position: relative;
  text-decoration: none;
}

.open-button.visible {
  opacity: 0.6;
  transform: translateY(0);
}

.open-button.active {
  opacity: 1;
  cursor: pointer;
}

.open-button.active:hover {
  color: #E8B4A0;
  transform: translateY(-2px);
  letter-spacing: 4px;
}

.open-button:disabled {
  cursor: not-allowed;
  opacity: 0.4;
}

.open-button.active:disabled {
  cursor: pointer;
  opacity: 1;
}

/* ============================================
   АНИМАЦИИ
   ============================================ */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ============================================
   АДАПТИВНОСТЬ
   ============================================ */
@media (max-width: 768px) {
  .initials-image-wrapper {
    width: 350px;
    height: 350px;
  }
  
  .name {
    font-size: 1.6rem;
    letter-spacing: 2px;
  }
  
  .ampersand {
    font-size: 2rem;
  }
  
  .date-text {
    font-size: 1.3rem;
    letter-spacing: 1.5px;
    margin-top: -12px;
  }
  
  .open-button {
    font-size: 1.1rem;
    letter-spacing: 2px;
  }
  
  .preloader-container {
    gap: 15px;
  }
  
  .names-text {
    margin-top: -8px;
  }
}

@media (max-width: 480px) {
  .initials-image-wrapper {
    width: 280px;
    height: 280px;
  }
  
  .name {
    font-size: 1.3rem;
    letter-spacing: 1px;
  }
  
  .ampersand {
    font-size: 1.6rem;
  }
  
  .date-text {
    font-size: 1.3rem;
    letter-spacing: 1.5px;
    margin-top: -10px;
  }
  
  .open-button {
    font-size: 0.95rem;
    letter-spacing: 1px;
  }
  
  .preloader-container {
    gap: 12px;
    padding: 20px;
  }
  
  .names-text {
    gap: 10px;
    margin-top: -6px;
  }
}
</style>

