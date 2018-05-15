class MultiplicationWordProblem {

  constructor(first, second, problemStatement) {
    this.multiplicationProblem = new MultiplicationProblem(first, second);
    var tokens = [
      {"key" : "-FIRST-", "value" : first},
      {"key" : "-SECOND-", "value" : second},
      {"key" : "-NAME1-", "value" : ArrayUtils.getRandomItem(namesList)},
    ];
    var firstToken = "-FIRST-";
    var secondToken = "-SECOND-";
    if(!problemStatement) {
      if(multiplicationWordProblemsList) {
        problemStatement = ArrayUtils.getRandomItem(multiplicationWordProblemsList);
        tokens.forEach(function(element) {
  //        console.log(element);
          problemStatement = problemStatement.replace(element.key, element.value);
        });
      } else {
        problemStatement = "blah blah " + firstToken + " multiplied with  " + secondToken + " blah blah.";
      }
    }
//    problemStatement = problemStatement.replace(firstToken, first);
//    problemStatement = problemStatement.replace(secondToken, second);
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
