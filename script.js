const app = new Vue({
  el: '#app',
  data: {
    input: 'To the extreme, I rock a mic like a vandal. Light up a stage and wax a chump like a candle.',
    words: [],
  },
  methods: {
    /**
     * Randomizes what is in the input textarea 
     * and outputs to the scrambled textarea
     */
    scramble: function() {
      const arr = this.input.split(' ')
      const scrambled = []

      for (let i=arr.length-1; i>=0; i-=1) {
        const randomInt = Math.floor(Math.random()*arr.length)
        const word = arr.splice(randomInt, 1)[0]
        scrambled.push(word)
      }

      this.words = scrambled
    }
  }
})

