const app = new Vue({
  el: '#app',
  data: {
    sentences: [
      "To the extreme, I rock a mic like a vandal. Light up a stage and wax a chump like a candle.",
      "See spot run.",
      "I see dead people.",
      "I'll be back.",
    ],
    draggableWordsOrder: [],
    currentSentence: null,
    score: 0,
  },
  methods: {
    /**
     * Randomizes what is in the input textarea 
     * and outputs to the scrambled textarea
     */
    scramble: function() {
      // pick a random sentence from the sentences array
      // and set it as the current index
      const sentenceIndex = Math.floor(Math.random()*this.sentences.length)
      this.currentSentence = sentenceIndex

      // create an array of all the words
      // and an array that will contain the scrambled words
      const wordsArray = this.sentences[sentenceIndex].split(' ')
      const scrambledWords = []

      // loop over all of the words
      // randomly splice one out and push onto new array
      for (let i=wordsArray.length-1; i>=0; i-=1) {
        const randomInt = Math.floor(Math.random()*wordsArray.length)
        const word = wordsArray.splice(randomInt, 1)[0]
        scrambledWords.push(word)
      }

      // return new array as the list the user must fix
      this.draggableWordsOrder = scrambledWords
    },
    checkAnswer: function() {
      const draggableWords = this.draggableWordsOrder.join(' ')
      const currentSentence = this.sentences[this.currentSentence]
      if (draggableWords === currentSentence) {
        alert("That's right! Try a new sentence!")
      } else {
        alert("Uh oh, that's not quite right. Try again.")
      }
    },
  }
})

