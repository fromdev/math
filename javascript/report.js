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
    auditTrail.push({problem : problem, id : problem.id(), status: "correct", inputAnswer : selectedAnswer, timestamp : Date.now()});
    StorageUtils.setItem("AUDIT",JSON.stringify(auditTrail));
  },
  recordFailure : function(problem, selectedAnswer){
    var auditTrail = Report.readAuditTrail();
    auditTrail.push({problem : problem, id : problem.id(), status: "wrong", inputAnswer : selectedAnswer, timestamp : Date.now()});
    StorageUtils.setItem("AUDIT",JSON.stringify(auditTrail));
  },
  toTable : function(filter) {
    var html = '';
    var auditTrail = Report.readAuditTrail();
    if(auditTrail && auditTrail.length > 0) {
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
      html+='<tr><th>Problem Id</th><th>Problem</th><th>Type</th><th>Attempt Result</th><th>Attempt Answer</th><th>Date [MM/DD/YYYY]</th></tr>';
      auditTrail.sort(function(a,b) {return (a.timestamp > b.timestamp) ? -1 : ((b.timestamp > a.timestamp) ? 1 : 0);} );
      auditTrail.forEach(function(row){
          if(filter && row.status !== filter) return;
          html+='<tr>';
          html+='<td>' + row.id + '</td>';
          html+='<td>' + showProblem(row) + '</td>';
          html+='<td>' + row.problem.subtype + '</td>';
          html+='<td>' + row.status + '</td>';
          html+='<td>' + row.inputAnswer + '</td>';
          var date = new Date(row.timestamp);
          html+='<td>' + (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear() + '</td>';
          html+='</tr>';
      });
      html+='</table>';
    }

    return html;
  },
  findByStatus: function(status) {
    var auditTrail = Report.readAuditTrail();
    if(status && auditTrail && auditTrail.length > 0) {
      return auditTrail.filter(function(entry){return status === entry.status;});
    }
    return auditTrail;
  }
};
