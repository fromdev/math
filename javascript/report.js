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
      html+='<tr><th>Problem</th><th>Attempt Result</th><th>Attempt Answer</th><th>Date [MM/DD/YYYY]</th></tr>'
      auditTrail.forEach(function(row){
          html+='<tr>';
          html+='<td>' + row.problem + '</td>';
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
