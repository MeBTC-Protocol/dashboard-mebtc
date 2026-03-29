import { ref } from 'vue'
import { translate, type Locale, type StringKey } from '../i18n'

const locale = ref<Locale>(
  (localStorage.getItem('mebtc-locale') as Locale | null) ?? 'de'
)

export function useLocale() {
  function setLocale(l: Locale) {
    locale.value = l
    localStorage.setItem('mebtc-locale', l)
  }

  function t(key: StringKey): string {
    return translate(locale.value, key)
  }

  return { locale, setLocale, t }
}
