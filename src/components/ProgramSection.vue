<template>
  <section class="program-section" id="program">
    <div class="container">
      <h2 class="section-title">Wedding Day Schedule</h2>
      <div class="program-timeline">
        <div class="timeline-item" v-for="(item, index) in timeline" :key="index" :class="{ 'left': index % 2 === 0, 'right': index % 2 === 1 }">
          <div class="timeline-content">
            <div class="timeline-time">{{ item.time }}</div>
            <h3>{{ item.title }}</h3>
            <p v-if="item.description2">
              {{ item.description }}<br>{{ item.description2 }}
            </p>
            <p v-else>{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const timeline = ref([
  {
    time: '14:00',
    title: 'Фуршет',
    description: 'Сбор гостей'
  },
  {
    time: '15:00',
    title: 'Церемония',
    description: 'Выездная регистрация'
  },
  {
    time: '16:00',
    title: 'Банкет',
    description: 'Время вкусной еды, танцев и веселья!'
  },
  {
    time: '23:00',
    title: 'Свадебный торт',
    description: 'Красивое окончание вечера'
  }
])
</script>

<style scoped>
.program-section {
  padding: 80px 20px;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.program-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('https://i1.imageban.ru/out/2025/12/28/02e6a3d976c75496a38b9d16107831d5.jpg') center/cover no-repeat;
  background-size: cover;
  filter: grayscale(100%);
  opacity: 0.3;
  z-index: 0;
}

.program-section .container {
  position: relative;
  z-index: 1;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-family: 'Playfair Display', serif;
  font-size: 3rem;
  font-weight: 300;
  letter-spacing: 5px;
  color: #fff;
  text-align: center;
  margin-bottom: 3rem;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  position: relative;
  z-index: 1;
}

.program-timeline {
  max-width: 900px;
  margin: 3rem auto 0;
  position: relative;
  padding: 0 20px;
}

.program-timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #fff;
  transform: translateX(-50%);
  z-index: 1;
}

.timeline-item {
  position: relative;
  margin-bottom: 3.5rem;
  width: 50%;
}

.timeline-item.left {
  left: 0;
  padding-right: 3rem;
  text-align: right;
}

.timeline-item.right {
  left: 50%;
  padding-left: 3rem;
  text-align: left;
}

.timeline-content {
  position: relative;
}

.timeline-time {
  font-size: 1.3rem;
  font-weight: 700;
  color: #fff;
  font-family: 'Playfair Display', serif;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  margin-bottom: 0.5rem;
}

.timeline-content h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.3rem;
  margin-bottom: 0.3rem;
  color: #fff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  font-weight: 400;
}

.timeline-content p {
  color: rgba(255, 255, 255, 0.9);
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.4rem;
  line-height: 1.2;
  font-weight: 400;
  letter-spacing: 0.5px;
  font-style: italic;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

@media (max-width: 768px) {
  .program-section {
    padding: 60px 15px;
    min-height: auto;
  }
  
  .section-title {
    font-size: 2rem;
    letter-spacing: 3px;
    margin-bottom: 2rem;
  }
  
  .program-timeline {
    padding: 0 10px;
    margin-top: 2rem;
  }
  
  .program-timeline::before {
    left: 50%;
    transform: translateX(-50%);
  }
  
  .timeline-item {
    width: 45% !important;
    margin-bottom: 2.5rem;
  }
  
  .timeline-item.left {
    left: 0 !important;
    padding-right: 2rem !important;
    padding-left: 0 !important;
    text-align: right !important;
  }
  
  .timeline-item.right {
    left: 55% !important;
    padding-left: 2rem !important;
    padding-right: 0 !important;
    text-align: left !important;
  }
  
  .timeline-content {
    max-width: 100%;
  }
  
  .timeline-time {
    font-size: 1.1rem;
  }
  
  .timeline-content h3 {
    font-size: 1.1rem;
  }
  
  .timeline-content p {
    font-size: 1.2rem;
    line-height: 1.2;
    font-weight: 400;
    letter-spacing: 0.5px;
    font-style: italic;
  }
}

@media (max-width: 480px) {
  .program-section {
    padding: 40px 10px;
  }
  
  .section-title {
    font-size: 1.5rem;
    letter-spacing: 2px;
    margin-bottom: 1.5rem;
  }
  
  .program-timeline {
    padding: 0 5px;
    margin-top: 1.5rem;
  }
  
  .program-timeline::before {
    left: 50%;
    transform: translateX(-50%);
  }
  
  .timeline-item {
    width: 48% !important;
    margin-bottom: 2rem;
  }
  
  .timeline-item.left {
    left: 0 !important;
    padding-right: 1.5rem !important;
    padding-left: 0 !important;
    text-align: right !important;
  }
  
  .timeline-item.right {
    left: 52% !important;
    padding-left: 1.5rem !important;
    padding-right: 0 !important;
    text-align: left !important;
  }
  
  .timeline-time {
    font-size: 1rem;
    margin-bottom: 0.3rem;
  }
  
  .timeline-content h3 {
    font-size: 1rem;
    margin-bottom: 0.2rem;
  }
  
  .timeline-content p {
    font-size: 1.1rem;
    line-height: 1.2;
    font-weight: 400;
    letter-spacing: 0.5px;
    font-style: italic;
  }
}
</style>
