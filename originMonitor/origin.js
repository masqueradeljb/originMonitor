//Deal with the modification in popup window.
//Deal with the communication with background.

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
			     		if (obj == null)
			     			{
			     				var domain = document.getElementById("domain");
			     				domain.innerHTML = "Blank webpage!"
			     				domain.style.color = "Brown";
			     				domain.style.fontSize = "20px";
			     			}
			     		else {
			     			var mode=obj.mode;
				     		var domain = document.getElementById("domain");
				     		var domOrigin = obj.dom.split('\/')[0] + "//" + obj.dom.split('\/')[2];
				     		domain.innerHTML = "Website: "+ domOrigin;
				     		document.getElementById("monitor").appendChild(document.createElement('br'));
				     		domain.style.color = "Brown";
				     		domain.style.fontSize = "20px";
				     		domain.style.fontFamily = "Arial";

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
				     				originset[origin].others = false;

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
			     			tr.style.color = "brown";
			     			tr.style.fontWeight = "bold";
			     			image.appendChild(tr);
			     			appendUrl(image,imagearr,blockset,currentTabID,mode);
			     			monitor.appendChild(image);
			     		}
			     		if (docarr.length != 0) {
			     			var doc = document.createElement("table");
			     			var tr = document.createElement("tr");
			     			tr.innerHTML = "Document:";
			     			tr.style.color = "brown";
			     			tr.style.fontWeight = "bold";
			     			doc.appendChild(tr);
			     			appendUrl(doc,docarr,blockset,currentTabID,mode);
			     			monitor.appendChild(doc);
			     		}
			     		if (fontsarr.length != 0) {
			     			var fonts = document.createElement("table");
			     			var tr = document.createElement("tr");
			     			tr.innerHTML = "Font:";
			     			tr.style.color = "brown";
			     			tr.style.fontWeight = "bold";
			     			fonts.appendChild(tr);
			     			appendUrl(fonts,fontsarr,blockset,currentTabID,mode);
			     			monitor.appendChild(fonts);
			     		}
			     		if (scriptarr.length != 0) {
			     			var script = document.createElement("table");
			     			var tr = document.createElement("tr");
			     			tr.innerHTML = "Script:";
			     			tr.style.color = "brown";
			     			tr.style.fontWeight = "bold";
			     			script.appendChild(tr);
			     			appendUrl(script,scriptarr,blockset,currentTabID,mode);
			     			monitor.appendChild(script);
			     		}
			     		if (cssarr.length != 0) {
			     			var css = document.createElement("table");
			     			var tr = document.createElement("tr");
			     			tr.innerHTML = "CSS:";
			     			tr.style.color = "brown";
			     			tr.style.fontWeight = "bold";
			     			css.appendChild(tr);
			     			appendUrl(css,cssarr,blockset,currentTabID,mode);
			     			monitor.appendChild(css);
			     		}
			     		if (othersarr.length != 0) {
			     			var others = document.createElement("table");
			     			var tr = document.createElement("tr");
			     			tr.innerHTML = "Others:";
			     			tr.style.color = "brown";
			     			tr.style.fontWeight = "bold";
			     			others.appendChild(tr);
			     			appendUrl(others,othersarr,blockset,currentTabID,mode);		
			     			monitor.appendChild(others);
			     		}
			     	}
			     );
		});
   
 });

 function appendUrl(table,array,blockset,currentTabID,mode){

	for (var i in array) {
			var row = document.createElement("tr");
			var column1 = document.createElement("td");
			if(array[i] in blockset){
				if(blockset[array[i]] == 1)
					column1.style.color = "Red";
				else
					column1.style.color = "Blue";
			}
			column1.className = array[i];
			var column2 = document.createElement("td");
			if(mode==0){ //show button only in blacklist mode
				var button = document.createElement("button");
				button.innerHTML = "Block!";
				button.name = array[i];
				button.addEventListener("click",function(e){
					var block_url = e.target.name;
					var ele = document.getElementsByClassName(e.target.name);
					for(var k = 0;k < ele.length;k++)
						ele[k].style.color = "Blue";
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
				var button_unblock = document.createElement("button");
				button_unblock.innerHTML = "Unblock!";
				button_unblock.name = array[i];
				button_unblock.addEventListener("click",function(e){
					var unblock_url = e.target.name;
					var ele = document.getElementsByClassName(e.target.name);
					for(var k = 0;k<ele.length;k++)
						ele[k].style.color = "Grey";
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
			}
			column1.innerHTML = array[i];
			row.appendChild(column1);
			row.appendChild(column2);
			table.appendChild(row);
	}
 }


 
