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
    <div
    class="column is-3">
      <bmr-calc
      :calories="calories"/>
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
  props: {
    currentFood: {
      type: String,
      required: true
    }
  },
  computed: {
    calories () {
      let swap = this.$store.state.swaps[this.currentFood]
      return swap
        ? swap.calories
        : this.$store.state.targetFood.calories
    }
  }
}
</script>

<style>
</style>
