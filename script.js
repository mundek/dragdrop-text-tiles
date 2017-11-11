const app = new Vue({
  el: '#app',
  data: {
    input: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    scrambled: '',
    colOne: [],
  },
  methods: {
    /**
     * Randomizes what is in the input textarea 
     * and outputs to the scrambled textarea
     */
    scramble: function() {
      const arrCopy = this.input.split(' ')
      const scrambled = []

      for (let i=arrCopy.length-1; i>=0; i-=1) {
        scrambled.push(arrCopy.splice(Math.floor(Math.random()*arrCopy.length), 1)[0])
      }

      this.colOne = scrambled
    }
  }
})

