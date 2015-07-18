chrome.webRequest.onBeforeRequest.addListener(
	function(details){
		chrome.tabs.get(details.tabId,function (tab){
		console.log("tab id:"+tab.id+" url:"+details.url);

		})
	},{urls: ["http://*/*", "https://*/*"]},
		        ["requestBody"]);



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