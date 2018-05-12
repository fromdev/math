class MultiplicationWordProblem {
  const firstToken = "-FIRST-";
  const secondToken = "-SECOND-";
  constructor(first, second, problemStatement) {
    this.multiplicationProblem = new MultiplicationProblem(first, second);
    if(!problemStatement) {
      problemStatement = "blah blah " + firstToken + " multiplied with  " + secondToken + " blah blah.";
    }
    problemStatement = problemStatement.replace(firstToken, first);
    problemStatement = problemStatement.replace(secondToken, second);
    this.problemStatement = problemStatement;
  }

  get display() {
    return this.multiplicationProblem.display();
  }
  get allChoices() {
    return this.choices();
  }
  displayProblem() {
    return this.problemStatement;
  }

  answer() {
    return this.multiplicationProblem.answer();
  }

  choices() {
    return this.multiplicationProblem.choices();
  }

}
