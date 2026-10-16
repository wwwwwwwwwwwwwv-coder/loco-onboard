<script setup lang="ts">
</script>

<template>
  <div class="flex flex-col justify-center items-center pt-[10vh] text-center">
    <img src="@/assets/img/success.png" class="w-[160px]" alt="" />
    <strong class="text-[20px] font-600 mt-[30px]">{{$t('submission.success')}}</strong>
    <p class="pt-[10px]">{{$t('submission.message')}}</p>
    <p class="pt-[15px]">{{$t('submission.notification')}}</p>
  </div>
</template>

<style scoped lang="scss"></style>
