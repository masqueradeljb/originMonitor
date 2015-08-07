//Open a new tab displaying the settings on whitelist.

var mode=-1;
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('whitelist').addEventListener('click',clickHandler1);
  document.getElementById('blacklist').addEventListener('click',clickHandler2);
  chrome.storage.sync.get('mode',function(result){
			if(result.mode!=undefined)
				mode=result.mode;
			else
				mode=-1;
			if(mode!=-1)
  	 			document.getElementById("monitor").style.visibility="visible";
  	 		var title=document.getElementById("title");
  	 		if(mode==0)
  	 			title.innerHTML=title.innerHTML+"	-blacklist mode";
  	 		if(mode==1)
  	 			title.innerHTML=title.innerHTML+"	-whitelist mode";
		});
  
});



function clickHandler1(e) {
 	setTimeout(newTab, 10);
}

function clickHandler2(e) {
	setTimeout(display, 10);
}

function newTab() {
	//change current mode to whitelist
	mode=1;
  	chrome.tabs.create({url: 'help.html'});
  	chrome.storage.sync.set({'mode':1});
}

function display() {
	//change current mode to black list
	mode=0;
 chrome.runtime.sendMessage({
	 		flag:6
	 	});
 document.getElementById("monitor").style.visibility="visible";
 chrome.storage.sync.set({'mode':0});
 location.reload();
}
