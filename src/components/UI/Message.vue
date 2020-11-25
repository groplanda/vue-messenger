<template>
  <div class="message">
    <div class="alert">
      <p class="alert__text">{{ message }}</p>
      <button @click="$emit('close')" class="alert__close">&times;</button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    message: {
      type: String,
      required: true
    }
  }
}
</script>
<style lang="scss">
  .message {
    padding: 0 15px;
  }
  .alert {
    background: #FF4D00;
    color: #fff;
    padding: 15px;
    font-weight: 400;
    font-size: 14px;
    line-height: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    letter-spacing: 0.04em;
    margin-bottom: 32px;
    border-radius: 10px;
    &__close {
      color: #fff;
      font-size: 20px;
    }
  }
</style>