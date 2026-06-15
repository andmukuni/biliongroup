import Inquiry from '#models/inquiry'
import { contactValidator } from '#validators/contact_validator'
import type { HttpContext } from '@adonisjs/core/http'
import mail from '@adonisjs/mail/services/main'

export default class ContactController {
  async store({ request, response, session }: HttpContext) {
    const payload = await request.validateUsing(contactValidator)

    await Inquiry.create({
      fullName: payload.fullName,
      company: payload.company ?? null,
      email: payload.email,
      phone: payload.phone ?? null,
      serviceInterest: payload.serviceInterest,
      message: payload.message,
      status: 'new',
    })

    try {
      await mail.send((message) => {
        message
          .to(process.env.CONTACT_NOTIFY_EMAIL || 'sales@beliongroupe.com')
          .from(process.env.MAIL_FROM_ADDRESS || 'sales@beliongroupe.com')
          .subject(`New inquiry from ${payload.fullName}`)
          .html(`
            <h2>New Contact Inquiry</h2>
            <p><strong>Name:</strong> ${payload.fullName}</p>
            <p><strong>Company:</strong> ${payload.company || 'N/A'}</p>
            <p><strong>Email:</strong> ${payload.email}</p>
            <p><strong>Phone:</strong> ${payload.phone || 'N/A'}</p>
            <p><strong>Service Interest:</strong> ${payload.serviceInterest}</p>
            <p><strong>Message:</strong></p>
            <p>${payload.message}</p>
          `)
      })
    } catch {
      // Inquiry saved even if mail fails in development
    }

    session.flash('success', `Thank you, ${payload.fullName}! We will contact you shortly.`)
    return response.redirect().toRoute('contact')
  }
}
