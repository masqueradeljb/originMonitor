//Open a new tab displaying the settings on whitelist.

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('whitelist').addEventListener('click',clickHandler1);
});

function clickHandler1(e) {
  setTimeout(newTab, 10);
}

function newTab() {
  chrome.tabs.create({url: 'help.html'});
}
