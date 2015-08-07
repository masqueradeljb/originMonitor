//Deal with user input into the white list.

var whitelist=[];

document.addEventListener('DOMContentLoaded', function() {
	chrome.storage.sync.get('whitelist',function(result){
			if(result.whitelist!=undefined)
				whitelist=result.whitelist;
			else
				whitelist=[];
			wlInit();
		});
  document.getElementById('wlAdd').addEventListener('click',clickHandler1);
  document.getElementById('wlSearch').addEventListener('click',clickHandler2);
  document.getElementById('wlDelete').addEventListener('click',clickHandler3);
  document.getElementById('startwl').addEventListener('click',function(){
	var white=JSON.stringify(whitelist);
	//change current mode to whitelist
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

function wlInit() {

	var table = document.getElementById("list");
	for (var i = 0; i < whitelist.length; i++) {
		var tr = document.createElement("tr");
		var td1 = document.createElement("td");
		var td2 = document.createElement("td");

		var txt1 = whitelist[i].name;
		var txt2 = whitelist[i].url;

		td1.innerHTML=txt1;
		td2.innerHTML=txt2;
		tr.appendChild(td1);
		tr.appendChild(td2);
		table.appendChild(tr);
	}
}

function wlAdd() {

	var table = document.getElementById("list");

	var row1 = document.createElement("tr");

	var col1 = document.createElement("td");
	var col2 = document.createElement("td");

	var rows = table.rows;
	var cells, data, r, c;
	var found = 0;

	
 	var pair ={};
 	pair['name'] = document.getElementById("nameInput").value;
 	pair['url']= document.getElementById("urlInput").value;

	if (pair['name'] == "" || 
		!pair['url'].toLowerCase().match(/[a-z]+:\/\/.+(:[0-9]+)?/)){
		alert("Input is invalid!");
		return;
	}

 	for (r = 0; r < rows.length; r++) {
		cells = rows[r].cells;
		for (c = 0; c < cells.length; c+=2) {
			if (pair['name'].toLowerCase() == cells[c].innerHTML.toLowerCase()) {
 				found = 1;
 				alert("Duplicates exist!");
 				break;
 			}
 		}
	}
	

	if (found == 0) {
		col1.innerHTML = document.getElementById("nameInput").value;
		col2.innerHTML = document.getElementById("urlInput").value;
		whitelist.push(pair);
	}else
		return;

 	chrome.runtime.sendMessage({
  	 	flag:4,
  	 	url:pair.url
  	 });
	row1.appendChild(col1);
	row1.appendChild(col2);
	table.appendChild(row1);
	chrome.storage.sync.set({'whitelist':whitelist});

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
    
    if (name != "" && name.toLowerCase() != "name" 
    		       && name.toLowerCase() != "url") {
		for (r = 0; r < rows.length; r++) {
			console.log(rows.length);
			console.log(r);
			cells = rows[r].cells;
			for (c = 0; c < cells.length; c++) {
				data = cells[c].innerHTML;
				if (data.toLowerCase() === name) {
					document.getElementById("list").deleteRow(r);
					found = 1;
					break;
				}
			}
		}
		if (found == 0)
			alert("Can not find the name to delete.");
		else{
			for(var i in whitelist){
				if(whitelist[i].name != null && whitelist[i].name.toLowerCase() == name){
					var url = whitelist[i].url;
					if(i > -1)
						whitelist.splice(i,1);
					chrome.runtime.sendMessage({
				  	 	flag:5,
				  	 	url:url
				  	 });
					chrome.storage.sync.set({'whitelist':whitelist});
				}
			}
		}
	}
	else
		alert("Insert is illegal!");
}