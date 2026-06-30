import { company } from '#data/company'
import type { HttpContext } from '@adonisjs/core/http'

export default class PagesController {
  private baseView(view: string, ctx: HttpContext, extra: Record<string, unknown> = {}) {
    const currentPath = ctx.request.url().split('?')[0] || '/'
    return ctx.view.render(`pages/${view}`, {
      company,
      currentPath,
      ...extra,
    })
  }

  async home(ctx: HttpContext) {
    return this.baseView('home', ctx, {
      title: 'Home',
      description: `${company.name} — ${company.tagline}. ${company.motto}.`,
    })
  }

  async about(ctx: HttpContext) {
    return this.baseView('about', ctx, {
      title: 'About Us',
      description: company.description,
    })
  }

  async visionMission(ctx: HttpContext) {
    return this.baseView('vision_mission', ctx, {
      title: 'Vision & Mission',
      description: company.vision,
    })
  }

  async services(ctx: HttpContext) {
    return this.baseView('services', ctx, {
      title: 'Products & Services',
      description: 'IT, technology, multimedia and equipment supply services.',
    })
  }

  async projects(ctx: HttpContext) {
    return this.baseView('projects', ctx, {
      title: 'Projects Portfolio',
      description: 'Our project portfolio across telecoms, industrial, and technology sectors.',
    })
  }

  async compliance(ctx: HttpContext) {
    return this.baseView('compliance', ctx, {
      title: 'Compliance & Certifications',
      description: 'Statutory compliance certificates and registrations.',
    })
  }

  async contact(ctx: HttpContext) {
    const { session, request } = ctx
    return this.baseView('contact', ctx, {
      title: 'Contact Us',
      description: 'Get in touch with Belion Groupe Limited.',
      flashSuccess: session.flashMessages.get('success'),
      flashError: session.flashMessages.get('error'),
      old: request.qs(),
    })
  }
}
