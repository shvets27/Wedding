<template>
  <div id="app">
    <!-- Initials Preloader -->
    <InitialsPreloader @close="hideLoading" @animate-image="handleImageAnimation" />
    
    <!-- Main Content -->
    <div class="main-content" :class="{ 'visible': !isLoading }">
      <!-- Hero Section -->
      <HeroSection />
      
      <!-- About Section -->
      <AboutSection />
      
      <!-- Figma Design Sections -->
      <PhotoCollageSection />
      
      <!-- Functional Sections -->
      <DetailsSection />
      <ProgramSection />
      <RSVPSection />
      <ContactSection />
      <FooterSection />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import InitialsPreloader from './components/InitialsPreloader.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import PhotoCollageSection from './components/PhotoCollageSection.vue'
import DetailsSection from './components/DetailsSection.vue'
import ProgramSection from './components/ProgramSection.vue'
import RSVPSection from './components/RSVPSection.vue'
import ContactSection from './components/ContactSection.vue'
import FooterSection from './components/FooterSection.vue'
import { useSmoothScroll } from './composables/useSmoothScroll'
import { useScrollAnimations } from './composables/useScrollAnimations'

const isLoading = ref(true)

// Инициализируем функционал при монтировании
useSmoothScroll()
useScrollAnimations()

const hideLoading = () => {
  isLoading.value = false
}

const handleImageAnimation = (data) => {
  // Отправляем событие для HeroSection после завершения анимации перемещения
  setTimeout(() => {
    window.dispatchEvent(new CustomEvent('initials-animated', { detail: data }))
  }, 1200)
}
</script>

<style scoped>
#app {
  width: 100%;
}

.main-content {
  width: 100%;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.8s ease-in, visibility 0.8s ease-in;
}

.main-content.visible {
  opacity: 1;
  visibility: visible;
}
</style>
