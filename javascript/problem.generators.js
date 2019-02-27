var Problems = Problems || {};

Problems.Generators = {
  tableProblemGenerator : function(level) {
    var tableProblems = [];
    if(Levels.TABLE.type == level.type) {
      for(var i = level.range.start; i < level.range.end;i++){
        tableProblems.push(new MultiplicationProblem(level.id,i));
        tableProblems.push(new MultiplicationProblem(i,level.id));
      }
    }
    return tableProblems;
  },
  squareProblemGenerator : function(level) {
    var problems = [];
    if(Levels.SQUARE.type == level.type) {
      for(var i = level.range.start; i < level.range.end;i++){
        problems.push(new MultiplicationProblem(i,i));
      }
    }
    return problems;
  },
  cubeProblemGenerator : function(level) {
    var problems = [];
    if(Levels.CUBE.type == level.type) {
      for(var i = level.range.start; i < level.range.end;i++){
        problems.push(new CubeProblem(i));
      }
    }
    return problems;
  },
  allProblemGenerator : function() {
    var allProblems = Levels.CurrentLevel.ALL_PROBLEMS;
    if(allProblems.length == 0) {
      var allProblemRangeEnd = 26;
      for(var i = 0; i < allProblemRangeEnd; i++) {
        for(var j = 0; j < allProblemRangeEnd; j++) {
          if(i < 2 || j < 2) {
            //for lower number put only 1 out of 5
            if(RandomUtils.getRandomInt(1,100) % 5 == 0) {
              allProblems.push(new MultiplicationProblem(i,j));
            }
          } else {
            allProblems.push(new MultiplicationProblem(i,j));
          }
        }
      }
    }
    return allProblems;
  },
  defaultProblemGenerator : function(level) {
    LogUtils.log('No Generator: Using default' + level);
    var range = level.range;
    //Generate all problems if not already done
    var allProblems = Problems.Generators.allProblemGenerator();

    if(allProblems.length > range.end) {
      problems = problems.concat(allProblems.slice(range.start,range.end));
    }
    //Randomly add some problems from previous levels.
    if(range.start > 0 ) {
      var allProblemsFromPrevLevels = ArrayUtils.shuffle(allProblems.slice(0,range.start));
      //picking random 5 problems
      problems = problems.concat(allProblemsFromPrevLevels.slice(0,4));
    }
    return problems;
  }
};
