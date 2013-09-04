/**
  *                                  *
 *** Native Javascript Autocomplete ***
  *                                  *
  * Author : Airlangga bayu seto
  * Email  : qu4ck@iso.web.id
  * Version : 0.9 Beta
  *
 **/
var isoweb, getID, targetID;
isoweb = {
    autocomplete : function(option, callback){
        getID    = document.getElementById(option.textID);
        targetID = document.getElementById(option.targetID);
        getID.onfocus = function(){
            getID.value = "";
        }
        
        getID.setAttribute("autocomplete","off");
        /*target = document.createElement("div");
        target.setAttribute("id",option.targetID);  
        getID.parentNode.insertBefore(target, getID.nextSibling);        
        //getID.parentNode.appendChild(target);*/
        
        getID.onkeyup = function(){
            var strValue = escape(getID.value);        
            
            if(strValue.length >= option.minLength){
                var req = isoweb.checkAjax();
                req.open("GET", option.url+'?'+ option.queryStr +'=' + strValue, true);
                req.onreadystatechange = function(){
                    if (req.readyState == 4 && req.status == 200) {
                        var data = eval("("+req.responseText+")");

                        if (data.error == true){
                            alert("Ajax tidak berjalan.");
                        }else {
                            if(data.result.length < 1){
                                getID.style.visibility = "hidden";
                            }else{
                                targetID.className = "suggestList";
                                targetID.setAttribute('style','position:absolute;top:'+isoweb.getPosition.curTop+';left:'+isoweb.getPosition.curLeft+';');
                                
                                var html = "";
                                resultData = data.result;
                                
                                for(var k in data.result){
                                    html += '<div rel="'+ k +'" \
                                    onmouseover="javascript:isoweb.mouseOver(this);" \
                                    onmouseout="javascript:isoweb.mouseOut(this);" \
                                    class="suggestData" id=\"suggestData'+k+'\">' + data.result[k]['label'] + '</div>';
                                }                                
                                targetID.innerHTML = html;   
                                                                
                                var className = isoweb.getClassName("suggestData");
                                
                                for(var i=0;i<className.length;i++){
                                    document.getElementById('suggestData'+i).onclick = function(){
                                        isoweb.clickData(data.result[this.getAttribute('rel')]['label']);                                        
                                        callback(data.result[this.getAttribute('rel')]);                                        
                                        return false;
                                    }                              
                                }
                            }
                        }
                    }
                }; 
                req.send();        
            }
        }
    },
    getClassName  : function(cls){
        var retnode = [];
        var elem = document.getElementsByTagName('*');
        for (var i = 0; i < elem.length; i++) {
            if((' ' + elem[i].className + ' ').indexOf(' ' + cls + ' ') > -1) retnode.push(elem[i]);
        }
        return retnode;
    },
    getPosition : function(){
        var str1 = getID;
        var curLeft=0;
		if (getID.offsetParent){
		    while (str1.offsetParent){
                curLeft += str1.offsetLeft;
                str1 = str1.offsetParent;
		    }
		}
        
		var str2 = getID;
		var curTop = 20;
		if (str2.offsetParent){
		    while (str2.offsetParent){
                curTop += str2.offsetTop;
                str2 = str2.offsetParent;
		    }
		}
    },
    clickData  : function(val){        
        getID.value = val;
        targetID.innerHTML = '';
        targetID.style.visibility = "hidden";
    }, 
    checkAjax : function(){
        if (window.XMLHttpRequest) {
            return new XMLHttpRequest();
        } else if(window.ActiveXObject) {
            return new ActiveXObject("Microsoft.XMLHTTP");
        } else {
            alert("Browser tidak mendukung Ajax!");
            return false;
        }
    },
    mouseOver  : function(divTag){
        var hasClass = divTag.className.match(new RegExp('(\\s|^)mouseOver(\\s|$)'));   
        if (!hasClass){ divTag.className += " mouseOver";}
    },
    mouseOut : function(divTag){    
        var reg = new RegExp('(\\s|^)mouseOver(\\s|$)');
        divTag.className = divTag.className.replace(reg,'');
    },
    extend : function(destination, source) {   
          for (var property in source) {
            destination[property] = source[property];
          }
          return destination;
    }
}

