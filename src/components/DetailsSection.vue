<template>
  <section class="details-section" id="details">
    <div class="container">
      <h2 class="section-title">DETAILS OF THE CELEBRATION</h2>
      <div class="details-grid">
        <div 
          class="detail-item" 
          :class="{ 'no-animation': detail.type === 'dresscode' || detail.type === 'date' || detail.type === 'location' }"
          v-for="(detail, index) in details" 
          :key="index"
        >
          <h3 class="detail-title">{{ detail.title }}</h3>
          <p class="detail-main">{{ detail.main }}</p>
          <p class="detail-time" v-if="detail.time">{{ detail.time }}</p>
          <p class="detail-note" v-if="detail.note">{{ detail.note }}</p>
          
          <!-- Кнопка добавления в календарь для даты -->
          <a 
            v-if="detail.type === 'date'" 
            :href="calendarLink" 
            class="action-button"
            target="_blank"
            @click.stop
          >
            ADD TO CALENDAR
          </a>
          
          <!-- Кнопка открытия карты для места -->
          <button 
            v-if="detail.type === 'location' && detail.mapLink" 
            class="action-button"
            @click.stop="openMap(detail.mapLink)"
          >
            OPEN MAP
          </button>
          
          <!-- Кнопка открытия галереи для дресс-кода -->
          <button 
            v-if="detail.type === 'dresscode'" 
            class="action-button"
            @click.stop="openDressCodeGallery"
          >
            VIEW GALLERY
          </button>
        </div>
      </div>
    </div>
    
    <!-- Lightbox для галереи дресс-кода -->
    <div v-if="lightboxOpen" class="lightbox" @click="closeLightbox">
      <button class="lightbox-close" @click="closeLightbox">×</button>
      <button class="lightbox-prev" @click.stop="prevPhoto">‹</button>
      <button class="lightbox-next" @click.stop="nextPhoto">›</button>
      <img :src="dressCodePhotos[currentIndex].src" :alt="dressCodePhotos[currentIndex].alt" class="lightbox-image">
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const details = ref([
  {
    title: 'DATE',
    main: '10 Сентября 2026',
    time: '12:00',
    type: 'date'
  },
  {
    title: 'VENUE',
    main: 'Усадьба Марьино',
    time: 'Адрес места проведения',
    type: 'location',
    mapLink: 'https://yandex.ru/maps/-/CLDPUD4G'
  },
  {
    title: 'DRESS CODE',
    main: 'Вечерний наряд',
    note: 'Мы будем рады видеть вас в праздничных нарядах',
    type: 'dresscode'
  }
])

const calendarLink = computed(() => {
  const startDate = '20260910T090000'
  const endDate = '20260910T160000'
  const title = encodeURIComponent('Свадьба NIKITA & ALINA')
  const description = encodeURIComponent('Свадьба NIKITA & ALINA\nУсадьба Марьино')
  const location = encodeURIComponent('Усадьба Марьино')
  
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${startDate}/${endDate}&text=${title}&details=${description}&location=${location}`
})

const openMap = (mapLink) => {
  window.open(mapLink, '_blank')
}

const dressCodePhotos = ref([
  { src: 'https://i4.imageban.ru/out/2025/12/24/502e8967b8d11b76cedbdf2a0878fc8b.jpg', alt: 'Dress code photo 1' },
  { src: 'https://i3.imageban.ru/out/2025/12/24/aa22ef772f48a5827a28f13a1d3dd08c.jpg', alt: 'Dress code photo 2' },
  { src: 'https://i5.imageban.ru/out/2025/12/24/400f55f579cfbe41f701798a9d73bfae.jpg', alt: 'Dress code photo 3' },
  { src: 'https://i1.imageban.ru/out/2025/12/24/34e73e48401bc585c801d75d878459e8.jpg', alt: 'Dress code photo 4' },
  { src: 'https://i2.imageban.ru/out/2025/12/24/90a9eeafabe97e2fd63d6b79bd6696d8.jpg', alt: 'Dress code photo 5' },
  { src: 'https://i3.imageban.ru/out/2025/12/24/0a22b71b7bcd3705bfe0b6ec7a2b754d.jpg', alt: 'Dress code photo 6' },
  { src: 'https://i2.imageban.ru/out/2025/12/24/2712492c8ca7b17a5e1fbaaed76b1566.jpg', alt: 'Dress code photo 7' },
  { src: 'https://i4.imageban.ru/out/2025/12/24/216700644be4720de55030110e6a3510.jpg', alt: 'Dress code photo 8' },
  { src: 'https://i8.imageban.ru/out/2025/12/24/5af2003fe44506db2d39ac1cc6cb9048.jpg', alt: 'Dress code photo 9' },
  { src: 'https://i4.imageban.ru/out/2025/12/24/a64c1d61a8d80caae839f191c87854c0.jpg', alt: 'Dress code photo 10' },
  { src: 'https://i4.imageban.ru/out/2025/12/24/51d78720520a5c5194050c8265df862e.jpg', alt: 'Dress code photo 11' },
  { src: 'https://i2.imageban.ru/out/2025/12/24/80b50a77dbafbbab0f9ad0f5e8568526.jpg', alt: 'Dress code photo 12' },
  { src: 'https://i1.imageban.ru/out/2025/12/24/52dcb11949909c879350e4d1e239b03a.jpg', alt: 'Dress code photo 13' },
  { src: 'https://i7.imageban.ru/out/2025/12/24/684d1321eadaacfe2e00b3587815a6e7.jpg', alt: 'Dress code photo 14' },
  { src: 'https://i4.imageban.ru/out/2025/12/24/f2189ba861d01772c0cb1bc8c2eb1874.jpg', alt: 'Dress code photo 15' },
  { src: 'https://i5.imageban.ru/out/2025/12/24/5355ba5ad44619acd3ec3b65afe95fb8.jpg', alt: 'Dress code photo 16' },
  { src: 'https://i4.imageban.ru/out/2025/12/24/c4ae1ebabfcc80c9ca4b292598a020f0.jpg', alt: 'Dress code photo 17' },
  { src: 'https://i4.imageban.ru/out/2025/12/24/63d8ae87ec22526233d08e435c0cc6d7.jpg', alt: 'Dress code photo 18' }
])

const lightboxOpen = ref(false)
const currentIndex = ref(0)

const openDressCodeGallery = () => {
  if (dressCodePhotos.value.length > 0) {
    currentIndex.value = 0
    lightboxOpen.value = true
    document.body.style.overflow = 'hidden'
  }
}

const closeLightbox = () => {
  lightboxOpen.value = false
  document.body.style.overflow = ''
}

const nextPhoto = () => {
  currentIndex.value = (currentIndex.value + 1) % dressCodePhotos.value.length
}

const prevPhoto = () => {
  currentIndex.value = (currentIndex.value - 1 + dressCodePhotos.value.length) % dressCodePhotos.value.length
}
</script>

<style scoped>
.details-section {
  padding: 100px 20px;
  background: linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%);
  text-align: center;
  position: relative;
}

.details-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, #E8B4A0, transparent);
}

.details-section::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, #E8B4A0, transparent);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-family: 'Playfair Display', serif;
  font-size: 3.5rem;
  font-weight: 300;
  letter-spacing: 8px;
  color: #2c2c2c;
  margin-bottom: 4rem;
  text-transform: uppercase;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
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

.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 50px;
  margin-top: 60px;
}

.detail-item {
  padding: 30px 40px 50px;
  background: #fff;
  border-radius: 0;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  border-top: 2px solid #E8B4A0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  min-height: 320px;
}

.detail-item:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.detail-item.no-animation {
  transition: none;
}

.detail-item.no-animation:hover {
  transform: none;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.detail-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.8rem;
  font-weight: 300;
  letter-spacing: 4px;
  color: #2c2c2c;
  margin-bottom: 12px;
  text-transform: uppercase;
  position: relative;
  display: inline-block;
}

.detail-title::after {
  content: '';
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #E8B4A0, transparent);
}

.detail-main {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.5rem;
  color: #444;
  margin: 8px 0;
  font-weight: 400;
  line-height: 1.6;
}

.detail-time {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.2rem;
  color: #666;
  margin-top: 5px;
  font-style: italic;
}

.detail-note {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1rem;
  color: #888;
  margin-top: 3px;
  margin-bottom: 5px;
  font-style: italic;
  line-height: 1.6;
  max-width: 90%;
}

.action-button {
  display: inline-block;
  margin-top: auto;
  padding: 12px 30px;
  background: transparent;
  color: #E8B4A0;
  text-decoration: none;
  border: 1px solid #E8B4A0;
  border-radius: 0;
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.1rem;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  text-transform: uppercase;
  cursor: pointer;
}

.action-button:hover {
  background: #E8B4A0;
  color: #fff;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .section-title {
    font-size: 1.8rem;
    letter-spacing: 3px;
    flex-wrap: wrap;
    gap: 5px;
    line-height: 1.2;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
  
  .section-title::after {
    display: none;
  }
  
  .details-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .detail-item {
    padding: 25px 30px 40px;
  }
  
  .detail-title {
    font-size: 1.5rem;
  }
  
  .detail-main {
    font-size: 1.3rem;
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 1.3rem;
    letter-spacing: 2px;
    gap: 5px;
  }
}

/* Lightbox для галереи дресс-кода */
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

@media (max-width: 768px) {
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
</style>
