<template>
  <div class="text" >
    <button @click="splitLetters"></button>
    <p>Best</p>
    <p>
      <span class="word wisteria">111</span>
      <span class="word belize">222</span>
      <span class="word pomegranate">333</span>
      <span class="word green">444</span>
      <span class="word midnight">555</span>
    </p>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      name:'喵喵喵',
      words: document.getElementsByClassName("word"),
      wordArray: [],
      currentWord: 0,
    };
  },
  methods: {
    changeWord() {},
    splitLetters() {
      for (var i = 0; i < this.words.length; i++) {
        var content = this.words[i].innerHTML;
        this.words[i].innerHTML = "";
        var letters = [];
        for (var i = 0; i < content.length; i++) {
          var letter = document.createElement("span");
          letter.className = "letter";
          letter.innerHTML = content.charAt(i);
          console.log(letter);
          this.words[i].appendChild(letter);
          letters.push(letter);
        }
        this.wordArray.push(letters);
        console.log(this.wordArray[0]);
      }
    },
  },
};
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Open+Sans:600);

.text {
  position: absolute;
  width: 450px;
  left: 50%;
  margin-left: -225px;
  height: 40px;
  top: 50%;
  margin-top: -20px;
}

p {
  display: inline-block;
  vertical-align: top;
  margin: 0;
}

.word {
  position: absolute;
  width: 300px;
  opacity: 0;
}

.letter {
  /* display: inline-block; */
  position: relative;
  float: left;
  transform: translateZ(25px);
  transform-origin: 50% 50% 25px;
}

.letter.out {
  transform: rotateX(90deg);
  transition: transform 0.32s cubic-bezier(0.55, 0.055, 0.675, 0.19);
}

.letter.behind {
  transform: rotateX(-90deg);
}

.letter.in {
  transform: rotateX(0deg);
  transition: transform 0.38s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.wisteria {
  color: #8e44ad;
}

.belize {
  color: #2980b9;
}

.pomegranate {
  color: #c0392b;
}

.green {
  color: #16a085;
}

.midnight {
  color: #2c3e50;
}
</style>
