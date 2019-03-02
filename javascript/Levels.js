var Levels = Levels || {};

Levels.ONE = {
  "id" : 1,
  "choicesGiven":6,
  "range" : {"start":0,"end":9},
  "points" : 5,
  "type" : "Level"
};
Levels.TABLE = {
  "id" : 1,
  "choicesGiven":6,
  "range" : {"start":0,"end":10},
  "points" : 5,
  "type" : "Table",
  "generator": Problems.Generators.tableProblemGenerator
};

Levels.SQUARE = {
  "id" : 1,
  "choicesGiven":6,
  "range" : {"start":2,"end":50},
  "points" : 5,
  "type" : "Square",
  "generator": Problems.Generators.squareProblemGenerator
};
Levels.CUBE = {
  "id" : 1,
  "choicesGiven":6,
  "range" : {"start":2,"end":50},
  "points" : 5,
  "type" : "Cube",
  "generator": Problems.Generators.cubeProblemGenerator
};

Levels.ALGEBRA = {
  "id" : 1,
  "choicesGiven":6,
  "range" : {"start":1,"end":100},
  "points" : 5,
  "type" : "Algebra",
  "generator": Problems.Generators.algebraProblemGenerator
};

Levels.NextLevel = function(prevLevel) {
  var nxtLevel = Levels.ONE;
  if(prevLevel && prevLevel.type == Levels.TABLE.type) {
      nxtLevel = (prevLevel) ? {
          "id" : prevLevel.id + 1,
          "choicesGiven":6,
          "range" : {"start":prevLevel.range.start,"end":prevLevel.range.end },
          "points" : prevLevel.points + 1,
          "type" : prevLevel.type,
          "problems":[]
      } : Levels.TABLE;
  } else {
    nxtLevel = (prevLevel) ? {
      "id" : prevLevel.id + 1,
      "choicesGiven":6,
      "range" : {"start":prevLevel.range.end+1,"end":prevLevel.range.end + 10},
      "points" : prevLevel.points + 1,
      "type" : prevLevel.type
    } : Levels.ONE;
  }
  return nxtLevel;
};

Levels.findLevel = function(id) {
  var tmpLevel = Levels.ONE;
  while(id && Number.isInteger(id) && id < 1000 && id > 0 && id > tmpLevel.id) {
    tmpLevel = Levels.NextLevel(tmpLevel)
  }
  return tmpLevel;
};

Levels.CurrentLevel = {
    KEY:"CURRENT_LEVEL",
    MULTIPLE_CHOICE : false,
    ALL_PROBLEMS : [],
  Instance : function() {
    return StorageUtils.getJSON(Levels.CurrentLevel.KEY);
  },
  generateProblems : function(level) {
    //Use a default generator if not specified
    level.generator = (level.generator) ? level.generator : Problems.Generators.defaultProblemGenerator;
    return level.generator(level);
  },
  initialize : function(level) {
    //default start with level one
    if(!level || !level.id) {
      level = Levels.ONE;
    }
    if(level) {
      if(!level.problems || level.problems.length == 0) {
        level.problems = ArrayUtils.shuffle(Levels.CurrentLevel.generateProblems(level));
      }
      level.KEY = Levels.CurrentLevel.KEY;
      var lvlStr = JSON.stringify(level);
      StorageUtils.setItem(Levels.CurrentLevel.KEY,lvlStr);
      $("#levelHeading").text(level.id);
      $("#levelMessage").text((level.type) ? level.type : "Level");
      $(".answerChoice").show();
      $("#nextLevel").hide();
      $("#totalPoints").html(level.TOTAL_POINTS);
      LogUtils.log('Level initialized ' + lvlStr);
    }
  },
  findNextProblem : function() {
     var level = CurrentLevel.Instance();
     if(level.problems.length > 0) {
       var problem = level.problems.last();
       if("Cube" == level.type) {
           return new CubeProblem(problem.number);
       }  else if ("Algebra" == level.type){
          return new SimpleAddEquation(problem.a, problem.b);
       } else {
          return new MultiplicationProblem(problem.first, problem.second);
       }

     }
  },
  moveProblemToEnd : function() {
    var level = CurrentLevel.Instance();
    if(level.problems.length > 0) {
      var problem = level.problems.pop();
      level.problems.unshift(problem);
      StorageUtils.setItem(Levels.CurrentLevel.KEY,JSON.stringify(level));
    }
  },
  removeLastProblem : function() {
    var level = CurrentLevel.Instance();
    if(level.problems.length > 0) {
      level.problems.pop();
      StorageUtils.setItem(Levels.CurrentLevel.KEY,JSON.stringify(level));
    }
  },
  rewardPoints : function() {
    var lvl = Levels.CurrentLevel.Instance();
      lvl.TOTAL_POINTS = (lvl.TOTAL_POINTS) ? lvl.TOTAL_POINTS : 0;
      lvl.TOTAL_POINTS += lvl.points;
      StorageUtils.setItem(Levels.CurrentLevel.KEY,JSON.stringify(lvl));
      $("#totalPoints").html(Levels.CurrentLevel.Instance().TOTAL_POINTS);
  },
  evaluateAnswer : function(selectedAnswer) {
        var selectedPrblem = Levels.CurrentLevel.findNextProblem();
        var correctAnswer = selectedPrblem.answer();
        var $message = $("#message");
        if(correctAnswer == selectedAnswer) {
            LogUtils.log("correct answer - questions remaining " + Levels.CurrentLevel.Instance().problems.length);
            $message.html('<i class="fa  fa-thumbs-up text-green"></i>' + ' +' + Levels.CurrentLevel.Instance().points).show().delay(1000).fadeOut();
            Levels.CurrentLevel.rewardPoints();
            Levels.CurrentLevel.removeLastProblem();
        } else {
            LogUtils.log("incorrect answer - adding back");
            $message.html('<i class="fa  fa-times text-red"></i>').show().delay(1000).fadeOut();;
            Levels.CurrentLevel.moveProblemToEnd();
        }
        Levels.CurrentLevel.nextProblem();
        $("#answer").val('');
        $('#answer').focus();
  },
  nextProblem : function() {
        var selectedPrblem = Levels.CurrentLevel.findNextProblem();
        var $problem = $("#problem");
        if(selectedPrblem) {
            LogUtils.log(selectedPrblem.display);
            $problem.text(selectedPrblem.displayProblem());
            Levels.CurrentLevel.showChoices();
        } else {
            LogUtils.log('Level complete - next level ' + (Levels.CurrentLevel.Instance().id + 1));
            $problem.html('<i class="fa fa-trophy text-yellow"></i>'+ ' Awesome! ' + Levels.CurrentLevel.Instance().type + ' ' + Levels.CurrentLevel.Instance().id + ' Completed');
            $(".answerChoice").hide();
            $("#nextLevel").html("Go To Next " + Levels.CurrentLevel.Instance().type);
            $("#nextLevel").show();
            $('#answer').hide();
        }
    },
  showChoices : function(selectedPrblem) {
        if (Levels.CurrentLevel.MULTIPLE_CHOICE) {
            var selectedPrblem = Levels.CurrentLevel.findNextProblem();
            var choices = ArrayUtils.shuffle(selectedPrblem.choices());
            if (choices) {
                for (var i = 0; i < CurrentLevel.Instance().choicesGiven; i++) {
                    var ch = -1;
                    if (i < choices.length) {
                        ch = choices[i];
                    }
                    var $ch = $("#choice" + i);
                    if ($ch) {
                        if (ch >= 0) {
                            $ch.text(ch);
                        } else {
                            $ch.remove();
                        }
                    }
                }

            }
        }
    }
};
