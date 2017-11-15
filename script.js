const app = new Vue({
  el: '#app',
  data: {
    input: 'I like to party.',
    scrambled: '',
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

const container = document.querySelector('.sortable-container')
Sortable.create(container, {
  animation: 150,
  handle: '.item',
  draggable: ".item",
  ghostClass: "item--ghost",
})

