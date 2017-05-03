/* global vue */
Vue.component('gamebutton', {
<<<<<<< Updated upstream
  template: `<div class="buttwrap">
                <button
                v-on:click="press"
                :id=color
                v-bind:style="styles"
                class="gamebutts"></button>
              </div>`,
=======
  template: `<button
              v-show="Simon.status !== 'gameOver'
              v-on:click="press"
              :id=color
              v-bind:style="styles"
              class="gamebutts"></button>`,
>>>>>>> Stashed changes
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
      Simon.listen(this.color)
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
    play: function () {
      Simon.addMove()
      this.status = 'telling'
      Simon.tellMoves()
    },
    addMove: function () {
      this.sequence.push(this.colors[Math.floor(Math.random() * 4)].name)
    },
    tellMoves: function () {
      var tell = setInterval(function () {
        var color = this.sequence[this.step]
        $('#' + color).velocity({opacity: 0.72}, {duration: 500 - this.round * 25})
        $('#' + color).velocity('reverse')
        if (this.step === this.sequence.length - 1) {
          this.status = 'waiting'
          clearInterval(tell)
          this.step = 0
        } else { this.step += 1 }
      }.bind(Simon), 1500 - this.round * 25)
    },
    listen: function (color) {
      if (this.status !== 'waiting') { return }
      if (color === this.sequence[this.step]) {
        if (this.step === this.sequence.length - 1) {
          this.step = 0
          this.round += 1
          Simon.play()
        } else { this.step += 1 }
      } else { this.status = 'gameOver'}
    }
  }
})
$(document).ready( function() {
  console.clear();

canvasWidth = 1600;
canvasHeight = 200;

pCount = 0;


pCollection = new Array();

var puffs = 1;
var particlesPerPuff = 2000;
var img = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/85280/smoke2.png';

var smokeImage = new Image();
smokeImage.src = img;

for (var i1 = 0 ; i1 < puffs; i1++)
{
  var puffDelay = i1 * 1500; //300 ms between puffs

  for (var i2 = 0 ; i2 < particlesPerPuff; i2++)
  {
    addNewParticle((i2*50) + puffDelay);    
  }
}


draw(new Date().getTime(), 3000)



function addNewParticle(delay)
{

  var p = {};
  p.top = canvasHeight;
  p.left = randBetween(-200,800);

  p.start = new Date().getTime() + delay;
  p.life = 8000;
  p.speedUp = 30;


  p.speedRight = randBetween(0,20);

  p.rot = randBetween(-1,1);
  p.red = Math.floor(randBetween(0,255));
  p.blue = Math.floor(randBetween(0,255));
  p.green = Math.floor(randBetween(0,255));


  p.startOpacity = .3
  p.newTop = p.top;
  p.newLeft = p.left;
  p.size = 200;
  p.growth = 10;

  pCollection[pCount] = p;
  pCount++;


}

function draw(startT, totalT)
{
  //Timing
  var timeDelta = new Date().getTime() - startT;
  var stillAlive = false;

  //Grab and clear the canvas
  var c=document.getElementById("myCanvas");
  var ctx=c.getContext("2d");
  ctx.clearRect(0, 0, c.width, c.height);
  c.width = c.width;

  //Loop through particles
  for (var i= 0; i < pCount; i++)
  {    
    //Grab the particle
    var p = pCollection[i];

    //Timing
    var td = new Date().getTime() - p.start;
    var frac = td/p.life

    if (td > 0)
    {
      if (td <= p.life )
      { stillAlive = true; }

      //attributes that change over time
      var newTop = p.top - (p.speedUp * (td/1000));
      var newLeft = p.left + (p.speedRight * (td/1000));
      var newOpacity = Math.max(p.startOpacity * (1-frac),0);

      var newSize = p.size + (p.growth * (td/1000));
      p.newTop = newTop;
      p.newLeft = newLeft;

      //Draw!
      ctx.fillStyle = 'rgba(150,150,150,' + newOpacity + ')';      
      ctx.globalAlpha  = newOpacity;
      ctx.drawImage(smokeImage, newLeft, newTop, newSize, newSize);
    }
  }



  //Repeat if there's still a living particle
  if (stillAlive)
  {
    requestAnimationFrame(function(){draw(startT,totalT);}); 
  }
  else
  {
    clog(timeDelta + ": stopped");
  }
}

function randBetween(n1,n2)
{
  var r = (Math.random() * (n2 - n1)) + n1;
  return r;
}

function randOffset(n, variance)
{
  //e.g. variance could be 0.1 to go between 0.9 and 1.1
  var max = 1 + variance;
  var min = 1 - variance;
  var r = Math.random() * (max - min) + min;
  return n * r;
}

function clog(s)
{  
  console.log(s);
}
})