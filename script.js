const app = new Vue({
  el: '#app',
  data: {
    sentences: [
      "I'm gonna make him an offer he can't refuse.",
      "Toto, I've a feeling we're not in Kansas anymore.",
      "Go ahead, make my day.",
      "I love the smell of napalm in the morning.",
      "Have fun storming the castle.",
      "I'm not dead yet",
      "You talking to me?",
      "Show me the money!",
      "You can't handle the truth.",
      "You're gonna need a bigger boat.",
      "Houston, we have a problem.",
      "There's no crying in baseball.",
      "Keep your friends close, and your enemies closer.",
      "Say hello to my little friend.",
      "I'll get you my pretty, and your little dog too.",
      "I'm the king of the world.",
    ],
    draggableWordsOrder: [],
    currentSentence: null,
    score: 0,
  },
  methods: {
    /**
     * Picks a random sentence from the sentences array
     * and outputs to the scrambled textarea
     */
    scramble: function() {
      // need reference to self for recursive random function
      const self = this

      // pick a random sentence from the sentences array
      // and set it as the current index
      // if it's the same as the previous then try again
      function randomSentence() {
        const sentenceIndex = Math.floor(Math.random()*self.sentences.length)

        if (self.currentSentence !== sentenceIndex) {
          self.currentSentence = sentenceIndex
        } else {
          randomSentence()
        }
      }
      randomSentence()

      function scramblize() {
        // create an array of all the words
        // and an array that will contain the scrambled words
        const wordsArray = self.sentences[self.currentSentence].split(' ')
        const originalSentence = self.sentences[self.currentSentence]
        const scrambledWords = []

        // loop over all of the words
        // randomly splice one out and push onto new array
        for (let i=wordsArray.length-1; i>=0; i-=1) {
          const randomInt = Math.floor(Math.random()*wordsArray.length)
          const word = wordsArray.splice(randomInt, 1)[0]
          scrambledWords.push(word)
        }

        if (scrambledWords.join(' ') !== originalSentence) {
          // return new array as the list the user must fix
          self.draggableWordsOrder = scrambledWords
        } else {
          scramblize()
        }
      }
      scramblize()
    },
    checkAnswer: function() {
      const draggableWords = this.draggableWordsOrder.join(' ')
      const currentSentence = this.sentences[this.currentSentence]
      if (draggableWords === currentSentence) {
        this.score += 10
        alert("That's right! Try a new sentence!")
        this.scramble()
      } else {
        this.score -= 5
        this.score = (this.score < 0) ? 0 : this.score
        alert("Uh oh, that's not quite right. Try again.")
      }
    },
  }
})

