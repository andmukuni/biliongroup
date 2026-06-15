import { defineConfig, transports } from '@adonisjs/mail'

const mailConfig = defineConfig({
  default: 'smtp',

  mailers: {
    smtp: transports.smtp({
      host: process.env.SMTP_HOST || 'localhost',
      port: Number(process.env.SMTP_PORT || 587),
      auth: {
        type: 'login',
        user: process.env.SMTP_USERNAME || '',
        pass: process.env.SMTP_PASSWORD || '',
      },
    }),
  },
})

export default mailConfig
