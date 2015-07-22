 document.addEventListener('DOMContentLoaded',function(){
 	chrome.tabs.query({active:true,currentWindow: true},function(tabs){
				var currentTabID=tabs[0].id;
				console.log("popup:"+currentTabID);
			     chrome.runtime.sendMessage({
			     	tabid:currentTabID,
			     	flag:1
			     },
			     	function(response){

			     		var obj = JSON.parse(response);

			     		var domain=document.getElementById("domain");
			     		var domOrigin=obj.dom.split('\/')[0] + "//" + obj.dom.split('\/')[2];
			     		domain.innerHTML="Website: "+domOrigin;

			     		var originset = {};
			     		var blockset=obj.block;
			     		for(var j = 0;j < obj.origin.length;++j){
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

			     		var image = document.getElementById('image');
			     		appendUrl(image,imagearr,blockset,currentTabID);
			     		var doc = document.getElementById('doc');
			     		appendUrl(doc,docarr,blockset,currentTabID);
			     		var fonts = document.getElementById('fonts');
			     		appendUrl(fonts,fontsarr,blockset,currentTabID);
			     		var script = document.getElementById('script');
			     		appendUrl(script,scriptarr,blockset,currentTabID);
			     		var css = document.getElementById('css');
			     		appendUrl(css,cssarr,blockset,currentTabID);
			     		var others = document.getElementById('others');
			     		appendUrl(others,othersarr,blockset,currentTabID);
			     	}
			     );
		});
   
 });

 function appendUrl(table,array,blockset,currentTabID){

	for (var i in array) {
			var row = document.createElement("tr");
			var column1 = document.createElement("td");
			if(array[i] in blockset)
				column1.style.color="red";
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
			     	flag:0,
			     	tabid:currentTabID
			     },
			     function(response){
			     	console.log(response.success);
			     }
			     );
			});
			if( !(array[i] in blockset))
				column2.appendChild(button);
			column1.innerHTML = array[i];
			row.appendChild(column1);
			row.appendChild(column2);
			table.appendChild(row);
	}
 }


 