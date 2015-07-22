
var urls=new Object();
var blocking=new Object();
chrome.webRequest.onBeforeRequest.addListener(
	function(details){
		var url=details.url;
		var origin = details.url.split('\/')[0] + "//" + details.url.split('\/')[2];
		if(details.tabId!=-1){
			chrome.tabs.get(details.tabId, function(tab){
				console.log("tab id:"+details.tabId+"tab url:"+tab.url+" url:"+details.url);
				if(details.tabId in urls){
					if(urls[details.tabId].dom!=tab.url){
						urls[details.tabId].dom=tab.url;
						urls[details.tabId].origin=[];
						urls[details.tabId].block=new Object();
					}
					urls[details.tabId].origin.push(url);
				}else{
					urls[details.tabId]=new Object();
					urls[details.tabId].dom=tab.url;
					urls[details.tabId].block=new Object();
					urls[details.tabId].origin=[];
					urls[details.tabId].origin.push(url);
				}
				if(origin in blocking)
					urls[details.tabId].block[origin]=1;
				});
		}else
			console.log("tab id:"+details.tabId+" url:"+details.url);
		if(origin in blocking){
			//add blocked url
			return {cancel:true};
		}
	}
	,{urls: ["*://*/*"]},
	 ["blocking"]
	);

chrome.runtime.onMessage.addListener(
	function(request,sender,sendResponse){
		if(request.flag==1){
			var tabid = request.tabid;
			var origin = JSON.stringify(urls[tabid]);
			sendResponse(origin);
		}else{
			blocking[request.blockurl]=1;
			urls[request.tabid].block[request.blockurl]=1;
			sendResponse({success:request.blockurl});
		}
		//sendResponse(type);
	});

//deal with tab reload
// chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab){
//   	urls[tabId]=new Object();
//   	urls[tabId].dom=tab.url;
//   	urls[tabId].origin=[];
//   	urls[tabId].block=new Object();
// });

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