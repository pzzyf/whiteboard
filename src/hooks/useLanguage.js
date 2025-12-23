import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

// 支持的语言列表
export const supportedLocales = [
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
]

// 语言状态管理
const currentLocale = ref('zh')

export function useLanguage() {
  const { t, locale } = useI18n()

  // 初始化当前语言
  const initializeLocale = () => {
    const savedLocale = localStorage.getItem('locale')
    if (savedLocale && supportedLocales.some(lang => lang.code === savedLocale)) {
      currentLocale.value = savedLocale
      locale.value = savedLocale
    }
    else {
      // 获取浏览器语言
      const browserLocale = navigator.language || navigator.userLanguage
      const shortLocale = browserLocale.split('-')[0]

      if (supportedLocales.some(lang => lang.code === shortLocale)) {
        currentLocale.value = shortLocale
        locale.value = shortLocale
      }
      else {
        currentLocale.value = 'zh'
        locale.value = 'zh'
      }
    }

    // 设置 HTML lang 属性
    document.documentElement.lang = currentLocale.value
  }

  // 切换语言
  const setLocale = (newLocale) => {
    if (supportedLocales.some(lang => lang.code === newLocale)) {
      currentLocale.value = newLocale
      locale.value = newLocale
      localStorage.setItem('locale', newLocale)
      document.documentElement.lang = newLocale

      // 更新页面标题和 meta 信息
      setTimeout(() => {
        try {
          const title = t('site.title')
          document.title = title

          // 更新 meta description
          const metaDescription = document.querySelector('meta[name="description"]')
          if (metaDescription) {
            metaDescription.content = t('site.description')
          }

          // 更新 meta keywords
          const metaKeywords = document.querySelector('meta[name="keywords"]')
          if (metaKeywords) {
            metaKeywords.content = t('site.keywords')
          }
        }
        catch (error) {
          console.warn('Failed to update page title:', error)
        }
      }, 100)

      // 触发自定义事件，通知其他组件语言已更改
      window.dispatchEvent(new CustomEvent('locale-changed', {
        detail: { locale: newLocale },
      }))
    }
  }

  // 获取当前语言信息
  const getCurrentLanguage = () => {
    return supportedLocales.find(lang => lang.code === currentLocale.value) || supportedLocales[0]
  }

  // 获取语言名称
  const getLanguageName = (code) => {
    const lang = supportedLocales.find(lang => lang.code === code)
    return lang ? lang.name : code
  }

  // 监听语言变化
  watch(locale, (newLocale) => {
    currentLocale.value = newLocale
  })

  return {
    currentLocale,
    supportedLocales,
    initializeLocale,
    setLocale,
    getCurrentLanguage,
    getLanguageName,
  }
}

// 语言方向检测（为将来支持 RTL 语言做准备）
export function getLanguageDirection(locale) {
  const rtlLanguages = ['ar', 'he', 'fa', 'ur']
  return rtlLanguages.includes(locale) ? 'rtl' : 'ltr'
}

// 格式化日期（根据语言环境）
export function formatDate(date, locale = 'zh') {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  const localeMap = {
    zh: 'zh-CN',
    en: 'en-US',
  }

  return new Intl.DateTimeFormat(localeMap[locale] || locale, options).format(date)
}

// 格式化数字（根据语言环境）
export function formatNumber(number, locale = 'zh') {
  const localeMap = {
    zh: 'zh-CN',
    en: 'en-US',
  }

  return new Intl.NumberFormat(localeMap[locale] || locale).format(number)
}

// 格式化货币（根据语言环境）
export function formatCurrency(amount, locale = 'zh', currency = 'CNY') {
  const localeMap = {
    zh: 'zh-CN',
    en: 'en-US',
  }

  const currencyMap = {
    zh: 'CNY',
    en: 'USD',
  }

  return new Intl.NumberFormat(localeMap[locale] || locale, {
    style: 'currency',
    currency: currency || currencyMap[locale] || 'CNY',
  }).format(amount)
}
