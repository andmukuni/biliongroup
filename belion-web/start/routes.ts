/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
*/

import router from '@adonisjs/core/services/router'

const PagesController = () => import('#controllers/pages_controller')
const ContactController = () => import('#controllers/contact_controller')

router.get('/health', async () => {
  return { status: 'ok', service: 'belion-web' }
})

router.get('/', [PagesController, 'home']).as('home')
router.get('/about', [PagesController, 'about']).as('about')
router.get('/vision-mission', [PagesController, 'visionMission']).as('visionMission')
router.get('/services', [PagesController, 'services']).as('services')
router.get('/projects', [PagesController, 'projects']).as('projects')
router.get('/compliance', [PagesController, 'compliance']).as('compliance')
router.get('/contact', [PagesController, 'contact']).as('contact')
router.post('/contact', [ContactController, 'store']).as('contact.store')
