 document.addEventListener('DOMContentLoaded',function(){

     chrome.webRequest.onBeforeRequest.addListener(
        function(details) {
          var div=document.getElementById("request");
          div.innerHTML=details.url;
        },
        {urls: ["<all_urls>"]},
        ["requestBody"]);
 });


 