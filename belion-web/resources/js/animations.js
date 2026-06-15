import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'

gsap.registerPlugin(ScrollTrigger)

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function initAnimations() {
  if (prefersReducedMotion) {
    document.querySelectorAll('[data-animate]').forEach((el) => {
      el.style.opacity = '1'
    })
    return
  }

  gsap.utils.toArray('[data-animate="fade-up"]').forEach((el) => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
      y: 80,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    })
  })

  gsap.utils.toArray('[data-animate="fade-in"]').forEach((el) => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' },
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    })
  })

  gsap.utils.toArray('[data-animate="scale-in"]').forEach((el) => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
      scale: 0.92,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
    })
  })

  gsap.utils.toArray('[data-animate="stagger-children"]').forEach((container) => {
    gsap.from(container.children, {
      scrollTrigger: { trigger: container, start: 'top 80%', toggleActions: 'play none none none' },
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power3.out',
    })
  })

  gsap.utils.toArray('[data-animate="parallax"]').forEach((el) => {
    gsap.to(el, {
      scrollTrigger: {
        trigger: el.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
      yPercent: 20,
      ease: 'none',
    })
  })

  gsap.utils.toArray('[data-counter]').forEach((el) => {
    const target = el.dataset.counter || '0'
    const obj = { val: 0 }
    gsap.to(obj, {
      scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
      val: parseInt(target.replace(/\D/g, ''), 10) || 0,
      duration: 2,
      ease: 'power2.out',
      onUpdate: () => {
        el.textContent = target.includes('+') ? `${Math.round(obj.val)}+` : String(Math.round(obj.val))
      },
    })
  })
}
