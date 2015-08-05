//var imgURL = chrome.extension.getURL("bg.jpg");
//document.getElementById("someImage").src = imgURL;

 document.addEventListener('DOMContentLoaded',function(){
 	chrome.tabs.query({active:true,currentWindow: true},function(tabs){
				var currentTabID=tabs[0].id;
				console.log("popup:"+currentTabID);
			     chrome.runtime.sendMessage({
			     	tabid:currentTabID,
			     	flag:1
			     },
			     	function(response){
			     		console.log(response);
			     		var obj = JSON.parse(response);
			     		var domain = document.getElementById("domain");
			     		var domOrigin = obj.dom.split('\/')[0] + "//" + obj.dom.split('\/')[2];
			     		domain.innerHTML = "Website: "+domOrigin;

			     		var originset = {};
			     		var blockset = obj.block;
			     		for(var j = 0; j < obj.origin.length; ++j){
			     			//var origin = document.createElement("p");
			     			var origin = obj.origin[j].split('\/')[0] + "//" + obj.origin[j].split('\/')[2];
			     			var type = obj.origin[j].split('\/').pop().split('.').pop();

			     			//if (type.innerHTML.match(/.*(png|img|gif|jpeg|jpg).*/)) 
			     			
			     			if (origin in originset) {
			     				if (type.toLowerCase().match(/.*(png|img|gif|jpeg|jpg).*/)) 
			     					originset[origin].image = true;
			     				else if (type.toLowerCase().match(/.*(html|htm|txt|doc|xls|docx|xlsx|pdf).*/))
			     					originset[origin].doc = true;
			     				else if (type.toLowerCase().match(/.*(ttf|otf|woff|eot).*/))
			     					originset[origin].fonts = true;
			     				else if (type.toLowerCase().match(/.*(js|php|asp|jsp).*/))
			     					originset[origin].script = true;
			     				else if (type.toLowerCase().match(/.*(css).*/))
			     					originset[origin].css = true;
			     				else
			     					originset[origin].others = true;
			     			}
			     			else {
			     				originset[origin] = new Object ();
			     				originset[origin].image = false;
			     				originset[origin].doc = false;
			     				originset[origin].fonts = false;
			     				originset[origin].script = false;
			     				originset[origin].css = false;
			     				originset[origin].others =false;

			     				if (type.match(/.*(png|img|gif|jpeg|jpg).*/)) 
			     					originset[origin].image = true;
			     				else if (type.toLowerCase().match(/.*(html|htm|txt|doc|xls|docx|xlsx).*/))
			     					originset[origin].doc = true;
			     				else if (type.toLowerCase().match(/.*(ttf|otf|woff|eot).*/))
			     					originset[origin].fonts = true;
			     				else if (type.toLowerCase().match(/.*(js|php|asp|jsp).*/))
			     					originset[origin].script = true;
			     				else if (type.toLowerCase().match(/.*(css).*/))
			     					originset[origin].css = true;
			     				else
			     					originset[origin].others = true;

			     			}

			     		}

			     		var imagearr = [];
			     		var docarr = [];
			     		var fontsarr = [];
			     		var scriptarr = [];
			     		var cssarr = [];
			     		var othersarr = [];

			     		for (var k in originset) {

			     			if (originset[k].image)
			     				imagearr.push(k);
			     			else if (originset[k].doc)
			     				docarr.push(k);
			     			else if (originset[k].fonts)
			     				fontsarr.push(k);
			     			else if (originset[k].script)
			     				scriptarr.push(k);
			     			else if (originset[k].css)
			     				cssarr.push(k);
			     			else if (originset[k].others)
			     				othersarr.push(k);
			    
			     		}

			     		var monitor = document.getElementById('monitor');
			     		if (imagearr.length != 0) {
			     			var image = document.createElement('table');
			     			var tr = document.createElement('tr');
			     			tr.innerHTML = "Image:";
			     			image.appendChild(tr);
			     			appendUrl(image,imagearr,blockset,currentTabID);
			     			monitor.appendChild(image);
			     		}
			     		if (docarr.length != 0) {
			     			var doc = document.createElement("table");
			     			var tr = document.createElement("tr");
			     			tr.innerHTML = "Document:";
			     			doc.appendChild(tr);
			     			appendUrl(doc,docarr,blockset,currentTabID);
			     			monitor.appendChild(doc);
			     		}
			     		if (fontsarr.length != 0) {
			     			var fonts = document.createElement("table");
			     			var tr = document.createElement("tr");
			     			tr.innerHTML = "Font:";
			     			fonts.appendChild(tr);
			     			appendUrl(fonts,fontsarr,blockset,currentTabID);
			     			monitor.appendChild(fonts);
			     		}
			     		if (scriptarr.length != 0) {
			     			var script = document.createElement("table");
			     			var tr = document.createElement("tr");
			     			tr.innerHTML = "Script:";
			     			script.appendChild(tr);
			     			appendUrl(script,scriptarr,blockset,currentTabID);
			     			monitor.appendChild(script);
			     		}
			     		if (cssarr.length != 0) {
			     			var css = document.createElement("table");
			     			var tr = document.createElement("tr");
			     			tr.innerHTML = "CSS:";
			     			css.appendChild(tr);
			     			appendUrl(css,cssarr,blockset,currentTabID);
			     			monitor.appendChild(css);
			     		}
			     		if (othersarr.length != 0) {
			     			var others = document.createElement("table");
			     			var tr = document.createElement("tr");
			     			tr.innerHTML = "Others:";
			     			others.appendChild(tr);
			     			appendUrl(others,othersarr,blockset,currentTabID);		
			     			monitor.appendChild(others);
			     		}
			     		/*var doc = document.getElementById('doc');
			     		appendUrl(doc,docarr,blockset,currentTabID);
			     		var fonts = document.getElementById('fonts');
			     		appendUrl(fonts,fontsarr,blockset,currentTabID);
			     		var script = document.getElementById('script');
			     		appendUrl(script,scriptarr,blockset,currentTabID);
			     		var css = document.getElementById('css');
			     		appendUrl(css,cssarr,blockset,currentTabID);
			     		var others = document.getElementById('others');
			     		appendUrl(others,othersarr,blockset,currentTabID);*/
			     	}
			     );
		});
   
 });

 function appendUrl(table,array,blockset,currentTabID){

	for (var i in array) {
			var row = document.createElement("tr");
			var column1 = document.createElement("td");
			if(array[i] in blockset){
				if(blockset[array[i]]==1)
					column1.style.color="red";
				else
					column1.style.color="blue";
			}
			column1.className=array[i];
			var column2 = document.createElement("td");
			var button = document.createElement("button");
			button.innerHTML="block!";
			button.name=array[i];
			button.addEventListener("click",function(e){
				var block_url=e.target.name;
				var ele=document.getElementsByClassName(e.target.name);
				for(var k=0;k<ele.length;k++)
					ele[k].style.color="blue";
				//send message to background
				chrome.runtime.sendMessage({
			     	blockurl:block_url,
			     	flag:2,
			     	tabid:currentTabID
			     },
			     function(response){
			     	console.log(response.success);
			     });
			});
			var button_unblock=document.createElement("button");
			button_unblock.innerHTML="unblock!";
			button_unblock.name=array[i];
			button_unblock.addEventListener("click",function(e){
				var unblock_url=e.target.name;
				var ele=document.getElementsByClassName(e.target.name);
				for(var k=0;k<ele.length;k++)
					ele[k].style.color="grey";
				//send message to background
				chrome.runtime.sendMessage({
			     	unblockurl:unblock_url,
			     	flag:7,
			     	tabid:currentTabID
			     },
			     function(response){
			     	console.log(response.success);
			     });
			});
			if( !(array[i] in blockset))
				column2.appendChild(button);
			else
				column2.appendChild(button_unblock);
			column1.innerHTML = array[i];
			row.appendChild(column1);
			row.appendChild(column2);
			table.appendChild(row);
	}
 }


 
