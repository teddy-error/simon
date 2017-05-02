/* global vue */
Vue.component('gamebutton', {
  template: `<button
              v-on:click="press"
              :id=color
              v-bind:style="styles"
              class="gamebutts"></button>`,
  props: ['clr', 'hex'],
  data: function () {
    return {
      color: this.clr,
      status,
      styles: {
        'background-color': this.hex
      }
    }
  },
  methods: {
    press: function () {
      console.log(this.color + ' pressed')
      this.$emit(this.color)
    }
  }
})
var Simon = new Vue({
  el: '#simon',
  data: {
    colors: [
      {name: 'red', hex: '#FF1177'},
      {name: 'blue', hex: '#228DFF'},
      {name: 'green', hex: '#B6FF00'},
      {name: 'yellow', hex: '#FFDD1B'}
    ],
    debug: false,
    round: 0,
    step: 0,
    sequence: [],
    status: 'gameOver'
  },
  methods: {
    startGame: function () {
      Simon.addMove()
      Simon.tellMoves()
      this.status = 'waiting'
      console.log(this.status)
      // tell move 
      // wait -> player push gamebutt
      // if hear correct event -> goto 1
      // else game over
    },
    addMove: function () {
      this.sequence.push(this.colors[Math.floor(Math.random() * 4)].name)
    },
    tellMoves: function () {
      var tell = setInterval(function () {
        var color = this.sequence[this.step]
        $('#' + color).velocity({opacity: 0.72}, {duration: 500})
        $('#' + color).velocity('reverse')
        if (this.step === this.sequence.length - 1) {
          console.log('clearing')
          clearInterval(tell)
          this.step = 0
        } else { this.step += 1 }
      }.bind(Simon), 1500)
    },
    listen: function (color) {
      if (this.status !== 'waiting') { return }
      if (color === sequence[step]) {
        console.log('Correct')
      }
    }
  }
})
