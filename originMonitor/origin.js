 document.addEventListener('DOMContentLoaded',function(){
 	chrome.tabs.query({active:true,currentWindow: true},function(tabs){
				var currentTabID=tabs[0].id;
				console.log("popup:"+currentTabID);
			     chrome.runtime.sendMessage({
			     	tabid:currentTabID
			     },
			     	function(response){
			     		var obj=JSON.parse(response);
			     		var request=document.getElementById("request");
			     		for(var j=0;j<obj.length;++j){
			     			var node= document.createElement("p");
			     			node.innerHTML=obj[j];
			     			request.appendChild(node);
			     		}
			     	}
			     );
		});
   
 });


 