<template>
  <div>
    <div
      class="columns is-mobile"
      v-for="macro in quantMacros"
      :key="macro">
      <div class="column is-2 is-size-5">
        {{ macro | capitalize }}
      </div>
      <div class="column">
        <div class="bar-surround">
          <div
            class="bar"
            :style="{
              width: macros[macro] + '%',
              background: macro == 'fibre' ? 'indianred' : '#00D1B2'
            }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    macros: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      quantMacros: [
        'fibre',
        'sugar',
        'salt'
      ]
    }
  }
}
</script>

<style scoped>
.bar-surround {
  width: 100%;
  background: #eee;
  height: 34px;
}
.bar {
  color: white;
  height: 100%;
  text-align: center;
  transition: width 530ms ease;
  padding-top: 4px;
}
#fibre-bar {
  background: #00D1B2;
}
#sugar-bar, #salt-bar {
  background: indianred;
}
.columns {
  margin-top: -0.75rem !important;
}
</style>
