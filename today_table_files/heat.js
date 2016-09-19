var ala_noCacheParam=Math.random()*10000000000;
var ala_protocol = location.protocol;
if (ala_protocol != 'https:'){
 ala_protocol = "http:";
}
document.write("<script src=\""+ala_protocol+"//ala.durasite.net/netkeiba.js?cid=29&ord="+ala_noCacheParam+"\" type=\"text/javascript\"></scr"+"ipt>");
