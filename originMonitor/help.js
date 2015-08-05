//Open a new tab displaying the settings on whitelist.

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('whitelist').addEventListener('click',clickHandler1);
  document.getElementById('blacklist').addEventListener('click',clickHandler2);
});

document.getElementById("list")

function clickHandler1(e) {
 	setTimeout(newTab, 10);
}

function clickHandler2(e) {
	setTimeout(display, 10);
}

function newTab() {
  chrome.tabs.create({url: 'help.html'});
}

function display() {
 document.getElementById("monitor").style.visibility="visible";
}
