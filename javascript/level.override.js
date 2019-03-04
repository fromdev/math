var checkLevelOverride = function(level) {
  var url = new URL(window.location.href);
  var testByTable = parseInt(url.searchParams.get("t"));
  if(testByTable && Number.isInteger(testByTable) && testByTable > 0) {
    level.id = testByTable;
    return level;
  }
    var l = Levels.CurrentLevel.Instance();
    return (l) ? l : level;
};
