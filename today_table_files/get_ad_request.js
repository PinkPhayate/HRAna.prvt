var ad_number = 1; //広告ローテーションの初期値

function ShowListings(start, num) {

var i=6+6*(start-1);
var end=i+6*num;
while (i < end) {
var descr = zSr[i++]; // listing description
var unused1 = zSr[i++]; // (ignore)
var clickURL = zSr[i++]; // listing link
var title = zSr[i++]; // listing title
var sitehost = zSr[i++]; // advertiserfs domain name
var unused2 = zSr[i++]; // (ignore)
document.write('<li style="position:relative; display:block;">');
document.write('<dl class="ovt">');
document.write('<dt>');
document.write('<A class="title" TARGET="_new" HREF="' + clickURL + '">');
document.write(title);
document.write('</A>');
document.write('</dt>');
document.write('<dd>');
document.write('<A class="descr" TARGET="_new" HREF="' + clickURL + '">');
document.write(descr);
document.write('</A>');
document.write('</dd>');
document.write('<dd class="host">');
document.write('<A class="host" TARGET="_new" HREF="' + clickURL + '">');
document.write('(' + sitehost + ')');
document.write('</A>');
document.write('</dd>');
document.write('</dl>');
document.write('<A class="pr_link" TARGET="_blank" HREF="' + clickURL + '">');
document.write('</A>');
document.write('</li>');
}
}


function ShowListings_int_p0(start, num, max) {

var adcount = 0 ;

while(adcount < max){

	var	adcount = adcount + 1;

	var i=6+6*(start-1);
	var end=i+6*num;
	
	ad_number = ad_number + 1;	//広告のローテーションを自動で行う
	
	while (i < end) {
		var descr = zSr[i++]; // listing description
		var unused1 = zSr[i++]; // (ignore)
		var clickURL = zSr[i++]; // listing link
		var title = zSr[i++]; // listing title
		var sitehost = zSr[i++]; // advertiserfs domain name
		var unused2 = zSr[i++]; // (ignore)
		
		var	start = start + 1;
		
		if (! descr){
			return false;
		}
document.write('<ul class="floathack" onmouseover="this.style.backgroundColor = \'#f2ffe5\';" onmouseout="this.style.backgroundColor = \'#fff\';">');
document.write('<li style="position:relative; display:block;">');
document.write('<dl class="ovt">');
document.write('<dt>');
document.write('<A class="title" TARGET="_new" HREF="' + clickURL + '">');
document.write(title);
document.write('</A>');
document.write('</dt>');
document.write('<dd>');
document.write('<A class="descr" TARGET="_new" HREF="' + clickURL + '">');
document.write(descr);
document.write('</A>');
document.write('</dd>');
document.write('<dd class="host">');
document.write('<A class="host" TARGET="_new" HREF="' + clickURL + '">');
document.write('(' + sitehost + ')');
document.write('</A>');
document.write('</dd>');
document.write('</dl>');
document.write('<A class="pr_link" TARGET="_blank" HREF="' + clickURL + '">');
document.write('</A>');
document.write('</li>');
document.write('</ul>');
	}
}
}

function ShowListings_int(start, num, max) {

var adcount = 0 ;

while(adcount < max){

	var	adcount = adcount + 1;

	var i=6+6*(start-1);
	var end=i+6*num;
	
	ad_number = ad_number + 1;	//広告のローテーションを自動で行う
	
	while (i < end) {
		var descr = zSr[i++]; // listing description
		var unused1 = zSr[i++]; // (ignore)
		var clickURL = zSr[i++]; // listing link
		var title = zSr[i++]; // listing title
		var sitehost = zSr[i++]; // advertiserfs domain name
		var unused2 = zSr[i++]; // (ignore)
		
		var	start = start + 1;
		
		if (! descr){
			return false;
		}
		document.write('<li onmouseout="this.style.backgroundColor = \'#fff\';" onmouseover="this.style.backgroundColor = \'#fff1f1\';">');
		document.write('<a class="heightLine-pr" href="' + clickURL + '" target="_blank">');
		document.write('<span class="title">' + title + '</span>');
		document.write('<span class="host">(' + sitehost + ')</span>');
		document.write('<span class="descr">' + descr + '</span>');
		document.write('</a>');
		document.write('</li>');
	}
}
}

function ShowListings_int_p2(start, num, max) {

var adcount = 0 ;

while(adcount < max){

	var	adcount = adcount + 1;

	var i=6+6*(start-1);
	var end=i+6*num;
	
	ad_number = ad_number + 1;	//広告のローテーションを自動で行う
	
	while (i < end) {
		var descr = zSr[i++]; // listing description
		var unused1 = zSr[i++]; // (ignore)
		var clickURL = zSr[i++]; // listing link
		var title = zSr[i++]; // listing title
		var sitehost = zSr[i++]; // advertiserfs domain name
		var unused2 = zSr[i++]; // (ignore)
		
		var	start = start + 1;
		
		if (! descr){
			return false;
		}
		document.write('<li onmouseout="this.style.backgroundColor = \'#fff\';" onmouseover="this.style.backgroundColor = \'#fff1f1\';">');
		document.write('<a class="heightLine-pr" href="' + clickURL + '" target="_blank">');
		document.write('<span class="title">' + title + '</span>');
		document.write('<span class="descr">' + descr + '</span>');
		document.write('<span class="host">(' + sitehost + ')</span>');
		document.write('</a>');
		document.write('</li>');
	}
}
}

// 2009/05/28 ninomiya