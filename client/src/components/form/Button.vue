<template>
  <button type="submit">{{ btnTitle }}</button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    btnTitle:{
      require: true,
      type: String,
    }
  }
}
</script>