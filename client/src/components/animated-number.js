import { TweenLite } from 'gsap'
export default {
  template: '<span>{{ animatedNumber }}</span>',
  props: {
    number: {
      type: Number,
      required: true
    },
    duration: {
      type: Number,
      default: 0.2
    }
  },
  data () {
    return {
      tweenedNumber: this.number
    }
  },
  computed: {
    animatedNumber () {
      return this.tweenedNumber.toFixed(0)
    }
  },
  watch: {
    number: function (newValue) {
      TweenLite.to(this.$data, this.duration, { tweenedNumber: newValue })
    }
  }
}
