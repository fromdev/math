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
    return new DivisionProblem(problem.first, problem.second);
  },
  CubeProblem: function(problem) {
    return new CubeProblem(problem.number);
  }
};

Problems.fromJSON = function(problem) {
  if(problem && problem.subtype) {
    try {
      return Problems.createByType[problem.subtype](problem);
    } catch(e) {
      LogUtils.log('Failed to createProblemObject ' + e);
    }
  }
  LogUtils.log('Uknown object ');
  return undefined;
};
