function SiteStat(){
	SiteStat.defCfg={
    opacity:50,
		imgpath:"img/",
		bgcolor:"gray",
		diameter:50,
		x:100,
		y:100,
		color:"#000000"
  };

	function _circle(prmCfg){
		this.cfg=_extend(SiteStat.defCfg,prmCfg);
		this.cfg.toString=function(){var ret=[];for(var p in this)ret.push(p+"="+this[p]);return ret.join("\n")};
		//alert(this.cfg);
		//var t=new Number(new Date());
		var bgImage=this.cfg.imgpath+this.cfg.bgcolor+this.cfg.opacity+".png";
		//alert(bgImage);
		jg.setBgImage(bgImage);
		jg.fillEllipse(this.cfg.x, this.cfg.y, this.cfg.diameter, this.cfg.diameter);
		jg.paint();
    jg.setBgImage("");
		jg.setColor(this.cfg.color);
		jg.drawEllipse(this.cfg.x, this.cfg.y, this.cfg.diameter, this.cfg.diameter);
		jg.paint();
		jg.setColor("#ffffff");
		jg.setFont("Courier","14px",Font.BOLD);
		jg.drawString("Clicks:557",55,90);
		jg.paint();
		//alert("Ellapsed=" + (new Number(new Date())-t))
  };
	
	function _clear(){
	  jg.clear();
	};
  //helper functions
  /* reads parameters and sets them to default or user-defined values */
  function _extend(srcObj,destObj) {
    var result = {};
    for (prop in srcObj) result[prop] = srcObj[prop];
    for (prop in destObj) result[prop] = destObj[prop];
    return result;
  };

	//Publish methods
  SiteStat.prototype.circle=_circle;
  SiteStat.prototype.clear=_clear;

};
var siteStat=new SiteStat();
function includeJS(prmPath,prmParent){
	var scriptParent=prmParent || document.getElementsByTagName("head")[0];
	var scrInc=document.createElement("script");
  scrInc.type="text/javascript";
  scrInc.src=prmPath
  scriptParent.appendChild(scrInc);
};

function includeSiteStatDependencies(){
  includeJS("js/graph_c.js",document.body);
  includeJS("js/canvases.js",document.body);
};
function attachEvent(elem,evtname,evtorder,fncHandler){
	var oldHandler=null;
	if(elem[evtname]!=null && typeof elem[evtname]=="function"){
		oldHandler=elem[evtname];
    elem[evtname]=function(){
  	  if(evtorder.toLowerCase()=="before")fncHandler();
  	  oldHandler();
  	  if(evtorder.toLowerCase()=="after")fncHandler();
    }
	}else{
		elem[evtname]=fncHandler;
  }
};
attachEvent(window,'onload',"after",includeSiteStatDependencies);