<template>
  <section class="about-section" id="about">
    <div class="about-overlay"></div>
    <div class="about-content">
      <div class="title-wrapper">
        <h2 class="about-title">OUR HISTORY</h2>
      </div>
      <audio ref="audioPlayer" :src="musicSrc" loop></audio>
      
      <div class="about-text">
        <div class="text-overlay"></div>
        <p class="about-paragraph">
          Иногда самые важные пути пересекаются там, где их совсем не ждешь. Наша история началась не под залпы салюта, а в тихой гармонии случайной встречи. Мы познакомились на общем дружеском пикнике.
        </p>
        <p class="about-paragraph">
          Тогда мы еще не знали, что этот миг станет первой страницей нашей большой книги. Всё начиналось с легкого общения, долгих разговоров о чем угодно и ни о чем, с искренних улыбок и ощущения, что тебя понимают без слов. Дружба постепенно, как первый солнечный луч на рассвете, переросла во что-то большее — в трепетное и волнующее чувство, которое мы оба боялись и ждали одновременно.
        </p>
        <p class="about-paragraph">
          Наши отношения развивались естественно, как смена времен года. Мы узнавали друг друга в мелочах: в любимых песнях, в отношении к жизни, в умении радоваться простым вещам. Каждый совместный шаг делал нас ближе и увереннее в своем выборе.
        </p>
        <p class="about-paragraph">
          Мы построили наши отношения на доверии, поддержке и бесконечном уважении друг к другу. Мы научились быть опорой и вдохновением, делиться радостями и вместе идти через трудности.
        </p>
        <p class="about-paragraph">
          Теперь мы знаем точно: наше «однажды» плавно перетекло в «навсегда». И мы с радостью приглашаем вас разделить с нами начало этого «навсегда» в день нашей свадьбы.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const audioPlayer = ref(null)
const musicSrc = import.meta.env.BASE_URL + 'mus.mp3'

const startMusic = () => {
  if (!audioPlayer.value) return
  
  audioPlayer.value.play().catch(error => {
    console.error('Error playing music:', error)
  })
}

const handleStartMusic = () => {
  startMusic()
}

onMounted(() => {
  if (audioPlayer.value) {
    // Устанавливаем громкость на 50%
    audioPlayer.value.volume = 0.5
  }
  
  // Слушаем событие для запуска музыки из прелоадера
  window.addEventListener('start-music', handleStartMusic)
})

onUnmounted(() => {
  // Удаляем слушатель событий
  window.removeEventListener('start-music', handleStartMusic)
  
  if (audioPlayer.value) {
    audioPlayer.value.pause()
    audioPlayer.value = null
  }
})
</script>

<style scoped>
.about-section {
  width: 100%;
  min-height: 500px;
  background-image: url('https://i6.imageban.ru/out/2025/12/22/f02bfab3bee2e844b473eb3a8b3df752.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 100px 20px;
  position: relative;
}

.about-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0);
  z-index: 0;
}

.about-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, #E8B4A0, transparent);
  z-index: 2;
}

.about-section::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, #E8B4A0, transparent);
  z-index: 2;
}

.about-content {
  max-width: 900px;
  text-align: center;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.title-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2.5rem;
  position: relative;
}

.about-title {
  font-family: 'Playfair Display', serif;
  font-size: 4rem;
  font-weight: 300;
  letter-spacing: 8px;
  text-transform: uppercase;
  color: #fff;
  position: relative;
  display: inline-block;
  margin: 0;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}

.about-title::after {
  content: '';
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #E8B4A0, transparent);
}


.about-text {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.4rem;
  line-height: 1.4;
  color: #000;
  font-weight: 400;
  letter-spacing: 0.5px;
  font-style: italic;
  position: relative;
  padding: 30px;
  border-radius: 8px;
}

.text-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  z-index: -1;
}

.about-paragraph {
  margin-bottom: 1rem;
  opacity: 0.9;
  transition: opacity 0.3s ease;
  max-width: 85%;
  position: relative;
  z-index: 1;
}

.about-paragraph:nth-child(odd) {
  text-align: left;
  margin-left: 0;
  margin-right: auto;
}

.about-paragraph:nth-child(even) {
  text-align: right;
  margin-left: auto;
  margin-right: 0;
}

.about-paragraph:hover {
  opacity: 1;
}

.about-paragraph:last-child {
  margin-bottom: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .about-section {
    padding: 60px 20px;
    min-height: 300px;
    background-attachment: scroll;
  }

  .title-wrapper {
    margin-bottom: 2rem;
  }

  .about-title {
    font-size: 2.5rem;
    letter-spacing: 4px;
  }
  

  .about-text {
    font-size: 1.2rem;
    line-height: 1.4;
  }
  
  .about-paragraph {
    margin-bottom: 0.8rem;
    max-width: 90%;
  }
}

@media (max-width: 480px) {
  .about-section {
    background-attachment: scroll;
  }
  

  .about-title {
    font-size: 2rem;
    letter-spacing: 2px;
  }
  

  .about-text {
    font-size: 1rem;
    line-height: 1.3;
  }
  
  .about-paragraph {
    margin-bottom: 0.7rem;
    max-width: 95%;
  }
}
</style>






