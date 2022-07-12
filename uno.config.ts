import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  presets: [
    presetAttributify(),
    presetUno(),
    presetIcons({
      prefix: '',
      scale: 1.2,
    }),
    presetTypography(),
  ],
  transformers: [
    transformerVariantGroup(),
    transformerDirectives(),
  ],
  safelist: 'ri:github-line ri:twitter-line ri:telegram-line'.split(' '),
})
