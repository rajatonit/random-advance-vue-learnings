<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <input
      type="text"
      :value="value"
      @input="updateValue"
      v-bind="$attrs"
    />
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: ''
    },
    value: [String, Number]
  },
  methods: {
    updateValue(event) {
      this.$emit('input', event.target.value)
    }
  },
  computed:{
    listeners(){
      return{
        ...this.$listeners,
        input: this.updateValue
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
