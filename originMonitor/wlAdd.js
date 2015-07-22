//Deal with user input into the white list.

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('wlAdd').addEventListener('click',clickHandler1);
  document.getElementById('wlSearch').addEventListener('click',clickHandler2);
  document.getElementById('wlDelete').addEventListener('click',clickHandler3);
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

	var row = document.createElement("tr");

	var col1 = document.createElement("td");
	var col2 = document.createElement("td");

	col1.innerHTML = document.getElementById("nameInput").value;
	col2.innerHTML = document.getElementById("urlInput").value;

	row.appendChild(col1);
	row.appendChild(col2);

	var table = document.getElementById("list");
	table.appendChild(row);

}

function wlSearch() {

}

function wlDelete() {
	
}