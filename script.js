fetch('sentences.txt')
  .then(function(x) { return x.text() })
  .then(function(x) {
    var sentences = x.split('\n')
      .filter(function(x) { return x.trim() !== "" })
    init(sentences)
  })

function init(sentences) {
  var app = new Vue({
    el: '#app',
    data: {
      sentences: sentences,
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
        var self = this

        // pick a random sentence from the sentences array
        // and set it as the current index
        // if it's the same as the previous then try again
        function randomSentence() {
          var sentenceIndex = Math.floor(Math.random()*self.sentences.length)

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
          var wordsArray = self.sentences[self.currentSentence].split(' ')
          var originalSentence = self.sentences[self.currentSentence]
          var scrambledWords = []

          // loop over all of the words
          // randomly splice one out and push onto new array
          for (var i=wordsArray.length-1; i>=0; i-=1) {
            var randomInt = Math.floor(Math.random()*wordsArray.length)
            var word = wordsArray.splice(randomInt, 1)[0]
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
        var draggableWords = this.draggableWordsOrder.join(' ')
        var currentSentence = this.sentences[this.currentSentence]
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
      saySentence: function() {
        if(this.sentences[this.currentSentence]) {
          responsiveVoice.speak(this.sentences[this.currentSentence], 'US English Female');
        }
      }
    }
  })
}
