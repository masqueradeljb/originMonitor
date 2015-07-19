 document.addEventListener('DOMContentLoaded',function(){
 	chrome.tabs.query({active:true,currentWindow: true},function(tabs){
				var currentTabID=tabs[0].id;
				console.log("popup:"+currentTabID);
			     chrome.runtime.sendMessage({
			     	tabid:currentTabID
			     },
			     	function(response){
			     		var obj = JSON.parse(response);
			     		var request = document.getElementById("request");
			     		for(var j = 0;j < obj.length;++j){
			     			var origin = document.createElement("p");
			     			
			     			origin.innerHTML = obj[j].split('\/')[0] + "//" + obj[j].split('\/')[2];
			     			request.appendChild(origin);

			     			var type = document.createElement("p");

			     			type.innerHTML = obj[j].split('\/').pop().split('.').pop();
			     			request.appendChild(type);
			     		}
			     	}
			     );
		});
   
 });


 