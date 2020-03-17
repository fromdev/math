var Report = Report || {};

Report = {
   readAuditTrail : function() {
    var auditTrail =  StorageUtils.getItem("AUDIT");
    if(typeof(auditTrail) == 'string') {
      auditTrail = JSON.parse(auditTrail);
    }
    return auditTrail || [];
  },
   recordSuccess : function(problem, selectedAnswer) {
    var auditTrail = Report.readAuditTrail();
    auditTrail.push({problem : problem, status: "correct", inputAnswer : selectedAnswer, timestamp : Date.now()});
    StorageUtils.setItem("AUDIT",JSON.stringify(auditTrail));
  },
  recordFailure : function(problem, selectedAnswer){
    var auditTrail = Report.readAuditTrail();
    auditTrail.push({problem : problem, status: "wrong", inputAnswer : selectedAnswer, timestamp : Date.now()});
    StorageUtils.setItem("AUDIT",JSON.stringify(auditTrail));
  },
  toTable : function() {
    var html = '';
    var auditTrail = Report.readAuditTrail();
    if(auditTrail && auditTrail.length > 0) {
      html+='<table>';
      html+='<tr><th>Problem</th><th>Attempt Result</th><th>Attempt Answer</th><th>Date [MM/DD/YYYY]</th></tr>';
      auditTrail.sort(function(a,b) {return (a.timestamp > b.timestamp) ? -1 : ((b.timestamp > a.timestamp) ? 1 : 0);} );
      auditTrail.forEach(function(row){
          const dp = (Problems && Problems.createByType && row.problem && row.problem.subtype && Problems.createByType[row.problem.subtype])
          ? Problems.createByType[row.problem.subtype](row.problem): '';
          const displayProblem = (dp && dp.displayProblem) ? dp.displayProblem() : 'Cant Serialize: ' + (row.problem.subtype || 'Unknown');
          html+='<tr>';
          html+='<td>' + displayProblem + '</td>';
          html+='<td>' + row.status + '</td>';
          html+='<td>' + row.inputAnswer + '</td>';
          var date = new Date(row.timestamp);
          html+='<td>' + (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear() + '</td>';
          html+='</tr>';
      });
      html+='</table>';
    }

    return html;
  }
};
