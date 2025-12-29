<template>
  <section class="photo-collage-section" id="photos">
    <div class="container">
      <h2 class="section-title">
        <span>ROMANTIC</span>
        <span class="title-ampersand">&</span>
        <span>MOMENTS</span>
      </h2>
      <div class="photo-slider">
        <button class="slider-arrow slider-arrow-prev" @click="prevPhoto">‹</button>
        <div class="photo-slider-container">
          <transition name="slide-fade" mode="out-in">
            <div 
              v-if="allPhotos.length > 0 && allPhotos[currentPhotoIndex]"
              :key="currentPhotoIndex"
              class="photo-slide"
              @click="openLightbox"
            >
              <div class="photo-wrapper">
                <img :src="allPhotos[currentPhotoIndex].src" :alt="allPhotos[currentPhotoIndex].alt" class="photo-image">
                <div class="photo-overlay"></div>
              </div>
            </div>
          </transition>
        </div>
        <button class="slider-arrow slider-arrow-next" @click="nextPhoto">›</button>
        <div class="slider-dots">
          <span 
            v-for="(photo, index) in allPhotos" 
            :key="index"
            class="dot"
            :class="{ 'active': index === currentPhotoIndex }"
            @click="goToPhoto(index)"
          ></span>
        </div>
      </div>
    </div>
    
    <!-- Lightbox -->
    <div v-if="lightboxOpen && allPhotos.length > 0 && allPhotos[currentPhotoIndex]" class="lightbox" @click="closeLightbox">
      <button class="lightbox-close" @click="closeLightbox">×</button>
      <button class="lightbox-prev" @click.stop="lightboxPrevPhoto">‹</button>
      <button class="lightbox-next" @click.stop="lightboxNextPhoto">›</button>
      <img :src="allPhotos[currentPhotoIndex].src" :alt="allPhotos[currentPhotoIndex].alt" class="lightbox-image">
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Массив всех доступных фото для перелистывания
const allPhotos = ref([
  { src: 'https://i5.imageban.ru/out/2025/12/29/0b631d9aa2e40c6502e95374ec801cb7.png', alt: 'Фото 1' },
  { src: 'https://i1.imageban.ru/out/2025/12/28/1bae743e1aedc8d075e2b1a4329a6e77.jpg', alt: 'Фото 2' },
  { src: 'https://i2.imageban.ru/out/2025/12/29/092e592b184b0711e670e49f67cef3e0.jpg', alt: 'Фото 3' },
  { src: 'https://i4.imageban.ru/out/2025/12/28/7b81e662b97adb878c7c85987edb4634.jpg', alt: 'Фото 4' },
  { src: 'https://i8.imageban.ru/out/2025/12/28/7f442ee553ef776d4a8bbb9f3d01a6f7.jpg', alt: 'Фото 5' },
  { src: 'https://i2.imageban.ru/out/2025/12/28/f0c5e3906c8fc5b6f8402385f328f7fe.jpg', alt: 'Фото 6' },
  { src: 'https://i8.imageban.ru/out/2025/12/29/4a2e74c44c8867c618a222392e5d8fa1.jpg', alt: 'Фото 7' },
  { src: 'https://i5.imageban.ru/out/2025/12/28/5eb9497d452a47d07bcc1e4a0adc3cd8.jpg', alt: 'Фото 8' },
  { src: 'https://i1.imageban.ru/out/2025/12/28/ec430c2a6776e1a1e15c53a30bd5965a.jpg', alt: 'Фото 9' },
  { src: 'https://i2.imageban.ru/out/2025/12/28/273dc45398fa6fc738ed5ac311e9f606.jpg', alt: 'Фото 10' },
  { src: 'https://i1.imageban.ru/out/2025/12/28/c06a2db95287c92ff9d8476069236f08.jpg', alt: 'Фото 11' },
  { src: 'https://i1.imageban.ru/out/2025/12/28/cb0a54113d81efcefb06c418e73bf535.jpg', alt: 'Фото 12' }
])

const currentPhotoIndex = ref(0)

const nextPhoto = () => {
  if (allPhotos.value.length > 0) {
    currentPhotoIndex.value = (currentPhotoIndex.value + 1) % allPhotos.value.length
  }
}

const prevPhoto = () => {
  if (allPhotos.value.length > 0) {
    currentPhotoIndex.value = (currentPhotoIndex.value - 1 + allPhotos.value.length) % allPhotos.value.length
  }
}

const goToPhoto = (index) => {
  if (index >= 0 && index < allPhotos.value.length) {
    currentPhotoIndex.value = index
  }
}

const lightboxOpen = ref(false)

const openLightbox = () => {
  lightboxOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  lightboxOpen.value = false
  document.body.style.overflow = ''
}

const lightboxNextPhoto = () => {
  nextPhoto()
}

const lightboxPrevPhoto = () => {
  prevPhoto()
}

// Предзагрузка всех фотографий
const preloadImages = () => {
  allPhotos.value.forEach((photo) => {
    const img = new Image()
    img.src = photo.src
  })
}

onMounted(() => {
  // Убеждаемся, что показывается первое фото
  currentPhotoIndex.value = 0
  preloadImages()
})

</script>

<style scoped>
.photo-collage-section {
  padding: 60px 0;
  background: #ffffff;
  position: relative;
}

.photo-collage-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, #E8B4A0, transparent);
}

.photo-collage-section::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, #E8B4A0, transparent);
}

.container {
  max-width: 100%;
  margin: 0;
  padding: 0;
  width: 100%;
}

.section-title {
  font-family: 'Playfair Display', serif;
  font-size: 4.5rem;
  font-weight: 300;
  letter-spacing: 12px;
  color: #1a1a1a;
  text-align: center;
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  position: relative;
  padding: 0 40px 20px;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #E8B4A0, transparent);
}

.title-ampersand {
  font-family: 'PARISIAN', serif;
  font-size: 4rem;
  color: #E8B4A0;
  font-weight: 400;
}

.photo-slider {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.photo-slider-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.photo-slide {
  width: 100%;
  height: 100%;
  position: relative;
  cursor: pointer;
}

.photo-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.photo-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  display: block;
}

.photo-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.02) 100%);
  pointer-events: none;
}

.slider-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.8);
  border: none;
  color: #2c2c2c;
  font-size: 3rem;
  cursor: pointer;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
  z-index: 10;
  opacity: 0.7;
}

.slider-arrow:hover {
  background: rgba(255, 255, 255, 0.95);
  opacity: 1;
  transform: translateY(-50%) scale(1.1);
}

.slider-arrow-prev {
  left: 30px;
}

.slider-arrow-next {
  right: 30px;
}

.slider-dots {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
  z-index: 10;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid rgba(255, 255, 255, 0.8);
}

.dot:hover {
  background: rgba(255, 255, 255, 0.8);
  transform: scale(1.2);
}

.dot.active {
  background: #E8B4A0;
  border-color: #E8B4A0;
  width: 14px;
  height: 14px;
}

/* Transition animations */
.slide-fade-enter-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.slide-fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: scale(1.05);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* Lightbox */
.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  cursor: pointer;
}

.lightbox-image {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
}

.lightbox-close {
  position: absolute;
  top: 20px;
  right: 30px;
  background: none;
  border: none;
  color: #fff;
  font-size: 3rem;
  cursor: pointer;
  z-index: 10001;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.lightbox-close:hover {
  transform: scale(1.2);
}

.lightbox-prev,
.lightbox-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: #fff;
  font-size: 3rem;
  cursor: pointer;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background 0.3s ease;
  z-index: 10001;
}

.lightbox-prev {
  left: 30px;
}

.lightbox-next {
  right: 30px;
}

.lightbox-prev:hover,
.lightbox-next:hover {
  background: rgba(255, 255, 255, 0.4);
}

@media (max-width: 1024px) {
  .slider-arrow {
    width: 50px;
    height: 50px;
    font-size: 2.5rem;
  }
  
  .slider-arrow-prev {
    left: 20px;
  }
  
  .slider-arrow-next {
    right: 20px;
  }
  
  .slider-dots {
    bottom: 20px;
  }
}

@media (max-width: 768px) {
  .photo-collage-section {
    padding: 40px 0;
  }
  
  .section-title {
    font-size: 2.5rem;
    letter-spacing: 6px;
    margin-bottom: 30px;
    gap: 10px;
    padding: 0 20px 15px;
  }
  
  .title-ampersand {
    font-size: 2.5rem;
  }
  
  .photo-slider {
    height: calc(100vh - 150px);
  }
  
  .slider-arrow {
    width: 45px;
    height: 45px;
    font-size: 2rem;
  }
  
  .slider-arrow-prev {
    left: 15px;
  }
  
  .slider-arrow-next {
    right: 15px;
  }
  
  .slider-dots {
    bottom: 15px;
    gap: 10px;
  }
  
  .dot {
    width: 10px;
    height: 10px;
  }
  
  .dot.active {
    width: 12px;
    height: 12px;
  }
  
  .lightbox-close {
    top: 10px;
    right: 15px;
    font-size: 2rem;
  }
  
  .lightbox-prev,
  .lightbox-next {
    width: 40px;
    height: 40px;
    font-size: 2rem;
  }
  
  .lightbox-prev {
    left: 15px;
  }
  
  .lightbox-next {
    right: 15px;
  }
}

@media (max-width: 480px) {
  .photo-collage-section {
    padding: 30px 0;
  }
  
  .section-title {
    font-size: 1.8rem;
    letter-spacing: 4px;
    margin-bottom: 25px;
    gap: 8px;
    flex-wrap: wrap;
    padding: 0 15px 12px;
  }
  
  .title-ampersand {
    font-size: 1.8rem;
  }
  
  .photo-slider {
    height: calc(100vh - 120px);
  }
  
  .slider-arrow {
    width: 40px;
    height: 40px;
    font-size: 1.8rem;
  }
  
  .slider-arrow-prev {
    left: 10px;
  }
  
  .slider-arrow-next {
    right: 10px;
  }
  
  .slider-dots {
    bottom: 10px;
    gap: 8px;
  }
  
  .dot {
    width: 8px;
    height: 8px;
  }
  
  .dot.active {
    width: 10px;
    height: 10px;
  }
}
</style>

