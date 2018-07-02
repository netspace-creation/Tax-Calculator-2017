
 function UpdateTableRowsColor(color){
  var  mycell, R=1;
  for (var i = 0; i < 12; i++) {
   mycell = document.getElementById(R+color);
   mycell.style.background = "#aa"+color+"a";
   if (color=='d0d'){mycell.style.background = "#d0"+color+"3";}
   R=R+1;
 }}   //select > option:hover {outline: solid black 1px; opacity:.00;}



var $J=jQuery.noConflict();
var canHST=new Array();
canHST.b0b={};
canHST.cac={};
canHST.d0d ={HstRate:13,TaxRate:0,OfficeInsurRate:8,VehicleInsurRate:0,VehicleUsage:80,OfficeUsage:18,Usage:100}; //hst percentage
canHST.bbb={TaxRate:13,Usage:100};
canHST.ccc={TaxRate:13,Usage:80};
canHST.ddd={TaxRate:13,Usage:18};
canHST.eee={TaxRate:0,Usage:80};
canHST.fff={TaxRate:8,Usage:18};
canHST.f4d={TaxRate:0,Usage:100};
canHST.E1={TaxRate:14,Usage:5,Usage:9,TaxRate:8};
canHST.E2={TaxRate:14,Usage:5,Usage:9,TaxRate:8};

$J(document).ready(function(){

 $J("#price").keydown(function(a){if(!(isDecimalKey(a,$J("#price").val()))){a.preventDefault()}});
 $J("#price").keyup(function(){updateForm()});

 $J("input[name=inclusive]").change(function(){updateForm()});

 $J("#expenses").keydown(function(){updateForm()});
 $J("#expenses").keyup(function(){updateForm()});

 $J("#expenses").change(function(){ // values in array ON on pulldown menu
service=$J("#expenses").val();

 if (service=='d0d'){ // if pull down menu is Info then the following witll be displayed in usage and tax columns
                 $J("#Usage").html(canHST[service].Usage);
          $J("#BankFeeUsage").html(canHST[service].Usage);

          $J("#VehicleUsage").html(canHST[service].VehicleUsage);
     $J("#VehicleInsurUsage").html(canHST[service].VehicleUsage);

	         $J("#OfficeUsage").html(canHST[service].OfficeUsage);
       $J("#OficeInsurUsage").html(canHST[service].OfficeUsage);

                  $J("#Rate").html(canHST[service].HstRate);
           $J("#VehicleRate").html(canHST[service].HstRate);
	          $J("#OfficeRate").html(canHST[service].HstRate);

        $J("#OficeInsurRate").html(canHST[service].OfficeInsurRate);
      $J("#VehicleInsurRate").html(canHST[service].VehicleInsurRate);
           $J("#BankFeeRate").html(canHST[service].VehicleInsurRate);
            $J("#exclusiveHST").html(accounting.formatMoney(round2TwoDecimals(subtotal) ,moneyFormat)); // price paid with no hst tax
          $J("#hst").html(accounting.formatMoney(round2TwoDecimals(hstpaid)  ,moneyFormat)); // tax paid for hst 13%
 $J("#inclusiveHST").html(accounting.formatMoney(round2TwoDecimals(total)    ,moneyFormat)); // price paid with hst tax


   updateForm()
}
  updateForm()
 })
}
);


function updateForm(){
 var a=parseFloat($J("#price").val()), // assign 'a' to 'input price' value in a given expense
  	     b=$J("#expenses").val(),          // b-which expenses
     inclusive=$J("input[name=inclusive]:checked").val(),
     moneyFormat=moneyFormatCA00,
     aa,  // price includes tax
     bb,  // price minus tax
     ee;  // tax

 $J("#price").keydown(function(a){if(!(isDecimalKey(a,$J("#price").val()))){a.preventDefault()}});
 $J("#price").keyup(function(){updateForm()});
 $J("input[name=inclusive]").change(function(){updateForm()});
 $J("#expenses").keydown(function(){updateForm()});
 $J("#expenses").keyup(function(){updateForm()});
 $J("#expenses").change(function(){ service=$J("#expenses").val();})

if(isNaN(a)||a==""){return}

if(inclusive==0){
   aa=a; // no tax
   ee=ccPercentage.WhatIsPPercentOfA(a,canHST[b].TaxRate); ///???
   bb=a+ee; // no tax
}
if(inclusive==1){
	 bb=a;  //  with tax
	 aa=ccPercentage.AIsAfterPPercentIncreaseOfWhat(bb,canHST[b].TaxRate);// ????
	 ee=bb-aa
}

this.subtotal=aa;
this.total=bb;
this.hstpaid=ee;//displayExIN();


  // if(!(b=='cac')&&!(b=='d0d')){
 $J("#exclusiveHST").html(accounting.formatMoney(round2TwoDecimals(subtotal) ,moneyFormat)); // price paid with no hst tax
          $J("#hst").html(accounting.formatMoney(round2TwoDecimals(hstpaid)  ,moneyFormat)); // tax paid for hst 13%
 $J("#inclusiveHST").html(accounting.formatMoney(round2TwoDecimals(total)    ,moneyFormat)); // price paid with hst tax
//}



if(inclusive==0){

   if(b=='eee'){  // eee was changed .. see new parameters
   VehicleInsurance=ccPercentage.WhatIsPPercentOfA(total,canHST[b].Usage);
VehicleInsuranceTax=ccPercentage.WhatIsPPercentOfA(VehicleInsurance,canHST[b].TaxRate);
   $J("#VehicleInsurUsage").html(canHST[b].Usage);
    $J("#VehicleInsurRate").html(canHST[b].TaxRate);
 $J("#VehicleInsuranceTax").html(accounting.formatMoney(round2TwoDecimals(VehicleInsuranceTax),moneyFormat));  // vehicle insurance taxpaid
    $J("#VehicleInsurance").html(accounting.formatMoney(round2TwoDecimals(VehicleInsurance)   ,moneyFormat));  // vehicle insurance paid
}
// calculate bank fees
    if(b=='f4d'){
    BankFee=subtotal;
    BankFeeTax=ccPercentage.WhatIsPPercentOfA(BankFee,canHST[b].TaxRate);
	     $J("#BankFeeUsage").html(canHST[b].Usage);
	      $J("#BankFeeRate").html(canHST[b].TaxRate);
    $J("#BankFee").html(accounting.formatMoney(round2TwoDecimals(BankFee),    moneyFormat));  // vehicle insurance taxpaid
 $J("#BankFeeTax").html(accounting.formatMoney(round2TwoDecimals(BankFeeTax), moneyFormat));  // vehicle insurance paid
}

}

if(inclusive==1){
// calculate gen

 if(b=='d0d')    {



 }

 if(b=='bbb'){
    $J("#Usage").html(canHST[b].Usage);
     $J("#Rate").html(canHST[b].TaxRate);
 $J("#Subtotal").html(accounting.formatMoney(round2TwoDecimals(subtotal) ,moneyFormat)); // price paid with no hst tax
  $J("#HstPaid").html(accounting.formatMoney(round2TwoDecimals(hstpaid)  ,moneyFormat)); // tax paid for hst 13%

// showW();

 }


 // show(b);showW();

// calculate veh
  if(b=='ccc')
  {
   VehicleExpense=ccPercentage.WhatIsPPercentOfA(subtotal,canHST[b].Usage);
       VehicleTax=ccPercentage.WhatIsPPercentOfA(VehicleExpense,canHST[b].TaxRate);
   $J("#VehicleUsage").html(canHST[b].Usage);
    $J("#VehicleRate").html(canHST[b].TaxRate);
     $J("#VehicleTax").html(accounting.formatMoney(round2TwoDecimals(VehicleTax)      ,moneyFormat)); // vehicle tax paid
 $J("#VehicleExpense").html(accounting.formatMoney(round2TwoDecimals(VehicleExpense)  ,moneyFormat));  // vehicle cost
}

// calculate off
  if(b=='ddd'){
   OfficeExpense=ccPercentage.WhatIsPPercentOfA(subtotal,canHST[b].Usage);
       OfficeTax=ccPercentage.WhatIsPPercentOfA(OfficeExpense,canHST[b].TaxRate);
   $J("#OfficeUsage").html(canHST[b].Usage);
    $J("#OfficeRate").html(canHST[b].TaxRate);
     $J("#OfficeTax").html(accounting.formatMoney(round2TwoDecimals(OfficeTax)     ,moneyFormat)); // office tax paid
 $J("#OfficeExpense").html(accounting.formatMoney(round2TwoDecimals(OfficeExpense) ,moneyFormat));  // office cost
}
// calculate off ins
  if(b=='fff'){
   OfficeInsurance=ccPercentage.WhatIsPPercentOfA(subtotal,canHST[b].Usage);
OfficeInsuranceTax=ccPercentage.WhatIsPPercentOfA(OfficeInsurance,canHST[b].TaxRate);
    $J("#OficeInsurUsage").html(canHST[b].Usage);
     $J("#OficeInsurRate").html(canHST[b].TaxRate);
 $J("#OfficeInsuranceTax").html(accounting.formatMoney(round2TwoDecimals(OfficeInsuranceTax) ,moneyFormat)); //office insurance tax paid
  $J("#OfficeInsurance").html(accounting.formatMoney(round2TwoDecimals(OfficeInsurance)      ,moneyFormat)); //office insurance paid
}

}

// below are chngeable values displayed in html page

}

function showW(b){

 VehicleExpense=ccPercentage.WhatIsPPercentOfA(100,canHST[b].Usage);
       VehicleTax=ccPercentage.WhatIsPPercentOfA(VehicleExpense,canHST[b].TaxRate);
   $J("#VehicleUsage").html(canHST[b].Usage);
    $J("#VehicleRate").html(canHST[b].TaxRate);
     $J("#VehicleTax").html(accounting.formatMoney(round2TwoDecimals(VehicleTax)      ,moneyFormat)); // vehicle tax paid
 $J("#VehicleExpense").html(accounting.formatMoney(round2TwoDecimals(VehicleExpense)  ,moneyFormat));  // vehicle cost

}




function displayExIN(){
$J("#exclusiveHST").html(accounting.formatMoney(round2TwoDecimals(subtotal) ,moneyFormat)); // price paid with no hst tax
          $J("#hst").html(accounting.formatMoney(round2TwoDecimals(hstpaid)  ,moneyFormat)); // tax paid for hst 13%
 $J("#inclusiveHST").html(accounting.formatMoney(round2TwoDecimals(total)    ,moneyFormat)); // price paid with hst tax
};




(function(o,g){
	var n={};n.version="0.3.2";n.settings={currency:{symbol:"$",format:"%s%v",decimal:".",thousand:",",precision:2,grouping:3},number:{precision:0,grouping:3,thousand:",",decimal:"."}};var p=Array.prototype.map,j=Array.isArray,f=Object.prototype.toString;function c(r){return !!(r===""||(r&&r.charCodeAt&&r.substr))}function k(r){return j?j(r):f.call(r)==="[object Array]"}function q(r){return r&&f.call(r)==="[object Object]"}function h(s,r){var t;s=s||{};r=r||{};for(t in r){if(r.hasOwnProperty(t)){if(s[t]==null){s[t]=r[t]}}}return s}function a(w,v,u){var t=[],s,r;if(!w){return t}if(p&&w.map===p){return w.map(v,u)}for(s=0,r=w.length;s<r;s++){t[s]=v.call(u,w[s],s,w)}return t}function l(s,r){s=Math.round(Math.abs(s));return isNaN(s)?r:s}function e(s){var r=n.settings.currency.format;if(typeof s==="function"){s=s()}if(c(s)&&s.match("%v")){return{pos:s,neg:s.replace("-","").replace("%v","-%v"),zero:s}}else{if(!s||!s.pos||!s.pos.match("%v")){return(!c(r))?r:n.settings.currency.format={pos:r,neg:r.replace("%v","-%v"),zero:r}}}return s}var i=n.unformat=n.parse=function(u,r){if(k(u)){return a(u,function(v){return i(v,r)})}u=u||0;if(typeof u==="number"){return u}r=r||n.settings.number.decimal;var t=new RegExp("[^0-9-"+r+"]",["g"]),s=parseFloat((""+u).replace(/\((.*)\)/,"-$1").replace(t,"").replace(r,"."));return !isNaN(s)?s:0};var b=n.toFixed=function(t,r){r=l(r,n.settings.number.precision);var s=Math.pow(10,r);return(Math.round(n.unformat(t)*s)/s).toFixed(r)};var d=n.formatNumber=function(t,w,z,v){if(k(t)){return a(t,function(A){return d(A,w,z,v)})}t=i(t);var r=h((q(w)?w:{precision:w,thousand:z,decimal:v}),n.settings.number),x=l(r.precision),u=t<0?"-":"",s=parseInt(b(Math.abs(t||0),x),10)+"",y=s.length>3?s.length%3:0;return u+(y?s.substr(0,y)+r.thousand:"")+s.substr(y).replace(/(\d{3})(?=\d)/g,"$1"+r.thousand)+(x?r.decimal+b(Math.abs(t),x).split(".")[1]:"")};var m=n.formatMoney=function(t,s,v,z,u,y){if(k(t)){return a(t,function(A){return m(A,s,v,z,u,y)})}t=i(t);var r=h((q(s)?s:{symbol:s,precision:v,thousand:z,decimal:u,format:y}),n.settings.currency),x=e(r.format),w=t>0?x.pos:t<0?x.neg:x.zero;return w.replace("%s",r.symbol).replace("%v",d(Math.abs(t),l(r.precision),r.thousand,r.decimal))};n.formatColumn=function(y,t,w,B,v,A){if(!y){return[]}var r=h((q(t)?t:{symbol:t,precision:w,thousand:B,decimal:v,format:A}),n.settings.currency),z=e(r.format),x=z.pos.indexOf("%s")<z.pos.indexOf("%v")?true:false,s=0,u=a(y,function(F,D){if(k(F)){return n.formatColumn(F,r)}else{F=i(F);var C=F>0?z.pos:F<0?z.neg:z.zero,E=C.replace("%s",r.symbol).replace("%v",d(Math.abs(F),l(r.precision),r.thousand,r.decimal));if(E.length>s){s=E.length}return E}});return a(u,function(D,C){if(c(D)&&D.length<s){return x?D.replace(r.symbol,r.symbol+(new Array(s-D.length+1).join(" "))):(new Array(s-D.length+1).join(" "))+D}return D})};if(typeof exports!=="undefined"){if(typeof module!=="undefined"&&module.exports){exports=module.exports=n}exports.accounting=n}else{if(typeof define==="function"&&define.amd){define([],function(){return n})}else{n.noConflict=(function(r){return function(){o.accounting=r;n.noConflict=g;return n}})(o.accounting);o.accounting=n}}
}
(this)
);

function isIntegerKey(a){var b=a.which||event.keyCode;var c=(!a.shiftKey)&&(b==8||b==9||b==46||(b>=35&&b<=40)||(b>=48&&b<=57)||(b>=96&&b<=105));return c}
function isDecimalKey(c,b){var a=(c.which)?c.which:c.keyCode;if((!c.shiftKey)&&((a>=48&&a<=57)||(a>=96&&a<=105)||a==110||a==190||a==8||a==9||(35<=a&&a<=40)||a==46)){if(a==110||a==190){if(b.indexOf(".")>-1||b.indexOf(",")>-1||b.length==0){return false}}return true}return false}

function radioValue(b){var c="";var e=document.getElementsByName(b);for(var a=0,d=e.length;a<d;a++){if(e[a].checked){c=e[a].value}}return c}
function round2TwoDecimals(a){return Math.round(a*100)/100}

var moneyFormatCA={symbol:"$",precision:0,thousand:",",format:{pos:"%s %v",neg:"%s (%v)",zero:"%s  --"}};
var moneyFormatQC={symbol:"$",precision:0,thousand:" ",format:{pos:"%v %s",neg:"(%v) %s ",zero:"-- %s"}};
var moneyFormatCA00={symbol:"$",precision:2,thousand:",",format:{pos:"%s %v",neg:"%s (%v)",zero:"%s  --"}};
var moneyFormatQC00={symbol:"$",precision:2,thousand:" ",format:{pos:"%v %s",neg:"(%v) %s ",zero:"-- %s"}};

var ccPercentage=ccPercentage||(function(){
	return{
	 WhatIsPPercentOfA:function(b,c){return(c/100*b)},
	 AIsWhatPercentOfB:function(d,c){return(d/c*100)},
	 AIsPPercentOfWhat:function(b,c){return(b/c*100)},
	 AIsAfterPPercentIncreaseOfWhat:function(b,c){return((b*100)/(100+c))},
	 WhatIsPercentIncreaseFromAtoB:function(d,c){return(c/d*100-100)},
	 WhatIsPercentDecreaseFromAtoB:function(d,c){return(100-c/d*100)}}
}()
);