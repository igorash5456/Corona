# 📧 НАСТРОЙКА ОТПРАВКИ EMAIL

## Шаг 1: Регистрация на EmailJS
1. Перейдите на https://www.emailjs.com/
2. Нажмите "Sign Up" и создайте аккаунт
3. Подтвердите email

## Шаг 2: Создание Email Service
1. Перейдите в меню "Email Services"
2. Нажмите "Create New Service"
3. Выберите Gmail (или другого провайдера):
   - Service Name: любое имя (например: "corona-restaurant")
   - Gmail email: igorash5456@gmail.com
   - Gmail App Password: [сгенерируйте приложение пароль]

### Как создать Gmail App Password:
1. Перейдите на https://myaccount.google.com/
2. Левое меню → "Безопасность"
3. Включите 2-факторную аутентификацию
4. В разделе "Пароли приложений" выберите:
   - Приложение: Mail
   - Устройство: Windows/Mac/Linux
5. Скопируйте генерированный пароль
6. Вставьте его в EmailJS

## Шаг 3: Создание Email Template
1. В меню EmailJS выберите "Email Templates"
2. Нажмите "Create New Template"
3. Заполните следующие поля:

### Template Name:
```
Corona Contact Form
```

### Template ID:
```
corona_contact_template
```

### Содержимое письма (в разделе Content):
```
Новый заказ с сайта Corona Restaurant

Имя: {{from_name}}
Email: {{from_email}}
Телефон: {{phone}}
Дата заказа: {{date}}

Сообщение:
{{message}}

---
Это автоматическое письмо с сайта Corona Restaurant
```

## Шаг 4: Получение Service ID и Template ID
1. Нажмите на только что созданный сервис
2. Скопируйте:
   - **Service ID** (например: `service_abc123def456`)
   - **Template ID** (например: `corona_contact_template`)

## Шаг 5: Обновление script.js

В файле `script.js` найдите строки:

```javascript
emailjs.init('SERVICE_ID'); // Замените SERVICE_ID
```

и 

```javascript
emailjs.send('SERVICE_ID', 'TEMPLATE_ID', templateParams)
```

Замените:
- `SERVICE_ID` → ваш Service ID из шага 4
- `TEMPLATE_ID` → ваш Template ID из шага 4

### Пример заполнения:
```javascript
emailjs.init('service_abc123def456');

emailjs.send('service_abc123def456', 'corona_contact_template', templateParams)
```

## Шаг 6: Проверка
1. Откройте сайт в браузере
2. Заполните форму контакта
3. Нажмите "Отправить"
4. Проверьте email igorash5456@gmail.com

## ✅ Готово!

Теперь при заполнении формы на сайте, письмо будет автоматически отправлено на igorash5456@gmail.com

---

## 🔐 ВАЖНО: Защита API Key

Метод выше отправляет запросы с клиентской стороны. Это не требует backend, но:

**Безопасность:**
- EmailJS ограничивает отправки по количеству (free план: 200 писем/месяц)
- Защитите ваш Service ID, ограничив домены в настройках EmailJS

**Как ограничить домены:**
1. В EmailJS → Account → API Keys
2. Установите "Domain Whitelist" (только ваш домен)

---

## 📱 АЛЬТЕРНАТИВА: Использование Backend

Для большей безопасности используйте backend на Node.js/Python:

### Пример на Node.js (Express):
```javascript
const nodemailer = require('nodemailer');
const express = require('express');
const app = express();

app.post('/send-email', async (req, res) => {
    const { name, email, phone, message } = req.body;
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'igorash5456@gmail.com',
            pass: 'ваш_app_password'
        }
    });
    
    const mailOptions = {
        from: email,
        to: 'igorash5456@gmail.com',
        subject: `Новый заказ от ${name}`,
        html: `
            <h2>Новый заказ с сайта Corona</h2>
            <p><strong>Имя:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Телефон:</strong> ${phone}</p>
            <p><strong>Сообщение:</strong><br>${message}</p>
        `
    };
    
    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

---

## 📞 ПОДДЕРЖКА

Если у вас возникли проблемы:
1. Проверьте Service ID и Template ID
2. Убедитесь, что Gmail App Password правильный
3. Проверьте консоль браузера (F12 → Console) на ошибки
4. Посетите https://www.emailjs.com/docs/ для подробной документации
