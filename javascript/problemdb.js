var ProblemDatabase = ProblemDatabase || {};

ProblemDatabase = {
  findAll : function() {
    var problemDb =  StorageUtils.getItem("PROBLEMDB");
    if(typeof(problemDb) == 'string') {
      problemDb = JSON.parse(problemDb);
    }
    return problemDb || [];
  },
   add : function(prb) {
    if(!prb || !prb.subtype || !Problems) return;
    try {
      const problem = Problems.fromJSON(prb);
      if(!problem) return;
      StorageUtils.setItem("PROBLEMDB" + '.' + problem.id(),JSON.stringify(problem));
      var allProblems = new Map(ProblemDatabase.findAll());
      allProblems.set(problem.id(), problem);
      StorageUtils.setItem("PROBLEMDB",JSON.stringify(Array.from(allProblems.entries())));
    } catch(e) {
      return false;
    }
    return true;
  },
   addAll : function(problems) {
    if(!problems || !problems.length) return;
    problems.forEach((prob, i) => {
      ProblemDatabase.add(prob);
    });
  },
   findById : function(id) {
     var problem =  StorageUtils.getItem("PROBLEMDB" + '.' + id);
     if(typeof(problem) == 'string') {
       problem = JSON.parse(problem);
     }
     return problem || {};
  },
  toTable : function(filter) {
    var html = '';
    var problemDb = ProblemDatabase.findAll();
    if(problemDb && problemDb.length > 0) {
      const showProblem = function(row) {
        try {
          const dp = (Problems && Problems.createByType && row.problem && row.problem.subtype && Problems.createByType[row.problem.subtype])
            ? Problems.createByType[row.problem.subtype](row.problem)
            : '';
          return (dp && dp.displayProblem) ? dp.displayProblem() : 'Cant Serialize: ' + (row.problem.subtype || 'Unknown');
        } catch(e) {
          return 'Failed to show problem: missing dep?';
        }
      };
      html+='<table>';
      html+='<tr><th>ProblemID</th><th>Problem</th><th>Type</th></tr>';
      problemDb.forEach(function(row){
          if(filter && row.status !== filter) return;
          html+='<tr>';
          html+='<td>' + row[0] + '</td>';
          html+='<td>' + showProblem(row[1]) + '</td>';
          html+='<td>' + row[1].subtype + '</td>';
          html+='</tr>';
      });
      html+='</table>';
    }

    return html;
  }
};
