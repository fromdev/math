class ParenthesisEquation {
  //c + d * (a * x + b) = e
  //x = (e - c - d * b) / (d * a)
  constructor(a, b, c, d, e) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.e = e;
    this.subtype = "ParenthesisEquation";
    this.choiceArray = this.calculateChoices();
  }

  get display() {
    return this.displayProblem() + " = " + this.answer() + " choices " + this.choices().toString();
  }

  displayProblem() {
    return `${this.c} + ${this.d}(${this.a}X + ${this.b}) = ${this.e}`;
  }
  id() {
    return this.subtype + '-' + this.a + '-' + this.b + '-' + this.c + '-' + this.d + '-' + this.e;
  }
  answer() {
    return (this.e - this.c - (this.d * this.b)) / (this.d * this.a);
  }

  choices() {
    return this.choiceArray;
  }

  calculateChoices() {
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
