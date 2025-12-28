<template>
  <section class="rsvp-section" id="rsvp">
    <div class="rsvp-overlay"></div>
    <div class="container">
      <form class="rsvp-form" @submit.prevent="handleSubmit" v-if="!showSuccess">
        <h2 class="section-title">Анкета гостя</h2>
        <p class="rsvp-subtitle">Пожалуйста, заполните анкету, чтобы мы могли лучше организовать праздник</p>
        <div class="form-group">
          <label for="name">Ваше имя и фамилия *</label>
          <input type="text" id="name" v-model="formData.name" placeholder="Иван Иванов" required>
        </div>

        <div class="form-group">
          <label for="phone">Ваш телефон *</label>
          <input type="tel" id="phone" v-model="formData.phone" placeholder="+7 (900) 123-45-67" required>
        </div>

        <div class="form-group">
          <label>Планируете ли вы присутствовать на свадьбе? *</label>
          <div class="radio-group">
            <label class="radio-label" v-for="option in attendanceOptions" :key="option.value">
              <input type="radio" name="attendance" :value="option.value" v-model="formData.attendance" required>
              <span class="radio-custom"></span>
              <span class="radio-text">{{ option.label }}</span>
            </label>
          </div>
        </div>

        <div class="form-group">
          <label>Какие напитки предпочитаете? (можно выбрать несколько)</label>
          <div class="checkbox-group">
            <label class="checkbox-label" v-for="drink in drinksOptions" :key="drink">
              <input type="checkbox" :value="drink" v-model="formData.drinks">
              <span class="checkbox-custom"></span>
              <span class="checkbox-text">{{ drink }}</span>
            </label>
          </div>
        </div>

        <div class="form-group">
          <label>Вы будете с детьми? *</label>
          <div class="radio-group">
            <label class="radio-label" v-for="option in childrenOptions" :key="option.value">
              <input type="radio" name="children" :value="option.value" v-model="formData.children" required>
              <span class="radio-custom"></span>
              <span class="radio-text">{{ option.label }}</span>
            </label>
          </div>
        </div>

        <div class="form-group" v-if="formData.children === 'yes'">
          <label for="childrenCount">Укажите количество детей</label>
          <input type="number" id="childrenCount" v-model.number="formData.childrenCount" placeholder="0" min="0" value="0">
        </div>

        <div class="form-group">
          <label>Какое горячее предпочитаете? *</label>
          <div class="radio-group">
            <label class="radio-label" v-for="course in mainCourseOptions" :key="course">
              <input type="radio" name="mainCourse" :value="course" v-model="formData.mainCourse" required>
              <span class="radio-custom"></span>
              <span class="radio-text">{{ course }}</span>
            </label>
          </div>
        </div>

        <div class="form-group">
          <label>Планируете ли вы остаться на второй день? *</label>
          <div class="radio-group">
            <label class="radio-label" v-for="option in secondDayOptions" :key="option.value">
              <input type="radio" name="secondDay" :value="option.value" v-model="formData.secondDay" required>
              <span class="radio-custom"></span>
              <span class="radio-text">{{ option.label }}</span>
            </label>
          </div>
        </div>

        <div class="form-group">
          <label for="message">Ваши пожелания</label>
          <textarea id="message" v-model="formData.message" placeholder="Напишите что-нибудь приятное..." rows="3"></textarea>
        </div>

        <button type="submit" class="btn-submit" :disabled="isSubmitting">
          <span class="btn-text">{{ isSubmitting ? 'Отправка...' : 'Отправить анкету' }}</span>
          <span class="btn-loader" v-if="isSubmitting">⏳</span>
        </button>
      </form>

      <div class="rsvp-success" v-if="showSuccess">
        <div class="success-icon">✓</div>
        <p>Спасибо! Мы получили вашу анкету ❤️</p>
        <p class="success-subtitle">Скоро мы свяжемся с вами для уточнения деталей</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRSVP } from '../composables/useRSVP'

const { submitRSVP } = useRSVP()

const formData = reactive({
  name: '',
  phone: '',
  attendance: '',
  drinks: [],
  children: '',
  childrenCount: 0,
  mainCourse: '',
  secondDay: '',
  message: ''
})

const isSubmitting = ref(false)
const showSuccess = ref(false)

const attendanceOptions = [
  { value: 'yes', label: 'Да, с удовольствием' },
  { value: 'no', label: 'К сожалению, не могу' }
]

const childrenOptions = [
  { value: 'yes', label: 'Да' },
  { value: 'no', label: 'Нет' }
]

const secondDayOptions = [
  { value: 'yes', label: 'Да' },
  { value: 'no', label: 'Нет' }
]

const drinksOptions = [
  'Шампанское',
  'Вино сухое белое',
  'Вино красное полусладкое',
  'Водка',
  'Коньяк'
]

const mainCourseOptions = ['Рыба', 'Мясо']

const handleSubmit = async () => {
  isSubmitting.value = true
  
  try {
    await submitRSVP({ ...formData })
    showSuccess.value = true
    
    // Сброс формы
    Object.assign(formData, {
      name: '',
      phone: '',
      attendance: '',
      drinks: [],
      children: '',
      childrenCount: 0,
      mainCourse: '',
      secondDay: '',
      message: ''
    })
  } catch (error) {
    console.error('Ошибка отправки:', error)
    alert('Произошла ошибка при отправке. Попробуйте позже.')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.rsvp-section {
  padding: 80px 20px;
  background: #484745;
  position: relative;
  background-image: url('https://i8.imageban.ru/out/2025/12/22/ee72edb4f9924ec0db43fdb32f11f885.jpg');
  background-size: contain;
  background-position: center;
  background-attachment: fixed;
  background-repeat: no-repeat;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.rsvp-overlay {
  display: none;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.rsvp-form .section-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2rem;
  font-weight: 400;
  letter-spacing: 1px;
  color: #000;
  text-align: center;
  margin-bottom: 0.5rem;
}

.rsvp-subtitle {
  text-align: center;
  font-family: 'Cormorant Garamond', serif;
  font-size: 1rem;
  color: #000;
  margin-bottom: 1.5rem;
  line-height: 1.3;
  font-weight: 400;
}

.rsvp-form {
  background: transparent;
  padding: 20px;
  border-radius: 15px;
  position: relative;
}

.rsvp-form::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.85);
  border-radius: 15px;
  z-index: -1;
}

.form-group {
  margin-bottom: 0.8rem;
}

.form-group label {
  display: block;
  font-family: 'Cormorant Garamond', serif;
  font-size: 1rem;
  color: #000;
  margin-bottom: 4px;
  font-weight: 400;
  line-height: 1.3;
}

.form-group input[type="text"],
.form-group input[type="tel"],
.form-group input[type="number"],
.form-group textarea {
  width: 100%;
  padding: 6px 10px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-family: 'Cormorant Garamond', serif;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  background: #fff;
  color: #000;
  line-height: 1.3;
  font-weight: 400;
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: #999;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #E8B4A0;
}

.radio-group,
.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.radio-label,
.checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-family: 'Cormorant Garamond', serif;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.3;
}

.radio-label input[type="radio"],
.checkbox-label input[type="checkbox"] {
  display: none;
}

.radio-custom,
.checkbox-custom {
  width: 24px;
  height: 24px;
  border: 2px solid #2c2c2c;
  border-radius: 50%;
  margin-right: 12px;
  position: relative;
  flex-shrink: 0;
  background: #fff;
  transition: all 0.2s ease;
}

.radio-label:hover .radio-custom,
.checkbox-label:hover .checkbox-custom {
  border-color: #E8B4A0;
}

.checkbox-custom {
  border-radius: 3px;
}

.radio-label input:checked + .radio-custom {
  background: #E8B4A0;
  border-color: #E8B4A0;
}

.radio-label input:checked + .radio-custom::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 8px;
  height: 8px;
  background: #000;
  border-radius: 50%;
}

.checkbox-label input:checked + .checkbox-custom {
  background: #E8B4A0;
  border-color: #E8B4A0;
}

.checkbox-label input:checked + .checkbox-custom::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #000;
  font-size: 16px;
  font-weight: 600;
  line-height: 1;
}

.radio-text,
.checkbox-text {
  color: #000;
}

.btn-submit {
  width: 100%;
  padding: 10px;
  background: #E8B4A0;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-family: 'Cormorant Garamond', serif;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
  margin-top: 10px;
}

.btn-submit:hover:not(:disabled) {
  background: #D4A5A0;
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.rsvp-success {
  text-align: center;
  padding: 60px 20px;
  background: transparent;
  border-radius: 15px;
  position: relative;
}

.rsvp-success::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 15px;
  z-index: -1;
}

.success-icon {
  font-size: 4rem;
  color: #E8B4A0;
  margin-bottom: 20px;
}

.rsvp-success p {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.5rem;
  color: #2c2c2c;
  margin: 10px 0;
}

.success-subtitle {
  font-size: 1.2rem;
  color: #666;
}

@media (max-width: 768px) {
  .rsvp-section {
    background-size: cover;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .rsvp-form {
    padding: 20px;
  }
}
</style>
