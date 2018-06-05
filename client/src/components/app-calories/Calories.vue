<template>
  <div class="columns has-text-centered">
    <div
      class="column is-2">
      <p
        class="is-title is-size-1"
        style="font-size: 6em !important">
        <animated-number
          :number="calories"
          :duration="0.18"/>
      </p>
      <p
        class="is-subtitle is-size-3"
        style="margin-top: -1em">
        CALORIES
      </p>
    </div>
    <exercise-calc
      :calories="calories"/>
  </div>
</template>

<script>
import BMR from './Bmr.vue'
import Exercise from './Exercise.vue'

export default {
  components: {
    bmrCalc: BMR,
    exerciseCalc: Exercise
  },
  computed: {
    calories () {
      let currentId = this.$store.state.currentId
      return this.$store.state.descriptions[currentId].calories
    }
  }
}
</script>

<style>
</style>
