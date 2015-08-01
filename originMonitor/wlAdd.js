//Deal with user input into the white list.
var whitelist=[];

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('wlAdd').addEventListener('click',clickHandler1);
  document.getElementById('wlSearch').addEventListener('click',clickHandler2);
  document.getElementById('wlDelete').addEventListener('click',clickHandler3);
  document.getElementById('startwl').addEventListener('click',function(){
  	var white=JSON.stringify(whitelist);
  	 chrome.runtime.sendMessage({
  	 	flag:3,
  	 	white:white
  	 });
  });
});

function clickHandler1(e) {
  setTimeout(wlAdd, 10);
}

function clickHandler2(e) {
  setTimeout(wlSearch, 10);
}

function clickHandler3(e) {
  setTimeout(wlDelete, 10);
}

function wlAdd() {

	var table = document.getElementById("list");

	var row1 = document.createElement("tr");

	var col1 = document.createElement("td");
	var col2 = document.createElement("td");

	col1.innerHTML = document.getElementById("nameInput").value;
	col2.innerHTML = document.getElementById("urlInput").value;
 	var pair ={};
 	pair['name']=document.getElementById("nameInput").value;
 	pair['url']= document.getElementById("urlInput").value;
 	whitelist.push(pair);

 	chrome.runtime.sendMessage({
  	 	flag:4,
  	 	url:pair.url
  	 });
	row1.appendChild(col1);
	row1.appendChild(col2);

	table.appendChild(row1);

}

function wlSearch() {
	var name = document.getElementById("nameInput").value;
	var url = document.getElementById("urlInput").value;

	var table = document.getElementById("list");
	
	var rows = table.rows;
	var cells, data, r, c;
	var found = 0;

	for (r = 0; r < rows.length; r++) {
		cells = rows[r].cells;
		for (c = 0; c < cells.length; c++) {
			data = cells[c];
			if (data === name || data === url) {
				found = 1;
			}
		}
	}

	if (found)
		alert("Found.");
	else
		alert("Not found.");
}

function wlDelete() {

}