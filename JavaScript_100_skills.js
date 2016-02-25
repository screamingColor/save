/**
 * Created by blue on 2016/2/20.
 */

/*RegExp���캯����һ������Ϊ�������ʽ���ı�����,����һ��������Ϊ��ѡ���־.��־�������ʹ��
?g ��ȫ�Ĳ��ң�
?i �����Դ�Сд��
?m �����в��ң�*/


//1.ԭ��javascriptʵ���ַ������Ƚ�ȡ
function cutstr(str,len){
    var temp;
    var icount = 0;
    var patrn = /[^\x00-\xff]/; //[^\x00-\xFF]��ʾƥ��Ascii�����255����Щ�ַ�
    var strre = "";
    for(var i = 0;i < str.length;i++){
        if(icount<len -1){
            temp = str.substr(i,1);//���ַ�������str�ĵ�i���ַ���ʼ,ȡ��һλ�ַ�
            if(patrn.exec(temp)==null){ //exec() �������ڼ����ַ����е��������ʽ��ƥ��
                icount = icount + 1
            }else{
                icount = icount + 2;
            }
            strre+=temp
        }else{
            break
        }

    }
    return strre + "..."
}

//2.ԭ��javascript��ȡ��������
function getHost(url){
    var host = 'null';
    if(typeof null=="undefined"||null ==url){
        url = window.location.href;
    }
    var regex = /^\w+\:\/\/([^\/]*).*/;
    var match = url.match(regex);
    if(typeof match != "undefined" && null != match){
        host = match[1];
    }
    return host;
}

//3.ԭ��javascript����ո�
String.prototype.trim = function(){
    var reExtraSpace = /^\s*(.*?)\s+$/;
    return  this.replace(reExtraSpace,"$1")//$1��$2��...��$99 	�� regexp �еĵ� 1 ���� 99 ���ӱ���ʽ��ƥ����ı���
}

//4.ԭ��javascript�滻ȫ��
String.prototype.replaceAll = function(s1,s2){
    return this.replace(new RegExp(s1,"gm"),s2)
    //g ִ��ȫ��ƥ�䣨��������ƥ��������ҵ���һ��ƥ���ֹͣ����
    //m ִ�ж���ƥ�䡣
}

//5.ԭ��javascriptת��html��ǩ
function HtmlEncode(text){
    return text.replace(/&/g, '&amp').replace(/\"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

//6.ԭ��javascript��ԭhtml��ǩ
function HtmlDecode(text){
    return text.replace(/&amp;/g, '&').replace(/&quot;/g, '\"').replace(/&lt;/g, '<').replace(/&gt;/g, '>')

}
//7.ԭ��javascriptʱ�����ڸ�ʽת��
Date.prototype.Format = function(formatStr) {
    var str = formatStr;
    var Week = ['��', 'һ', '��', '��', '��', '��', '��'];
    str = str.replace(/yyyy|YYYY/, this.getFullYear());
    str = str.replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() % 100));
    str = str.replace(/MM/, (this.getMonth() + 1) > 9 ? (this.getMonth() + 1).toString() : '0' + (this.getMonth() + 1));
    str = str.replace(/M/g, (this.getMonth() + 1));
    str = str.replace(/w|W/g, Week[this.getDay()]);
    str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());
    str = str.replace(/d|D/g, this.getDate());
    str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours());
    str = str.replace(/h|H/g, this.getHours());
    str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes());
    str = str.replace(/m/g, this.getMinutes());
    str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds());
    str = str.replace(/s|S/g, this.getSeconds());
    return str
}

//8.ԭ��javascript�ж��Ƿ�Ϊ��������
function isDigit(value){
    var patrn = /[0-9]*$/;
    if(patrn.exec(value)==null|| value==""){
        return false
    }else{
        return true
    }
}

//9.ԭ��javascript����cookieֵ
function setCookit(name,value,Hours){
    var d = new Date();
    var offset =8;
    var utc = d.getTime()+(d.getTimezoneOffset()*6000);
    //getTimezoneOffset() �����ɷ��ظ�������ʱ��ͱ���ʱ��֮���ʱ��Է���Ϊ��λ��
    var nd = utc + (3600000*offset);
    var exp = new Date(nd);
    exp.setTime(exp.getTime() + Hours * 60 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";path=/;expires=" + exp.toGMTString() + ";domain=360doc.com;"
    //toGMTString() �����ɸ��ݸ�������ʱ�� (GMT) �� Date ����ת��Ϊ�ַ����������ؽ����
}
//10.ԭ��javascript��ȡcookieֵ
function getCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]);
    return null
}

//11.ԭ��javascript�����ղؼ�
function AddFavorite(sURL,sTitle){
    try{
        window.external.addFavorite(sURL,sTitle)
    }catch(e){
        try{
            window.sidebar.addPanel(sTitle,sURL,'')
        }catch(e){
            alert('�����ղؼ�ʧ�ܣ���ʹ��ctrl+d��������')
        }
    }
}
//12.ԭ��javascript������ҳ
function setHomepage() {
    if (document.all) {
        document.body.style.behavior = 'url(#default#homepage)';
        document.body.setHomePage('http://www.jq-school.com')
    } else if (window.sidebar) {
        if (window.netscape) {
            try {
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect")
            } catch (e) {
                alert("�ò�����������ܾ�����������øù��ܣ����ڵ�ַ�������� about:config,Ȼ���� signed.applets.codebase_principal_support ֵ��Ϊtrue")
            }
        }
        var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
        prefs.setCharPref('browser.startup.homepage', 'http://www.jq-school.com')
    }
}


//13.ԭ��javascript�ж�ie6
var ua = navigator.userAgent.toLowerCase();
var isIE6 = ua.indexOf('msie 6') > -1;//msie������ں�
if(isIE6){
    try{
        document.execCommand("BackgroundImageCache",false,true)
        //execCommand������ִ��һ���Ե�ǰ�ĵ�����ǰѡ����߸�����Χ�����
        //�ڶ������� �Ƿ���ʾ�Ի���
        //���������� ��̬����һ��Ϊһ����ֵ������ֵ����true
    }catch(e){ }
}

//14.ԭ��javascript������ʽ�ļ�
function LoadStyle(url){
    try{
        document.createStyleSheet(url)
    }catch(e){
        var cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.type = 'text/css';
        cssLink.href = url;
        var head = document.getElementsByClassName('head')[0];
        head.appendChild(cssLink)
    }
}

//15.ԭ��javascript���ؽű�����
function evalscript(s){
    if(s.indexOf('<script') == -1) return s;
    // indexOf() �����Դ�Сд���У�
    //���Ҫ�������ַ���ֵû�г��֣���÷������� -1
    var p = /<script[^\>]*?>([^\x00]*?)<\/script>/ig;
    var arr = [];
    while(arr = p.exec(s)) {
        var p1 = /<script[^\>]*?src=\"([^\>]*?)\"[^\>]*?(reload=\"1\")?(?:charset=\"([\w\-]+?)\")?><\/script>/i;
        var arr1 = [];
        arr1 = p1.exec(arr[0]);
        if(arr1) {
            appendscript(arr1[1], '', arr1[2], arr1[3]);
        } else {
            p1 = /<script(.*?)>([^\x00]+?)<\/script>/i;
            arr1 = p1.exec(arr[0]);
            appendscript('', arr1[2], arr1[1].indexOf('reload=') != -1);
        }
    }
    return s;
}

//16.ԭ��javascript����ű�����
function stripscript(s){
    return s.replace(/<script.*?>.*?<\/script>/ig, '');
}

//17.ԭ��javascript��̬���ؽű��ļ�
function appendscript(src, text, reload, charset) {
    var id = hash(src + text);
    if (!reload && in_array(id, evalscripts)) return;
    if (reload && $(id)) {
        $(id).parentNode.removeChild($(id));
    }
    evalscripts.push(id);
    var scriptNode = document.createElement("script")
    scriptNode.type = 'text/javascript';
    scriptNode.id = id;
    scriptNode.charset = charset ? charset : (browser.firefox ? document.characterSet : document.charset);
    try {
        if (src) {
            scriptNode.src = src;
            scriptNode.onloadDone = false;
            scriptNode.onload = function () {
                scriptNode.onloadDone = true;
                JSLOADED[src] = 1;
            };
            scriptNode.onreadystatechange = function () {
                if ((scriptNode.readyState == 'loaded' || scriptNode.readyState == 'complete') && !scriptNode.onloadDone) {
                    scriptNode.onloadDone = true;
                    JSLOADED[src] = 1;
                }
            };
        } else if (text) {
            scriptNode.text = text;
        }
        document.getElementsByTagName('head')[0].appendChild(scriptNode);
    } catch (e) {
    }
}

//18.ԭ��javascript����������汾����
function $(id){
    return !id ? null :��document.getElementById(id);
}
//19.ԭ��javascript����������汾����
function browserVersion(types) {
    var other = 1;
    for(i in types) {
        var v = types[i] ? types[i]: i;
        if(USERAGENT.indexOf(v) != -1) {
            var re = new RegExp(v + '(\\/|\\s)([\\d\\.]+)', 'ig');
            var matches = re.exec(USERAGENT);
            var ver = matches != null ? matches[2] : 0;
            other = ver !== 0 && v != 'mozilla' ? 0 : other;
        }else {
            var ver = 0;
        }
        eval('BROWSER.' + i + '= ver');
    }
    BROWSER.other = other;
}

//20.ԭ��javascriptԪ����ʾ��ͨ�÷���
function $(id) {
    return !id ? null : document.getElementById(id);
}
function display(id) {
    var obj = $(id);
    if(obj.style.visibility) {
        obj.style.visibility = obj.style.visibility == 'visible' ? 'hidden' : 'visible';
    } else {
        obj.style.display = obj.style.display == '' ? 'none' : '';
    }
}
//21.ԭ����javascript����insertBefore��������ȴû��inserAfter����
function insertAfter(newChild,refChild){
    var parElem = refChild.parentNode;
    if(parElem.lastChild == refChild){
        refChild.appendChild(newChild);
    }else{
        parElem.insertBefore(newChild,refChild.nextSibling);
    }
}

//22.ԭ��javascript�м����������Ԫ���¼�
function addEventSamp(obj,evt,fn){
    if(obj.addEventListener){
        obj.addEventListener(evt,fn,false);
    }else if(obj.attachEvent){
        obj.attachEvent('on'+evt,fn);
    }
}

//23.ԭ��javascript���ͣ�����ֺ��棬�ı����ý���ʱ����
function focuslast(){
    var e = event.srcElement;
    var r = e.createTextRange();
    r.moveStart('character', e.value.length);
    r.collapse(true);
    r.select();
}
//24.ԭ��javascript����URL�����Ƿ���Ч
function getUrlState(URL){
    var xmlhttp = new ActiveXObject('microsoft.xmlhttp');
    xmlhttp.open('GET',URL,false);
    try{
        xmlhttp.send();
    }catch(e){
    }finally{
        var result = xmlhttp.responseText;
        if(result){
            if(xmlhttp.STATUS_CODES==200){
                return true
            }else{
                return false
            }
        }else{
            return false
        }
    }
}

//25.ԭ��javascript��ʽ��CSS��ʽ����
function formatCss(s){//��ʽ������
    s = s.replace(/\s*([\{\}\:\;\,])\s*/g, "$1");
    s = s.replace(/;\s*;/g, ";"); //��������ֺ�
    s = s.replace(/\,[\s\.\#\d]*{/g, "{");
    s = s.replace(/([^\s])\{([^\s])/g, "$1 {\n\t$2");
    s = s.replace(/([^\s])\}([^\n]*)/g, "$1\n}\n$2");
    s = s.replace(/([^\s]);([^\s\}])/g, "$1;\n\t$2");
    return s;
}

//26.ԭ��javascriptѹ��CSS����
function yasuoCss (s) {//ѹ������
    s = s.replace(/\/\*(.|\n)*?\*\//g, ""); //ɾ��ע��
    s = s.replace(/\s*([\{\}\:\;\,])\s*/g, "$1");
    s = s.replace(/\,[\s\.\#\d]*\{/g, "{"); //�ݴ�����
    s = s.replace(/;\s*;/g, ";"); //��������ֺ�
    s = s.match(/^\s*(\S+(\s+\S+)*)\s*$/); //ȥ����β�հ�
    return (s == null) ? "" : s[1];
}
//27.ԭ��javascript��ȡ��ǰ·��
var currentPageUrl = "";
if (typeof this.href === "undefined") {
    currentPageUrl = document.location.toString().toLowerCase();
}
else {
    currentPageUrl = this.href.toString().toLowerCase();
}

//28.ԭ��javascript IP ת������
function _ip2int(ip){
    var num = 0;
    ip = ip.split('.')
    num = Number(ip[0])*256*256*256+Number(ip[1])*256*256+Number(ip[2])*256 + Number(ip[3]);
    num = num>>>0;//���з���ֵת����0,���д��ڵ��� 0 ��ȡ��������

    return num;
}

//29.ԭ��javascript���ͽ�����IP��ַ
function _int2iP(num){
    var str;
    var tt = new Array();
    tt[0] = (num >>> 24) >>> 0;
    tt[1] = ((num << 8) >>> 24) >>> 0;
    tt[2] = (num << 16) >>> 24;
    tt[3] = (num << 24) >>> 24;
    str = String(tt[0]) + "." + String(tt[1]) + "." + String(tt[2]) + "." + String(tt[3]);
    return str;
}

//30.ԭ��javascriptʵ��checkboxȫѡ�벻ѡ
function checkAll(){
    var selectall = document.getElementById("selectall");
    var allbox = document.getElementsByName("allbox");
    if(selectall.checked){
        for(var i = 0;i<allbox.length;i++){
            allbox[i].checked = true;
        }
    }else{
        for(var i = 0;i<allbox.length;i++){
            allbox[i].checked = false;
        }
    }
}

//..............................�ƶ�ƪ..............................
//ԭ��javascript�ж��Ƿ��ƶ��豸
function isMobile(){
    if (typeof this._isMobile === 'boolean'){
        return this._isMobile;
    }
    var screenWidth = this.getScreenWidth();
    var fixViewPortsExperiment = rendererModel.runningExperiments.FixViewport || rendererModel.runningExperiments.fixviewport;
    var fixViewPortsExperimentRunning = fixViewPortsExperiment && (fixViewPortsExperiment.toLowerCase() === "new");
    if(!fixViewPortsExperiment){
        if(!this.isAppleMobileDevice()){
            screenWidth = screenWidth/window.devicePixelRatio;
        }
    }
    var isMobileScreenSize = screenWidth < 600;
    var isMobileUserAgent = false;
    this._isMobile = isMobileScreenSize && this.isTouchScreen();
    return this._isMobile;
}

//32.ԭ��javascript�ж��Ƿ��ƶ��豸����
function isMobileUserAgent(){
    return (/iphone|ipod|android.*mobile|windows.*phone|blackberry.*mobile/i.test(window.navigator.userAgent.toLowerCase()));
}

//33.ԭ��javascript�ж��Ƿ�ƻ���豸����
function isAppleMobileDevice(){
    return (/iphone|ipod|ipad|Macintosh/i.test(navigator.userAgent.toLowerCase()));
}

//34.ԭ��javascript�ж��Ƿ�׿�豸����
function isAndroidMobileDevice(){
    return (/android/i.test(navigator.userAgent.toLowerCase()));
}

//35.ԭ��javascript�ж��Ƿ�Touch��Ļ
function isTouchScreen(){
    return (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
}

//36.ԭ��javascript�ж��Ƿ��ڰ�׿�ϵĹȸ������
function isNewChromeOnAndroid(){
    if(this.isAndroidMobileDevice()){
        var userAgent = navigator.userAgent.toLowerCase();
        if((/chrome/i.test(userAgent))){
            var parts = userAgent.split('chrome/');

            var fullVersionString = parts[1].split(" ")[0];
            var versionString = fullVersionString.split('.')[0];
            var version = parseInt(versionString);

            if(version >= 27){
                return true;
            }
        }
    }
    return false;
}

//37.ԭ��javascript�ж��Ƿ���Ӵ�
function isViewportOpen() {
    return !!document.getElementById('wixMobileViewport');
    //!!���ǽ������������Ͷ�ת����boolean��
    /*����
    var o={flag:true};
    var test=!!o.flag;//��Ч��var test=o.flag||false;*/
}

//38.ԭ��javascript��ȡ�ƶ��豸��ʼ����С
function getInitZoom(){
    if(!this._initZoom){
        var screenWidth = Math.min(screen.height, screen.width);
        if(this.isAndroidMobileDevice() && !this.isNewChromeOnAndroid()){
            screenWidth = screenWidth/window.devicePixelRatio;
        }
        this._initZoom = screenWidth /document.body.offsetWidth;
    }
    return this._initZoom;
}

//39.ԭ��javascript��ȡ�ƶ��豸��󻯴�С
function getZoom(){
    var screenWidth = (Math.abs(window.orientation) === 90) ? Math.max(screen.height, screen.width) : Math.min(screen.height, screen.width);
    if(this.isAndroidMobileDevice() && !this.isNewChromeOnAndroid()){
        screenWidth = screenWidth/window.devicePixelRatio;
    }
    var FixViewPortsExperiment = rendererModel.runningExperiments.FixViewport || rendererModel.runningExperiments.fixviewport;
    var FixViewPortsExperimentRunning = FixViewPortsExperiment && (FixViewPortsExperiment === "New" || FixViewPortsExperiment === "new");
    if(FixViewPortsExperimentRunning){
        return screenWidth / window.innerWidth;
    }else{
        return screenWidth / document.body.offsetWidth;
    }
}

//40./ԭ��javascript��ȡ�ƶ��豸��Ļ����
function getScreenWidth(){
    var smallerSide = Math.min(screen.width, screen.height);
    var fixViewPortsExperiment = rendererModel.runningExperiments.FixViewport || rendererModel.runningExperiments.fixviewport;
    var fixViewPortsExperimentRunning = fixViewPortsExperiment && (fixViewPortsExperiment.toLowerCase() === "new");
    if(fixViewPortsExperiment){
        if(this.isAndroidMobileDevice() && !this.isNewChromeOnAndroid()){
            smallerSide = smallerSide/window.devicePixelRatio;
        }
    }
    return smallerSide;
}
//...........�ƶ�����............


//41.ԭ��javascript�����ж��Ƿ�Ϊ��ַ
function IsURL(strUrl) {
    var regular = /^\b(((https?|ftp):\/\/)?[-a-z0-9]+(\.[-a-z0-9]+)*\.(?:com|edu|gov|int|mil|net|org|biz|info|name|museum|asia|coop|aero|[a-z][a-z]|((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d))\b(\/[-a-z0-9_:\@&?=+,.!\/~%\$]*)?)$/i
    if (regular.test(strUrl)) {
        return true;
    }
    else {
        return false;
    }
}
//42.ԭ��javascript������ʽ���Ƽ���Ԫ�ض���
function getElementsByClassName(name){
    var tags = document.getElementsByTagName('*')||document.all;
    var els = [];
    for(var i = 0;i<tags.length;i++){
        if(tags[i].classList){
            var cs = tags[i].className.split(' ');
            for(var j = 0;j<cs.length;j++){
                if(name==cs[j]){
                    els.push(tags[i]);
                    break
                }
            }
        }
    }
    return els
}

//43.ԭ��javascript�ж��Ƿ���ĳ���ַ�����ͷ
String.prototype.startWith = function(s){
    return this.indexOf(s)==0
}

//44.ԭ��javascript�ж��Ƿ���ĳ���ַ�������
String.prototype.endWith = function(s){
    var d = this.length - s.length;
    return(d>=0 && this.lastIndexOf(s)==d)
}

//45.ԭ��javascript����IE������汾��
function getIE(){
    if(window.ActiveXObject){
        var v =navigator.userAgent.match(/MSIE ([^;]+)/)[1];
        return parseFloat(v.substring(0, v.indexOf(".")))
    }
    return false
}

//46.ԭ��javascript��ȡҳ��߶�
function getPageHeight(){
    var g = document,
        a = g.body,
        f = g.documentElement,
        d = g.compatMode == 'BackCompat'? a : g.documentElement;
    return Math.max(f.scrollHeight, a.scrollHeight, d.clientHeight);
}
/*document.compatMode�����жϵ�ǰ��������õ���Ⱦ��ʽ��

�ٷ����ͣ�

BackCompat����׼����ģʽ�رա�
CSS1Compat����׼����ģʽ������
��document.compatMode����BackCompatʱ��������ͻ���������document.body.clientWidth��
��document.compatMode����CSS1Compatʱ��������ͻ���������document.documentElement.clientWidth��*/

//47.ԭ��javascript��ȡscrollLeft
function getPageScrollLeft(){
    var a = document;
    return a.documentElement.scrollLeft || a.body.scrollLeft;
}

//48.ԭ��javascript��ȡҳ����ӿ���
function getPageViewWidth(){
    var d = document,
        a = d.compatMode == 'BackCompat'
        ? d.body : d.documentElement;
    return a.clientWidth;
}
//49.ԭ��javascript��ȡҳ�����
function getPageWidth(){
    var g = document, a = g.body, f = g.documentElement, d = g.compatMode == "BackCompat"
        ? a
        : g.documentElement;
    return Math.max(f.scrollWidth, a.scrollWidth, d.clientWidth);
}

//50.ԭ��javascript��ȡҳ��scrollTop
function getPageScrollTop(){
    var a = document;
    return a.documentElement.scrollTop || a.body.scrollTop;
}

//51.ԭ��javascript��ȡҳ����Ӹ߶�
function getPageViewHeight() {
    var d = document, a = d.compatMode == "BackCompat"
        ? d.body
        : d.documentElement;
    return a.clientHeight;
}

//52.ԭ��javascript������������¼�
function addEvt(oTarget,sEvtType,fnHandle){
    if(!oTarget){return;}
    if(oTarget.addEventListener){
        oTarget.addEventListener(sEvtType,fnHandle,false);
    }else if(oTarget.attachEvent){
        oTarget.attachEvent("on"+sEvtType,fnHandle);
    }else{
        oTarget["on"+sEvtType] = fnHandle;
    }
}

//53.ԭ��javascript�������ɾ���¼�
function addEvt(oTarget,sEvtType,fnHandle){
    if(!oTarget){return;}
    if(oTarget.addEventListener){
        oTarget.addEventListener(sEvtType,fnHandle,false);
    }else if(oTarget.attachEvent){
        oTarget.attachEvent("on"+sEvtType,fnHandle);
    }else{
        oTarget["on"+sEvtType] = null;
    }
}

//54.ԭ��javascriptȥ��urlǰ׺
function removeUrlPrefix(a){
    a= a.replace(/:/g,".").replace(/��/g,"/");
    while(trim(a).toLocaleLowerCase().indexOf("http://")==0){
        a = trim(a.replace(/http:\/\//i,""));
    }
    return a;
}

//55.ԭ��javascript���ʱ���
function uniqueId(){
    var a = Math.random,b=parseInt;
    return Number(new Date()).toString()+b(10*a())+b(10*a())+b(10*a());
}
//56.ԭ��javascriptȫ�ǰ��ת����icase:0ȫ���룬1 �뵽ȫ��������ת��
function chgCase(sStr,iCase){
    if(typeof sStr != "string" || sStr.length <= 0 || !(iCase === 0 || iCase == 1)){
        return sStr;
    }
    var i,oRs=[],iCode;
    if(iCase){/*��->ȫ*/
        for(i=0; i<sStr.length;i+=1){
            iCode = sStr.charCodeAt(i);
            if(iCode == 32){
                iCode = 12288;
            }else if(iCode < 127){
                iCode += 65248;
            }
            oRs.push(String.fromCharCode(iCode));
        }
    }else{/*ȫ->��*/
        for(i=0; i<sStr.length;i+=1){
            iCode = sStr.charCodeAt(i);
            if(iCode == 12288){
                iCode = 32;
            }else if(iCode > 65280 && iCode < 65375){
                iCode -= 65248;
            }
            oRs.push(String.fromCharCode(iCode));
        }
    }
    return oRs.join("");
}

//57.ԭ����javascriptȷ���Ƿ������Ч����ֵ
function checkKey(iKey){
    if(iKey == 32 || iKey == 229){return true;}/*�ո���쳣*/
    if(iKey>47 && iKey < 58){return true;}/*����*/
    if(iKey>64 && iKey < 91){return true;}/*��ĸ*/
    if(iKey>95 && iKey < 108){return true;}/*���ּ���1*/
    if(iKey>108 && iKey < 112){return true;}/*���ּ���2*/
    if(iKey>185 && iKey < 193){return true;}/*����1*/
    if(iKey>218 && iKey < 223){return true;}/*����2*/
    return false;
}

//58.ԭ��javascript��ȡ��ҳ����ȥ��λ��
function getScrollXY(){
    return document.body.scrollTop ?{
        x:document.body.scrollLeft,
        y:document.body.scrollTop
    }:{
        x:document.documentElement.scrollLeft,
        y:document.documentElement.scrollTop
    }
}

//59.ԭ��JavaScript��һ���������ڸ�ʽ������+���÷���
Date.prototype.format = function(format){ //author: meizz
    var o = {
        "M+" : this.getMonth()+1, //month
        "d+" : this.getDate(),    //day
        "h+" : this.getHours(),   //hour
        "m+" : this.getMinutes(), //minute
        "s+" : this.getSeconds(), //second
        "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
        "S" : this.getMilliseconds() //millisecond
    }
    if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
        (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)if(new RegExp("("+ k +")").test(format))
        format = format.replace(RegExp.$1,
            RegExp.$1.length==1 ? o[k] :
                ("00"+ o[k]).substr((""+ o[k]).length));
    return format;
}
alert(new Date().format("yyyy-MM-dd hh:mm:ss"));

//60.ԭ��JavaScriptʱ����Ի��������
/*
 1��< 60s, ��ʾΪ���ոա�
 2��>= 1min && < 60 min, ��ʾ�뵱ǰʱ��XX����ǰ��
 3��>= 60min && < 1day, ��ʾ�뵱ǰʱ������ XX:XX��
 4��>= 1day && < 1year, ��ʾ���ڡ�XX��XX�� XX:XX��
 5��>= 1year, ��ʾ�������ڡ�XXXX��XX��XX�� XX:XX��
 */
function timeFormat(time){
    var date = new Date(time)
        , curDate = new Date()
        , year = date.getFullYear()
        , month = date.getMonth() + 1
        , day = date.getDate()
        , hour = date.getHours()
        , minute = date.getMinutes()
        , curYear = curDate.getFullYear()
        , curHour = curDate.getHours()
        , timeStr;

    if(year < curYear){
        timeStr = year +'��'+ month +'��'+ day +'�� '+ hour +':'+ minute;
    }else{
        var pastTime = curDate - date
            , pastH = pastTime/3600000;

        if(pastH > curHour){
            timeStr = month +'��'+ day +'�� '+ hour +':'+ minute;
        }else if(pastH >= 1){
            timeStr = '���� ' + hour +':'+ minute +'��';
        }else{
            var pastM = curDate.getMinutes() - minute;
            if(pastM > 1){
                timeStr = pastM +'����ǰ';
            }else{
                timeStr = '�ո�';
            }
        }
    }
    return timeStr;
}

//61.ԭ��javascript���offsetX����������
//��Ի����֧��offsetX/Y
// ��Ի����֧��offsetX/Y
function getOffset(e){
    var target = e.target, // ��ǰ������Ŀ�����
        eventCoord,
        pageCoord,
        offsetCoord;

    // ���㵱ǰ����Ԫ�ص��ĵ��ľ���
    pageCoord = getPageCoord(target);

    // �����굽�ĵ��ľ���
    eventCoord = {
        X : window.pageXOffset + e.clientX,
        Y : window.pageYOffset + e.clientY
    };

    // �����ȡ��굽��һ����λ�ĸ�Ԫ�ص�����
    offsetCoord = {
        X : eventCoord.X - pageCoord.X,
        Y : eventCoord.Y - pageCoord.Y
    };
    return offsetCoord;
}

function getPageCoord(element){
    var coord = { X : 0, Y : 0 };
    // ����ӵ�ǰ����Ԫ�ص����ڵ�Ϊֹ��
    // ���� offsetParent Ԫ�ص� offsetLeft �� offsetTop ֵ֮��
    while (element){
        coord.X += element.offsetLeft;
        coord.Y += element.offsetTop;
        element = element.offsetParent;
    }
    return coord;
}

//62.ԭ��javascript���õ��������ʽ
/*
//������
/^[0-9]*[1-9][0-9]*$/;
//������
/^-[0-9]*[1-9][0-9]*$/;
//��������
/^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;
//��������
/^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/;
//������
/^(-?\d+)(\.\d+)?$/;
//email��ַ
/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
//url��ַ
/^[a-zA-z]+://(\w+(-\w+)*)(\.(\w+(-\w+)*))*(\?\S*)?$/;
//��/��/�գ���-��-�ա���.��.�գ�
/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/;
//ƥ�������ַ�
/[\u4e00-\u9fa5]/;
//ƥ���ʺ��Ƿ�Ϸ�(��ĸ��ͷ������5-10�ֽڣ�������ĸ�����»���)
/^[a-zA-Z][a-zA-Z0-9_]{4,9}$/;
//ƥ��հ��е��������ʽ
/\n\s*\r/;
//ƥ���й���������
/[1-9]\d{5}(?!\d)/;
//ƥ������֤
/\d{15}|\d{18}/;
//ƥ����ڵ绰����
/(\d{3}-|\d{4}-)?(\d{8}|\d{7})?/;
//ƥ��IP��ַ
/((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)/;
//ƥ����β�հ��ַ����������ʽ
/^\s*|\s*$/;
//ƥ��HTML��ǵ��������ʽ
< (\S*?)[^>]*>.*?|< .*? />;
*/

//63.ԭ��javascriptʵ�ַ��ض�����ͨ�÷���
//ceil() ����ִ�е�������ȡ������,�����ص��Ǵ��ڻ���ں�������,������֮��ӽ���������
function backTop(btnId) {
    var btn = document.getElementById(btnId);
    var d = document.documentElement;
    var b = document.body;
    window.onscroll = set;
    btn.style.display = "none";
    btn.onclick = function() {
        btn.style.display = "none";
        window.onscroll = null;
        this.timer = setInterval(function() {
                d.scrollTop -= Math.ceil((d.scrollTop + b.scrollTop) * 0.1);
                b.scrollTop -= Math.ceil((d.scrollTop + b.scrollTop) * 0.1);
                if ((d.scrollTop + b.scrollTop) == 0) clearInterval(btn.timer, window.onscroll = set);
            },
            10);
    };
    function set() {
        btn.style.display = (d.scrollTop + b.scrollTop > 100) ? 'block': "none"
    }
};
backTop('goTop');

//64.ԭ��javascript��ȡurl�е�GET����ֵ
// �÷��������ַ�� test.htm?t1=1&t2=2&t3=3, ��ô��ȡ�ã�GET["t1"], GET["t2"], GET["t3"]
function get_get(){
    querystr = window.location.href.split('?');
    if(querystr[1]){
        GETs = querystr[1].split("&");
        GET = new Array();
        for(var i=0;i<GETs.length;i++){
            tmp_arr = GETs[i].split("=");
            key = tmp_arr[0];
            GET[key] = tmp_arr[1]
        }
    }
    return querystr[1];
}

//66.ԭ��javascriptʵ��ȫ��ȡ��ѡ��ͨ�÷���
function checkall(form, prefix, checkall) {
    var checkall = checkall ? checkall : 'chkall';
    for(var i = 0; i < form.elements.length; i++) {
        var e = form.elements[i];
        if(e.type=="checkbox"){
            e.checked = form.elements[checkall].checked;
        }
    }
}

//67.ԭ��javascriptʵ�ִ�һ������ͨ�÷���
function openWindow(url,windowName,width,height){
    var x = parseInt(screen.width / 2.0) - (width / 2.0);
    var y = parseInt(screen.height / 2.0) - (height / 2.0);
    var isMSIE= (navigator.appName == "Microsoft Internet Explorer");
    if (isMSIE) {
        var p = "resizable=1,location=no,scrollbars=no,width=";
        p = p+width;
        p = p+",height=";
        p = p+height;
        p = p+",left=";
        p = p+x;
        p = p+",top=";
        p = p+y;
        retval = window.open(url, windowName, p);
    } else {
        var win = window.open(url, "ZyiisPopup", "top=" + y + ",left=" + x + ",scrollbars=" + scrollbars + ",dialog=yes,modal=yes,width=" + width + ",height=" + height + ",resizable=no" );
        eval("try { win.resizeTo(width, height); } catch(e) { }");
        win.focus();
    }
}
//68.ԭ��javascript�ж��Ƿ�Ϊ�ͻ����豸
function client(o){
    var b = navigator.userAgent.toLowerCase();
    var t = false;
    if (o == 'isOP'){
        t = b.indexOf('opera') > -1;
    }
    if (o == 'isIE'){
        t = b.indexOf('msie') > -1;
    }
    if (o == 'isFF'){
        t = b.indexOf('firefox') > -1;
    }
    return t;
}

//69.ԭ��javascript�ж��Ƿ�Ϊ�ͻ����豸
function client(o){
    var b = navigator.userAgent.toLowerCase();
    var t = false;
    if (o == 'isOP'){
        t = b.indexOf('opera') > -1;
    }
    if (o == 'isIE'){
        t = b.indexOf('msie') > -1;
    }
    if (o == 'isFF'){
        t = b.indexOf('firefox') > -1;
    }
    return t;
}

//69.ԭ��JavaScript��ȡ��ѡ��ť��ֵ
function get_radio_value(field){
    if(field&&field.length){
        for(var i=0;i<field.length;i++){
            if(field[i].checked){
                return field[i].value;
            }
        }
    }else {
        return ;
    }
}
/*checked ���Կ����û򷵻�ĳ����ѡ��ť�Ƿ�ѡ�С�
�﷨:
radioObject.checked=true|false
*/


//70.ԭ��javascript��ȡ��ѡ���ֵ
function get_checkbox_value(field){
    if(field&&field.length){
        for(var i=0;i<field.length;i++){
            if(field[i].checked && !field[i].disabled){
                return field[i].value;
            }
        }
    }else {
        return;
    }
}

//��������������������������֤��������������������

//71.ԭ��javascript�ж��Ƿ�Ϊ����
function isEmail(str){
    var re=/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    if (re.test(str) != true) {
        return false;
    }else{
        return true;
    }
}

//72.ԭ��javascript�ж��б����ܷ���Σ���ַ�
function isValidReg(chars){
    var re=/<|>|\[|\]|\{|\}|��|��|��|��|��|��|��|��|��|��|��|��|��|��|��|�I|�j|?|��|��|��|��|��|��|��|��|��|��|��|��|��|��|��|��|��|��|��|��|��|��|��|��|��|��|��|��|��|��|��|��|��|��|��|��|��|��|�{|�}|\*|@|#|\^|\\/;
    if (re.test( chars) == true) {
        return false;
    }else{
        return true;
    }
}

//73.ԭ��javascript�ж��ַ��Ƿ���ڹ涨�ĳ���
function isValidLength(chars, len) {
    if (chars.length < len) {
        return false;
    }
    return true;
}

//74.ԭ��javascript�ж��ַ����Ƿ�Ϊ��ַ �����ִ�Сд
function isValidURL( chars ) {
    var re=/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(\S+\.\S+)$/;
    if (!isNULL(chars)) {
        chars = jsTrim(chars);
        if (chars.match(re) == null)
            return false;
        else
            return true;
    }
    return false;
}
//75.ԭ��javascript�ж��ַ����Ƿ�ΪС��
function isValidDecimal( chars ) {
    var re=/^\d*\.?\d{1,2}$/;
    if (chars.match(re) == null)
        return false;
    else
        return true;
}

//76.ԭ��javascript�ж��ַ����Ƿ�Ϊ����
function isNumber( chars ) {
    var re=/^\d*$/;
    if (chars.match(re) == null)
        return false;
    else
        return true;
}

//77.ԭ��javascript�ж��ַ����Ƿ�Ϊ������
function isFloat( str ) {
    for(i=0;i<str.length;i++)  {
        if ((str.charAt(i)<"0" || str.charAt(i)>"9")&& str.charAt(i) != '.'){
            return false;
        }
    }
    return true;
}
//78.javascript�ж��ַ��Ƿ�ΪA-Za-zӢ����ĸ
function isLetters( str ){
    var re=/^[A-Za-z]+$/;
    if (str.match(re) == null)
        return false;
    else
        return true;
}
//79.javascript�ж��ַ����Ƿ���������
function isValidPost( chars ) {
    var re=/^\d{6}$/;
    if (chars.match(re) == null)
        return false;
    else
        return true;
}

//80.ԭ��JavaScript�ж��ַ��Ƿ��NULL
function isNULL( chars ) {
    if (chars == null)
        return true;
    if (jsTrim(chars).length==0)
        return true;
    return false;
}
//����������������������������������������������������������������


//81.ԭ��javascript���������ʽ��ȡҳ�������������ַ
var aa = document.documentElement.outerHTML.match(/(url\(|src=|href=)[\"\']*([^\"\'\(\)\<\>\[\] ]+)[\"\'\)]*|(http:\/\/[\w\-\.]+[^\"\'\(\)\<\>\[\] ]+)/ig).join("\r\n").replace(/^(src=|href=|url\()[\"\']*|[\"\'\>\) ]*$/igm,"");
alert(aa)

//82.ԭ��javascript���������ʽ�����ͬ�����飨��Ч�ʣ�
Array.prototype.unique=function(){
    return this.reverse().join(",").match(/([^,]+)(?!.*\1)/ig).reverse();
}
//83.ԭ��javascript���������ʽ�����ͬ�����飨��Ч�ʣ�
String.prototype.unique=function(){
    var x=this.split(/[\r\n]+/);
    var y='';
    for(var i=0;i<x.length;i++){
        if(!new RegExp("^"+x[i].replace(/([^\w])/ig,"\\$1")+"$","igm").test(y)){
            y+=x[i]+"\r\n"
        }
    }
    return y
}

//84.ԭ��javascript���������ʽ����ĸ���򣬶�ÿ�н�����������
function SetSort(){
    var text=K1.value.split(/[\r\n]/).sort().join("\r\n");//˳��
    var test=K1.value.split(/[\r\n]/).sort().reverse().join("\r\n");//����
    K1.value=K1.value!=text?text:test;
}
//85.ԭ��JavaScript�ַ�������
function IsReverse(text){
    return text.split('').reverse().join('');
}

//86.ԭ��JavaScript���������ʽ���html�����еĽű�
function clear_script(){
    K1.value=K1.value.replace(/<script.*?>[\s\S]*?<\/script>|\s+on[a-zA-Z]{3,16}\s?=\s?"[\s\S]*?"|\s+on[a-zA-Z]{3,16}\s?=\s?'[\s\S]*?'|\s+on[a-zA-Z]{3,16}\s?=[^ >]+/ig,"");
}

//87.ԭ��JavaScript��ִ̬��JavaScript�ű�
function javascript(){
    try{
        eval(K1.value);
    }catch(e){
        alert(e.message);
    }
}

//88.ԭ��JavaScript��ִ̬��VBScript�ű�
function vbscript(){
    try{
        var script=document.getElementById("K1").value;
        if(script.trim()=="")return;
        window.execScript('On Error Resume Next \n'+script+'\n If Err.Number<>0 Then \n MsgBox "��������ȷ��VBScript�ű�!",48,"�ű�����!" \n End If',"vbscript")
    }catch(e){
        alert(e.message);
    }
}
//89.ԭ��JavaScriptʵ�ֽ���дת������
function transform(tranvalue) {
    try {
        var i = 1;
        var dw2 = new Array("", "��", "��"); //��λ
        var dw1 = new Array("ʰ", "��", "Ǫ"); //С��λ
        var dw = new Array("��", "Ҽ", "��", "��", "��", "��", "½", "��", "��", "��"); //����������
        //������Сдת���ɴ�д��ʾ�ںϼƴ�д���ı�����
        //����������С��
        var source = splits(tranvalue);
        var num = source[0];
        var dig = source[1];
        //ת����������
        var k1 = 0; //��С��λ
        var k2 = 0; //�ƴ�λ
        var sum = 0;
        var str = "";
        var len = source[0].length; //�����ĳ���
        for (i = 1; i <= len; i++) {
            var n = source[0].charAt(len - i); //ȡ��ĳ��λ���ϵ�����
            var bn = 0;
            if (len - i - 1 >= 0) {
                bn = source[0].charAt(len - i - 1); //ȡ��ĳ��λ��ǰһλ�ϵ�����
            }
            sum = sum + Number(n);
            if (sum != 0) {
                str = dw[Number(n)].concat(str); //ȡ�ø����ֶ�Ӧ�Ĵ�д���֣������뵽str�ַ�����ǰ��
                if (n == '0') sum = 0;
            }
            if (len - i - 1 >= 0) { //�����ַ�Χ��
                if (k1 != 3) { //��С��λ
                    if (bn != 0) {
                        str = dw1[k1].concat(str);
                    }
                    k1++;
                } else { //����С��λ���Ӵ�λ
                    k1 = 0;
                    var temp = str.charAt(0);
                    if (temp == "��" || temp == "��") //����λǰû����������ȥ��λ
                        str = str.substr(1, str.length - 1);
                    str = dw2[k2].concat(str);
                    sum = 0;
                }
            }
            if (k1 == 3) //С��λ��ǧ���λ��һ
            {
                k2++;
            }
        }
        //ת��С������
        var strdig = "";
        if (dig != "") {
            var n = dig.charAt(0);
            if (n != 0) {
                strdig += dw[Number(n)] + "��"; //������
            }
            var n = dig.charAt(1);
            if (n != 0) {
                strdig += dw[Number(n)] + "��"; //������
            }
        }
        str += "Ԫ" + strdig;
    } catch(e) {
        return "0Ԫ";
    }
    return str;
}
//���������С��
function splits(tranvalue) {
    var value = new Array('', '');
    temp = tranvalue.split(".");
    for (var i = 0; i < temp.length; i++) {
        value[i] = temp[i];
    }
    return value;
}

//90.ԭ��JavaScript���õ��������ʽ���ռ�
/*
ƥ�������ַ����������ʽ�� [\u4e00-\u9fa5]
ƥ��˫�ֽ��ַ��������������ڣ���[^\x00-\xff]
ƥ����е��������ʽ��\n[\s| ]*\r
ƥ�� HTML ��ǵ��������ʽ��<(.*)>.*<\/\1>|<(.*) \/>
ƥ����β�ո���������ʽ��(^\s*)|(\s*$)
ƥ�� IP ��ַ���������ʽ��/(\d+)\.(\d+)\.(\d+)\.(\d+)/g
ƥ�� Email ��ַ���������ʽ��\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*
ƥ����ַ URL ���������ʽ��http://(/[\w-]+\.)+[\w-]+(/[\w- ./?%&=]*)?
    sql ��䣺^(select|drop|delete|create|update|insert).*$
�Ǹ�������^\d+$
��������^[0-9]*[1-9][0-9]*$
����������^((-\d+)|(0+))$
��������^-[0-9]*[1-9][0-9]*$
������^-?\d+$
�Ǹ���������^\d+(\.\d+)?$
    ����������^((0-9)+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$
������������^((-\d+\.\d+)?)|(0+(\.0+)?))$
Ӣ���ַ�����^[A-Za-z]+$
Ӣ�Ĵ�д����^[A-Z]+$
Ӣ��Сд����^[a-z]+$
Ӣ���ַ����ִ���^[A-Za-z0-9]+$
Ӣ���ּ��»��ߴ���^\w+$
E-mail��ַ��^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$
URL��^[a-zA-Z]+://(\w+(-\w+)*)(\.(\w+(-\w+)*))*(\?\s*)?$ ��^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$
�������룺^[1-9]\d{5}$
�绰���룺^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$
    �ֻ����룺^((\(\d{2,3}\))|(\d{3}\-))?13\d{9}$
˫�ֽ��ַ��������������ڣ���^\x00-\xff
ƥ����β�ո�(^\s*)|(\s*$)
ƥ�� HTML ��ǣ�<(.*)>.*<\/\1>|<(.*) \/>
ƥ����У�\n[\s| ]*\r
��ȡ��Ϣ�е��������ӣ�(h|H)(r|R)(e|E)(f|F) *= *('|")?(\w|\\|\/|\.)+('|"| *|>)?
��ȡ��Ϣ�е��ʼ���ַ��\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*
��ȡ��Ϣ�е�ͼƬ���ӣ�(s|S)(r|R)(c|C) *= *('|")?(\w|\\|\/|\.)+('|"| *|>)?
��ȡ��Ϣ�е� IP ��ַ��(\d+)\.(\d+)\.(\d+)\.(\d+)
��ȡ��Ϣ�е��й��ֻ����룺(86)*0*13\d{9}
��ȡ��Ϣ�е��й��̶��绰���룺(\(\d{3,4}\)|\d{3,4}-|\s)?\d{8}
��ȡ��Ϣ�е��й��绰���루�����ƶ��͹̶��绰����(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}
��ȡ��Ϣ�е��й��������룺[1-9]{1}(\d+){5}
��ȡ��Ϣ�еĸ���������С������(-?\d*)\.?\d+
��ȡ��Ϣ�е��κ����� ��(-?\d*)(\.\d+)?
    IP��(\d+)\.(\d+)\.(\d+)\.(\d+)
�绰���ţ�^0\d{2,3}$
��Ѷ QQ �ţ�^[1-9]*[1-9][0-9]*$
�ʺţ���ĸ��ͷ������ 5-16 �ֽڣ�������ĸ�����»��ߣ���^[a-zA-Z][a-zA-Z0-9_]{4,15}$
���ġ�Ӣ�ġ����ּ��»��ߣ�^[\u4e00-\u9fa5_a-zA-Z0-9]+$

 */

//91.ԭ��JavaScriptʵ�ִ���ı��¼�resize�Ĳ������������Ե��������
(function(){
    var fn = function(){
        var w = document.documentElement ? document.documentElement.clientWidth : document.body.clientWidth
            ,r = 1255
            ,b = Element.extend(document.body)
            ,classname = b.className;
        if(w < r){
            //������Ŀ���С��1255��ʱ��ִ����Ӧ�Ĳ���
        }else{
            //������Ŀ��ȴ���1255��ʱ��ִ����Ӧ�Ĳ���
        }
    }
    if(window.addEventListener){
        window.addEventListener('resize', function(){ fn(); });
    }else if(window.attachEvent){
        window.attachEvent('onresize', function(){ fn(); });
    }
    fn();
})();

//92.ԭ��JavaScript����������ո������
function ltrim(s){ return s.replace( /^(\s*|��*)/, ""); }
function rtrim(s){ return s.replace( /(\s*|��*)$/, ""); }
function trim(s){ return ltrim(rtrim(s));}

//93.ԭ��JavaScript�жϱ����Ƿ��ֵ
/**
 * �жϱ����Ƿ��ֵ
 * undefined, null, '', false, 0, [], {} ������true�����򷵻�false
 */
function empty(v){
    switch (typeof v){
        case 'undefined' : return true;
        case 'string'    : if(trim(v).length == 0) return true; break;
        case 'boolean'   : if(!v) return true; break;
        case 'number'    : if(0 === v) return true; break;
        case 'object'    :
            if(null === v) return true;
            if(undefined !== v.length && v.length==0) return true;
            for(var k in v){return false;} return true;
            break;
    }
    return false;
}

//94.ԭ��JavaScriptʵ��base64����
function base64_decode(data){
    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,ac = 0,dec = "",tmp_arr = [];
    if (!data) { return data; }
    data += '';
    do {
        h1 = b64.indexOf(data.charAt(i++));
        h2 = b64.indexOf(data.charAt(i++));
        h3 = b64.indexOf(data.charAt(i++));
        h4 = b64.indexOf(data.charAt(i++));
        bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;
        o1 = bits >> 16 & 0xff;
        o2 = bits >> 8 & 0xff;
        o3 = bits & 0xff;
        if (h3 == 64) {
            tmp_arr[ac++] = String.fromCharCode(o1);
        } else if (h4 == 64) {
            tmp_arr[ac++] = String.fromCharCode(o1, o2);
        } else {
            tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
        }
    } while (i < data.length);
    dec = tmp_arr.join('');
    dec = utf8_decode(dec);
    return dec;
}

//95.ԭ��JavaScriptʵ��utf8����
function utf8_decode(str_data){
    var tmp_arr = [],i = 0,ac = 0,c1 = 0,c2 = 0,c3 = 0;str_data += '';
    while (i < str_data.length) {
        c1 = str_data.charCodeAt(i);
        if (c1 < 128) {
            tmp_arr[ac++] = String.fromCharCode(c1);
            i++;
        } else if (c1 > 191 && c1 < 224) {
            c2 = str_data.charCodeAt(i + 1);
            tmp_arr[ac++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
            i += 2;
        } else {
            c2 = str_data.charCodeAt(i + 1);
            c3 = str_data.charCodeAt(i + 2);
            tmp_arr[ac++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            i += 3;
        }
    }
    return tmp_arr.join('');
}

//96.ԭ��JavaScript��ȡ����ɼ���Χ�Ŀ����
function getViewSize(){
    var de=document.documentElement;
    var db=document.body;
    var viewW=de.clientWidth==0 ?  db.clientWidth : de.clientWidth;
    var viewH=de.clientHeight==0 ?  db.clientHeight : de.clientHeight;
    return Array(viewW ,viewH);
}

//97.ԭ��JavaScript�ж�IE�汾�ţ��ȼ�ࡢ�������ݣ���
var _IE = (function(){
    var v = 3, div = document.createElement('div'), all = div.getElementsByTagName('i');
    while (
        div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
            all[0]
        );
    return v > 4 ? v : false ;
}());

//98.ԭ��JavaScript��ȡ������汾��
function browserVersion(types) {
    var other = 1;
    for (i in types) {
        var v = types[i] ? types[i] : i;
        if (USERAGENT.indexOf(v) != -1) {
            var re = new RegExp(v + '(\\/|\\s|:)([\\d\\.]+)', 'ig');
            var matches = re.exec(USERAGENT);
            var ver = matches != null ? matches[2] : 0;
            other = ver !== 0 && v != 'mozilla' ? 0 : other;
        } else {
            var ver = 0;
        }
        eval('BROWSER.' + i + '= ver');
    }
    BROWSER.other = other;
}

//99.ԭ��JavaScript���ת��Ϊȫ�Ǻ���
function ToDBC(str){
    var result = '';
    for(var i=0; i < str.length; i++){
        code = str.charCodeAt(i);
        if(code >= 33 && code <= 126){
            result += String.fromCharCode(str.charCodeAt(i) + 65248);
        }else if (code == 32){
            result += String.fromCharCode(str.charCodeAt(i) + 12288 - 32);
        }else{
            result += str.charAt(i);
        }
    }
    return result;
}

//100.ԭ��JavaScriptȫ��ת��Ϊ��Ǻ���
function ToCDB(str){
    var result = '';
    for(var i=0; i < str.length; i++){
        code = str.charCodeAt(i);
        if(code >= 65281 && code <= 65374){
            result += String.fromCharCode(str.charCodeAt(i) - 65248);
        }else if (code == 12288){
            result += String.fromCharCode(str.charCodeAt(i) - 12288 + 32);
        }else{
            result += str.charAt(i);
        }
    }
    return result;
}