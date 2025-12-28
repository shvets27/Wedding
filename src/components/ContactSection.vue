<template>
  <section class="contact-section" id="contact">
    <div class="container">
      <h2 class="section-title">CONTACTS</h2>
      <div class="contact-grid">
        <div class="contact-card" v-for="contact in contacts" :key="contact.id">
          <div class="card-border-top"></div>
          <div class="card-content">
            <div class="card-header">
              <div class="decorative-line"></div>
              <h3 class="contact-role">{{ contact.role }}</h3>
              <div class="decorative-line"></div>
            </div>
            <div class="card-body">
              <p class="contact-name">{{ contact.name }}</p>
              <div class="card-divider"></div>
              <a :href="`tel:${contact.phone}`" class="contact-phone">{{ contact.phone }}</a>
            </div>
          </div>
          <div class="card-border-bottom"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const contacts = ref([
  {
    id: 1,
    role: 'Жених',
    name: 'Никита',
    phone: '+7 (981) 827-96-13'
  },
  {
    id: 2,
    role: 'Невеста',
    name: 'Алина',
    phone: '+7 (981) 840-44-94'
  }
])
</script>

<style scoped>
.contact-section {
  padding: 80px 20px;
  background: linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%);
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
  color: #2c2c2c;
  text-align: center;
  margin-bottom: 3rem;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  margin-top: 2rem;
}

.contact-card {
  background: #fff;
  padding: 0;
  border-radius: 0;
  text-align: center;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(232, 180, 160, 0.2);
  min-height: 280px;
  display: flex;
  flex-direction: column;
}

.contact-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.card-border-top,
.card-border-bottom {
  height: 4px;
  background: linear-gradient(90deg, transparent, #E8B4A0, transparent);
  width: 100%;
}

.card-border-top {
  margin-bottom: 0;
}

.card-border-bottom {
  margin-top: auto;
}

.card-content {
  padding: 50px 40px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-bottom: 30px;
}

.decorative-line {
  width: 40px;
  height: 1px;
  background: #E8B4A0;
  flex-shrink: 0;
}

.contact-role {
  font-family: 'Playfair Display', serif;
  font-size: 1.2rem;
  color: #2c2c2c;
  font-weight: 300;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin: 0;
  white-space: nowrap;
}

.card-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.contact-name {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.5rem;
  color: #2c2c2c;
  margin: 0;
  font-weight: 400;
  letter-spacing: 1px;
}

.card-divider {
  width: 60px;
  height: 1px;
  background: linear-gradient(90deg, transparent, #E8B4A0, transparent);
  margin: 5px 0;
}

.contact-phone {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.4rem;
  color: #666;
  text-decoration: none;
  display: block;
  transition: color 0.3s ease;
  letter-spacing: 0.5px;
  font-weight: 400;
}

.contact-phone:hover {
  color: #E8B4A0;
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }
  
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  .card-content {
    padding: 40px 30px;
  }
  
  .contact-name {
    font-size: 2rem;
  }
  
  .contact-phone {
    font-size: 1.2rem;
  }
  
  .decorative-line {
    width: 30px;
  }
  
  .card-header {
    gap: 10px;
  }
}
</style>
