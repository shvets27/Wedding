const TELEGRAM_BOT_TOKEN = '8548278322:AAEqnfAgxru4XpzWMYx8dz5J1oWojalbAOM'
const TELEGRAM_CHAT_ID = '647597624'

export function useRSVP() {
  const submitRSVP = async (formData) => {
    // Сохраняем в localStorage
    const rsvps = JSON.parse(localStorage.getItem('rsvps') || '[]')
    rsvps.push({
      ...formData,
      timestamp: new Date().toISOString()
    })
    localStorage.setItem('rsvps', JSON.stringify(rsvps))

    // Формируем сообщение для Telegram
    const attendanceText = formData.attendance === 'yes' ? '✅ Да, с удовольствием' : '❌ К сожалению, не могу'
    const childrenText = formData.children === 'yes' ? `Да (${formData.childrenCount} детей)` : 'Нет'
    const drinksText = formData.drinks.length > 0 ? formData.drinks.join(', ') : 'Не указано'
    const secondDayText = formData.secondDay === 'yes' ? 'Да' : 'Нет'

    const telegramMessage = `
🎉 <b>Новая анкета гостя!</b>

👤 <b>Имя:</b> ${formData.name}
📱 <b>Телефон:</b> ${formData.phone}

🎊 <b>Присутствие:</b> ${attendanceText}
🍷 <b>Напитки:</b> ${drinksText}
👶 <b>С детьми:</b> ${childrenText}
🍽️ <b>Горячее:</b> ${formData.mainCourse}
📅 <b>Второй день:</b> ${secondDayText}

💬 <b>Пожелания:</b>
${formData.message || 'Нет пожеланий'}

⏰ <i>${new Date().toLocaleString('ru-RU')}</i>
    `.trim()

    // Отправляем в Telegram (не блокируем UI)
    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      sendToTelegram(telegramMessage).catch(err => {
        console.error('Ошибка отправки в Telegram (но данные сохранены):', err)
      })
    }
  }

  return {
    submitRSVP
  }
}

async function sendToTelegram(message) {
  const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`
  
  const formData = new URLSearchParams()
  formData.append('chat_id', TELEGRAM_CHAT_ID)
  formData.append('text', message)
  formData.append('parse_mode', 'HTML')
  
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 10000)
  
  try {
    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
      signal: controller.signal
    })

    clearTimeout(timeoutId)
    const result = await response.json()
    
    if (!result.ok) {
      throw new Error(result.description || 'Ошибка отправки в Telegram')
    }

    return result
  } catch (error) {
    clearTimeout(timeoutId)
    throw error
  }
}



