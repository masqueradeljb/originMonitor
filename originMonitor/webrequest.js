
var urls=new Object();
chrome.webRequest.onBeforeRequest.addListener(
	function(details){
		if(details.tabId!=-1){
			chrome.tabs.get(details.tabId, function(tab){
				console.log("tab id:"+details.tabId+"tab url:"+tab.url+" url:"+details.url);
				if(details.tabId in urls){
					if(urls[details.tabId].dom!=tab.url){
						urls[details.tabId].dom=tab.url;
						urls[details.tabId].origin=[];
					}
					urls[details.tabId].origin.push(details.url);
				}else{
					urls[details.tabId]=new Object();
					urls[details.tabId].dom=tab.url;
					urls[details.tabId].origin=[];
					urls[details.tabId].origin.push(details.url);
				}

				});
		}else
			console.log("tab id:"+details.tabId+" url:"+details.url);
	}
	,{urls: ["http://*/*", "https://*/*"]},
	 ["requestBody"]
	);
chrome.runtime.onMessage.addListener(
	function(request,sender,sendResponse){
		var tabid=request.tabid;
		var data=JSON.stringify(urls[tabid]);
		sendResponse(data);
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