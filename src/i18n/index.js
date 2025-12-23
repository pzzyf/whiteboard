import { createI18n } from 'vue-i18n'

import en from './locales/en.json'
// 导入语言文件
import zh from './locales/zh.json'

// 获取浏览器语言或本地存储的语言设置
function getDefaultLocale() {
  const savedLocale = localStorage.getItem('locale')
  if (savedLocale) {
    return savedLocale
  }

  // 获取浏览器语言
  const browserLocale = navigator.language || navigator.userLanguage

  // 支持的语言列表
  const supportedLocales = ['zh', 'en']

  // 检查浏览器语言是否在支持列表中
  if (supportedLocales.includes(browserLocale)) {
    return browserLocale
  }

  // 检查语言代码的前两位（如 zh-CN -> zh）
  const shortLocale = browserLocale.split('-')[0]
  if (supportedLocales.includes(shortLocale)) {
    return shortLocale
  }

  // 默认返回中文
  return 'zh'
}

// 创建 i18n 实例
const i18n = createI18n({
  legacy: false, // 使用 Composition API 模式
  locale: getDefaultLocale(), // 设置默认语言
  fallbackLocale: 'zh', // 设置备用语言
  messages: {
    zh,
    en,
  },
})

export default i18n

// 导出切换语言的函数
export function setLocale(locale) {
  i18n.global.locale.value = locale
  localStorage.setItem('locale', locale)
  document.documentElement.lang = locale
}

// 导出获取当前语言的函数
export function getCurrentLocale() {
  return i18n.global.locale.value
}

// 导出支持的语言列表
export const supportedLocales = [
  { code: 'zh', name: '中文' },
  { code: 'en', name: 'English' },
]
