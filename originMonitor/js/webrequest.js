
//mode determine black list or whitelist mode
//0 is black 1 is white
var mode=0;
//urls contain urls for each tab.
var urls=new Object();
//blocking set contains url for current blocked origin
var blocking=new Object();
//white contain white list origin if in white list mode
var white=new Object();

init();

/*background process list initialization*/
function init(){
	chrome.storage.sync.get('mode',function(result){
		if(result.mode!=undefined)
			mode=result.mode;
		else
			mode=0;
		if(mode==0)
			blackinit();
		else
			whiteinit();
	});
}
/*whitelist initialization*/
function whiteinit(){
	chrome.webRequest.onBeforeRequest.removeListener(blacklist);
	chrome.webRequest.onBeforeRequest.addListener(
		whitelist
		,{urls: ["*://*/*"]},
		 ["blocking"]
	);
	chrome.storage.sync.get('white',function(result){
		if(result.white!=undefined)
			white=result.white;
		else
			white=new Object();
		//clear whitelist
		blocking=new Object();
	});
}
/*whitelist initialization*/
function blackinit(){
	chrome.webRequest.onBeforeRequest.removeListener(whitelist);
	chrome.webRequest.onBeforeRequest.addListener(
		blacklist
		,{urls: ["*://*/*"]},
		 ["blocking"]
	);
	chrome.storage.sync.get('blacklist',function(result){
		if(result.blacklist!=undefined)
			blocking=result.blacklist;
		else
			blocking=new Object();
		//clear whitelist
		white=new Object();
	});
}


/*listen to pop up menu and white list page requests*/
chrome.runtime.onMessage.addListener(
	function(request,sender,sendResponse){
		//flag=1 means get the pop menu data
		//get blacklist data from storage
		if(request.flag==1){

			var tabid = request.tabid;
			//check white list unblock status
			if(mode==1){
				for(var i in urls[tabid].block){
					if(i in white)
						delete urls[tabid].block[i];
				}
				
			}
			urls[tabid].mode=mode;
			var origin = JSON.stringify(urls[tabid]);
			//send back response
			sendResponse(origin);
		}else if(request.flag==2 && mode==0){ //flag = 2 means update blacklist block orgin
			blocking[request.blockurl]=1;
			urls[request.tabid].block[request.blockurl]=0;
			sendResponse({success:request.blockurl});
			chrome.storage.sync.set({'blacklist':blocking});

		}else if(request.flag==3){ //flag ==3 start whitelist mode
			mode=1;
			chrome.storage.sync.set({'mode':mode});
			chrome.webRequest.onBeforeRequest.removeListener(blacklist);
			urls=new Object();

			blocking=new Object();

			var list=JSON.parse(request.white);
			for(var i in list)
				white[list[i].url]=1;
			chrome.storage.sync.set({'white':white});

			chrome.webRequest.onBeforeRequest.addListener(whitelist,{urls: ["*://*/*"]},
	 												["blocking"]);
		}else if(request.flag==4 && mode==1){  //add white list
			white[request.url]=1;	
			chrome.storage.sync.set({'white':white});
		}else if(request.flag==5 && mode==1){	//delete origin from white list
			delete white[request.url];
			chrome.storage.sync.set({'white':white});
		}else if(request.flag==6){ //start blacklist mode
			mode=0;
			chrome.storage.sync.set({'mode':mode});
			//get black list from storage
			blackinit();
		}else if(request.flag==7 && mode==0){ // unblock origin in blacklist
			if(request.unblockurl in blocking)
				delete blocking[request.unblockurl];
			if(request.unblockurl in urls[request.tabid].block)
				delete urls[request.tabid].block[request.unblockurl];
			sendResponse({success:request.unblockurl});
			chrome.storage.sync.set({'blacklist':blocking});
		}
	});

/*web request listener for black list*/
function blacklist(details){
	var url=details.url;
	var origin = details.url.split('\/')[0] + "//" + details.url.split('\/')[2];
	if(details.tabId!=-1){
		chrome.tabs.get(details.tabId, function(tab){
			if(tab!=undefined){
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
			}
			});
	}
	//else
	//	console.log("tab id:"+details.tabId+" url:"+details.url);
	if(origin in blocking){
		//add blocked url
		console.log("blacklist block origin :"+origin);
		return {cancel:true};
	}
}

/*web request listener for white list*/
function whitelist(details){
	var url=details.url;
	var origin = details.url.split('\/')[0] + "//" + details.url.split('\/')[2];
	if(details.tabId!=-1){
		chrome.tabs.get(details.tabId, function(tab){
			//console.log("tab id:"+details.tabId+"tab url:"+tab.url+" url:"+details.url);
			if(tab!=undefined){
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
				
				if( !(origin in white)){
					urls[details.tabId].block[origin]=1;
					console.log("block origin :"+origin);
				}else {
					urls[details.tabID].block[origin]=undefined;
					console.log("whitelist block origin :"+origin);
				}
			}
		});	
	}else
		;
		//console.log("tab id:"+details.tabId+" url:"+details.url);
	if( !(origin in white)){
		//add blocked url
		return {cancel:true};
	}
}
