/*
|--------------------------------------------------------------------------
| Edge configuration
|--------------------------------------------------------------------------
|
| The templates use the legacy layout tags (@layout, @section, @super,
| @set). These ship with Edge's migrate plugin, which is not enabled by
| default, so we register it here against the same Edge singleton that
| AdonisJS mounts.
|
*/

import edge from 'edge.js'
import { migrate } from 'edge.js/plugins/migrate'

edge.use(migrate)
