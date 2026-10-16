<script lang="ts" setup>
const router = useRouter()
// const route = useRoute()

function handleBack() {
  const historyState = router.options.history.state
  console.log('historyState', historyState)

  if (historyState && historyState.back !== null) {
    router.back()
  } else {
    console.log('已经是第一页，无法返回了')
    if (window.flutter_inappwebview) {
      window.flutter_inappwebview.callHandler('FlutterChannel', 'goBack')
    } else {
      console.warn('🐞 FlutterChannel 不存在')
    }
  }
}
</script>

<template>
  <div class="max-w-1200px mx-auto pt-[0px]">
    <div
      class="cursor-pointer w-[50px] h-[50px] flex justify-center items-center"
      @click="handleBack"
    >
      <img src="@/assets/svg/back.svg" style="width: 24px; height: 24px" alt="" />
    </div>
  </div>
  <div class="max-w-1200px mx-auto px-[20px] py-[10px]">
    <router-view />
  </div>
</template>

<style lang="scss" scoped></style>
