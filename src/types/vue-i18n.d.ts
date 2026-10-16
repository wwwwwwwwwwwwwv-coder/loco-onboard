// src/vue-i18n.d.ts
import { ComponentCustomProperties } from 'vue'
import { I18n } from 'vue-i18n'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $t: typeof I18n.prototype.t
  }
}
