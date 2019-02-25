class Square {
  constructor(number) {
    this.number = number;
  }

  get display() {
    return this.displayProblem() + " = " + this.answer() + " choices " + this.choices().toString();
  }
  get allChoices() {
    return this.choices();
  }
  displayProblem() {
    return this.number + " x " + this.number;
  }

  answer() {
    return this.number * this.number;
  }

  choices() {
    const answ = this.answer();
    var choices = new Set();
    choices.add(answ);
    choices.add(answ + 10);
    choices.add(answ + 1);
    choices.add(answ + RandomUtils.getRandomInt(1,10));
    //Ensure we have 6 choices
    var choicesRange = (answ > 100) ? answ : 100;
    while(choices.size < 6) {
      choices.add(RandomUtils.getRandomInt(1,choicesRange));
    }
    return Array.from(choices);
  }

}
