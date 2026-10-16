<script lang="ts" setup>
const props = defineProps({
  img: String,
  size: {
    type: Number,
    default: 20,
  },
  type: {
    type: String as () => 'currency' | 'country',
    default: 'currency',
  },
})

const src = computed(() => {
  const a = 'https://assets.gat-pay.com/images/$img.svg'
  const b = 'https://assets.gat-pay.com/images/country/$img.svg'
  return (props.type === 'currency' ? a : b).replace(
    '$img',
    props.type === 'currency' ? (props.img ?? 'x').toUpperCase() : (props.img ?? 'x').toLowerCase(),
  )
})
</script>

<template>
  <img
    :alt="img"
    :src="src"
    class="shadow rounded-full"
    :style="`width: ${size}px;height:${size}px`"
  />
</template>

<style lang="less" scoped></style>
