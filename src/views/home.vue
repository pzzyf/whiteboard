<script setup>
import { useI18n } from 'vue-i18n'
import { setLocale, supportedLocales } from '@/i18n/index.js'

const { t } = useI18n()
</script>

<template>
  <div>
    <div v-for="item in supportedLocales" :key="item.name">
      <div @click="setLocale(item.code)">
        {{ item.name }}
      </div>
    </div>
    <div>
      {{ t('common.language') }}
    </div>
  </div>
</template>
