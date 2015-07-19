 document.addEventListener('DOMContentLoaded',function(){
 	chrome.tabs.query({active:true,currentWindow: true},function(tabs){
				var currentTabID=tabs[0].id;
				console.log("popup:"+currentTabID);
			     chrome.runtime.sendMessage({
			     	tabid:currentTabID
			     },
			     	function(response){

			     		var obj = JSON.parse(response);

			     		var domain=document.getElementById("domain");
			     		domain.innerHTML="Website: "+obj.dom;

			     		var originset = {};

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

			     		for (var i in imagearr) {
			     			var row = document.createElement("tr");

			     			var column1 = document.createElement("td");
			     			var column2 = document.createElement("td");

			     			var button = document.createElement("button");

			     			column2.appendChild(button);

			     			column1.innerHTML = imagearr[i];

			     			row.appendChild(column1);
			     			row.appendChild(column2);

			     			image.appendChild(row);

			     		}

			     		var doc = document.getElementById('doc');

			     		for (var i in docarr) {
			     			var row = document.createElement("tr");

			     			var column1 = document.createElement("td");
			     			var column2 = document.createElement("td");

			     			var button = document.createElement("button");

			     			column2.appendChild(button);

			     			column1.innerHTML = docarr[i];

			     			row.appendChild(column1);
			     			row.appendChild(column2);

			     			doc.appendChild(row);

			     		}

			     		var fonts = document.getElementById('fonts');

			     		for (var i in fontsarr) {
			     			var row = document.createElement("tr");

			     			var column1 = document.createElement("td");
			     			var column2 = document.createElement("td");

			     			var button = document.createElement("button");

			     			column2.appendChild(button);

			     			column1.innerHTML = fontsarr[i];

			     			row.appendChild(column1);
			     			row.appendChild(column2);

			     			fonts.appendChild(row);

			     		}

			     		var script = document.getElementById('script');

			     		for (var i in scriptarr) {
			     			var row = document.createElement("tr");

			     			var column1 = document.createElement("td");
			     			var column2 = document.createElement("td");

			     			var button = document.createElement("button");

			     			column2.appendChild(button);

			     			column1.innerHTML = scriptarr[i];

			     			row.appendChild(column1);
			     			row.appendChild(column2);

			     			script.appendChild(row);

			     		}

			     		var css = document.getElementById('css');

			     		for (var i in cssarr) {
			     			var row = document.createElement("tr");

			     			var column1 = document.createElement("td");
			     			var column2 = document.createElement("td");

			     			var button = document.createElement("button");

			     			column2.appendChild(button);

			     			column1.innerHTML = cssarr[i];

			     			row.appendChild(column1);
			     			row.appendChild(column2);

			     			css.appendChild(row);

			     		}

			     		var others = document.getElementById('others');

			     		for (var i in othersarr) {
			     			var row = document.createElement("tr");

			     			var column1 = document.createElement("td");
			     			var column2 = document.createElement("td");

			     			var button = document.createElement("button");

			     			column2.appendChild(button);

			     			column1.innerHTML = othersarr[i];

			     			row.appendChild(column1);
			     			row.appendChild(column2);

			     			others.appendChild(row);

			     		}
			     	}
			     );
		});
   
 });


 