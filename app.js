/** global vue */
Vue.component('gamebutton', {
  template: `<button v-on:click="press" :id=color v-bind:style="styles" class="gamebutts"></button>`,
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
      this.counter += 1
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
    round: 0,
    step: 0,
    sequence: [],
    status: 'waiting'
  },
  methods: {
    incrementTotal: function () {
      this.sequence.push('+')
    },
    startGame: () => {
    },
    addMove: function () {
      this.sequence.push(this.colors[Math.floor(Math.random() * 4)])
    },
    tellMoves: function () {
      var tell = setInterval(function () {
        var color = this.sequence[this.step].name
        $('#' + color).velocity({opacity: 0.72}, {duration: 500})
        $('#' + color).velocity('reverse')
        if (this.step === this.sequence.length - 1) {
          console.log('clearing')
          clearInterval(tell)
          this.step = 0
        } else { this.step += 1 }
      }.bind(Simon), 2000)
    },
    playerTurn: function () {}
  }
})
