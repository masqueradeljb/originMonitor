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

	var name = document.getElementById("searchInput").value.toLowerCase();
	//var url = document.getElementById("urlInput").value.toLowerCase();

	var table = document.getElementById("list");
	

	var rows = table.rows;
	var cells, data, r, c;
	var found = 0;

	for (r = 0; r < rows.length; r++) {
		cells = rows[r].cells;
		for (c = 0; c < cells.length; c++) {
			cells[c].style.backgroundColor = "linen";
		}
	}

	if (name != '') {
		for (r = 0; r < rows.length; r++) {
			cells = rows[r].cells;
			for (c = 0; c < cells.length; c++) {
				data = cells[c].innerHTML;
				if (data.toLowerCase() === name) {
					found = 1;
					cells[c].style.backgroundColor = "yellow";
				}
			}
		}

		if (found == 1)
			alert("Found.");
		else
			alert("Not found.");
	}
	else
		alert("Insert is illegal.");
}

	

function wlDelete() {
	var name = document.getElementById("deleteInput").value.toLowerCase();

	var table = document.getElementById("list");

	var rows = table.rows;
	var cells, data, r, c;
	var found = 0;
    
    if (name != '') {
		for (r = 0; r < rows.length; r++) {
			cells = rows[r].cells;
			for (c = 0; c < cells.length; c++) {
				data = cells[c].innerHTML;
				if (data.toLowerCase() === name) {
					document.getElementById("list").deleteRow(r);
					found = 1;
				}
			}
		}
		if (found == 0)
			alert("Can not find the name to delete.");
		else{
			for(var i in whitelist){
				if(whitelist[i].name==name){
					var url = whitelist[i].url;
					if(i>-1)
						whitelist.splice(i,1);
					chrome.runtime.sendMessage({
				  	 	flag:5,
				  	 	url:url
				  	 });
				}
			}
		}
	}
	else
		alert("Insert is illegal.");
}