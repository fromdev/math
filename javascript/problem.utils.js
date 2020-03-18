var Problems = Problems || {};

Problems.createByType = {
  SimpleAddEquation: function(problem) {
    return new SimpleAddEquation(problem.a, problem.b);
  },
  SimpleDivideEquation: function(problem) {
    return new SimpleDivideEquation(problem.a, problem.b);
  },
  SimpleMultiplyEquation: function(problem) {
    return new SimpleMultiplyEquation(problem.a, problem.b);
  },
  SimpleSubtractEquation: function(problem) {
    return new SimpleSubtractEquation(problem.a, problem.b);
  },
  MultiplicationProblem: function(problem) {
    return new MultiplicationProblem(problem.first, problem.second);
  },
  MultiplicationWordProblem: function(problem) {
    return new MultiplicationWordProblem(problem.first, problem.second, problem.problemStatement);
  },
  DivisionProblem: function(problem) {
    return new DivisionProblem(problem.a, problem.b);
  }
};
