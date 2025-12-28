import { onMounted } from 'vue'

export function useScrollAnimations() {
  onMounted(() => {
    // Плавное появление элементов при прокрутке
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1'
          entry.target.style.transform = 'translateY(0)'
        }
      })
    }, observerOptions)

    // Наблюдаем за секциями
    document.querySelectorAll('section').forEach(section => {
      section.style.opacity = '0'
      section.style.transform = 'translateY(30px)'
      section.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
      observer.observe(section)
    })

    // Исключаем hero секцию из анимации
    const hero = document.querySelector('.hero-section')
    if (hero) {
      hero.style.opacity = '1'
      hero.style.transform = 'none'
    }
  })
}



