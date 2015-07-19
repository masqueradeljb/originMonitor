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
			     		var domain=document.getElementById("domain");
			     		domain.innerHTML="Website: "+obj.dom;
			     		request.innerHTML="Origins:"
			     		for(var j=0;j<obj.origin.length;++j){
			     			var node= document.createElement("p");
			     			node.innerHTML=obj.origin[j];
			     			request.appendChild(node);
			     		}
			     	}
			     );
		});
   
 });


 