class MultiplicationWordProblem {

  constructor(first, second, problemStatement) {
    this.multiplicationProblem = new MultiplicationProblem(first, second);
    var firstToken = "-FIRST-";
    var secondToken = "-SECOND-";
    if(!problemStatement) {
      problemStatement = "blah blah " + firstToken + " multiplied with  " + secondToken + " blah blah.";
    }
    problemStatement = problemStatement.replace(firstToken, first);
    problemStatement = problemStatement.replace(secondToken, second);
    this.problemStatement = problemStatement;
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
