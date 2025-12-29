<template>
  <section class="hero-section" id="home">
    <img :src="heroImage" alt="Wedding Hero Image" class="hero-image">
    <div v-if="showInitials" class="hero-initials" :class="{ 'visible': showInitials }">
      <img :src="initialsImageSrc" alt="Initials" class="hero-initials-image" />
    </div>
    <div v-if="showInitials" class="hero-date-wrapper" :class="{ 'visible': showInitials }">
      <span class="hero-date">10 | 09 | 2026</span>
    </div>
    <div class="hero-overlay-content">
      <div class="hero-taglines">
        <span class="hero-tagline-left">WEDDING DAY</span>
      </div>
    </div>
    <div class="scroll-indicator">
      <span class="scroll-arrow">↓</span>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const heroImage = 'https://i8.imageban.ru/out/2025/12/22/fe76c72faee06f7f8c697e11f2738fd1.jpg'
const showInitials = ref(false)
const initialsImageSrc = computed(() => import.meta.env.BASE_URL + 'initials.png')

// Предзагрузка главного изображения
const preloadHeroImage = () => {
  const img = new Image()
  img.src = heroImage
}

// Предзагружаем изображение сразу при импорте модуля
preloadHeroImage()

// Слушаем событие от прелоадера
onMounted(() => {
  const handleImageAnimation = () => {
    // Показываем изображение сразу после завершения анимации перемещения
    showInitials.value = true
  }
  
  window.addEventListener('initials-animated', handleImageAnimation)
  
  // Также проверяем, если прелоадер уже закрыт (fallback)
  setTimeout(() => {
    if (!document.querySelector('.initials-preloader') && !showInitials.value) {
      showInitials.value = true
    }
  }, 2500)
})
</script>

<style scoped>
.hero-section {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

.hero-initials {
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%) translateY(0) scale(0.6);
  transform-origin: center top;
  z-index: 3;
  opacity: 0;
  transition: opacity 0.8s ease 0.2s;
  pointer-events: none;
  margin: 0;
  padding: 0;
}

.hero-initials.visible {
  opacity: 1;
}

.hero-initials-image {
  width: 450px;
  height: 450px;
  object-fit: contain;
  filter: drop-shadow(0 5px 15px rgba(0, 0, 0, 0.3));
  display: block;
  margin: 0;
  padding: 0;
}

.hero-date-wrapper {
  position: absolute;
  top: 200px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  opacity: 0;
  transition: opacity 0.8s ease 0.2s;
  pointer-events: none;
  text-align: center;
}

.hero-date-wrapper.visible {
  opacity: 1;
}

.hero-date {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.6rem;
  font-weight: 400;
  letter-spacing: 2px;
  color: #2c2c2c;
  text-shadow: 0 1px 3px rgba(255, 255, 255, 0.3);
}


@media (max-width: 768px) {
  .hero-initials-image {
    width: 300px;
    height: 300px;
  }
  
  .hero-initials {
    transform: translateX(-50%) translateY(0);
  }
  
  .hero-date-wrapper {
    top: 175px;
  }
  
  .hero-date {
    font-size: 1.3rem;
    letter-spacing: 1.5px;
  }
}

@media (max-width: 480px) {
  .hero-initials-image {
    width: 250px;
    height: 250px;
  }
  
  .hero-initials {
    transform: translateX(-50%) translateY(0);
  }
  
  .hero-date-wrapper {
    top: 190px;
  }
  
  .hero-date {
    font-size: 1.1rem;
    letter-spacing: 1px;
  }
}

.hero-overlay-content {
  position: absolute;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  text-align: center;
  color: #fff;
}

.hero-taglines {
  display: flex;
  gap: 20px;
  margin-bottom: 10px;
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.2rem;
  letter-spacing: 3px;
}


.scroll-indicator {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  color: #fff;
  font-size: 2rem;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(10px); }
}

@media (max-width: 768px) {
  .hero-taglines {
    flex-direction: column;
    gap: 10px;
    font-size: 1rem;
  }
  
}
</style>
