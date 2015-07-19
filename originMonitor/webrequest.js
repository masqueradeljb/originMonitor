
var urls={};
chrome.webRequest.onBeforeRequest.addListener(
	function(details){
		if(details.tabId in urls){
			urls[details.tabId].push(details.url);
		}else{
			urls[details.tabId]=[];
			urls[details.tabId].push(details.url);
		}
		console.log("tab id:"+details.tabId+" url:"+details.url);
	}
	,{urls: ["http://*/*", "https://*/*"]},
	 ["requestBody"]
	);
chrome.runtime.onMessage.addListener(
	function(request,sender,sendResponse){
		var tabid = request.tabid;

		var origin = JSON.stringify(urls[tabid]);
	

		sendResponse(origin);
		//sendResponse(type);
	});


// document.addEventListener('DOMContentLoaded',function(){
// 	chrome.tabs.onActivated.addListener(function(){
// 			chrome.tabs.query({active:true,currentWindow: true},function(tabs){
// 				var currentTabID=tabs[0].id;
// 				console.log(currentTabID);
// 			     chrome.webRequest.onBeforeRequest.addListener(
// 			        function(details) {
// 			          console.log(currentTabID+": "+details.url);
// 			        },
// 		        {urls: ["http://*/*", "https://*/*"],tabId:currentTabID},
// 		        ["requestHeaders"]);
// 		});

// 	});	
// });