function doGet() {
  var page = UrlFetchApp.fetch('https://ire.org/jobs/');
  var doc = Xml.parse(page, true);
  var bodyHtml = doc.html.body.toXmlString();
  doc = XmlService.parse(bodyHtml);
  var root = doc.getRootElement();
  var table = getElementsByClassName(root, 'job-listings body2 gray-45')[0];
  var output = [];
  var linksInTable = getElementsByTagName(table, 'a');
  for(i in linksInTable){
    row= []
    row.push(linksInTable[i].getText())
    output.push(row);
  }
  return output;
}

function writetospreadsheet(){
  var sheet = SpreadsheetApp.getActiveSheet();
  var rows = sheet.getDataRange();
  var spreadsheet = doGet();
  rows.clear();
  for (var i=0; i < spreadsheet.length; i++) {
    sheet.appendRow(spreadsheet[i]);}
}
