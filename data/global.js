// JavaScript 工具库
var $ = mdui.$;
var globalHook = {
    onload: function () {},
    copyText: function () {},
    darkTheme: function (theme) {}
}

window.onload = function() {
    darkTheme(getCookie('theme'));
    $.showOverlay();
    setTimeout("mdui.$.hideOverlay()", 200);
    globalHook.onload();
}

function copyText(text){
    let tag = document.createElement('input');
    tag.setAttribute('id', 'cp_hgz_input');
    tag.value = text;
    document.getElementsByTagName('body')[0].appendChild(tag);
    document.getElementById('cp_hgz_input').select();
    document.execCommand('copy');
    document.getElementById('cp_hgz_input').remove();
    mdui.snackbar({
      message: 'Copy success',
      position: 'left-bottom'
    });
    globalHook.copyText();
}

// Theme
var themeSwitcher = document.getElementById("themeSwitcher");
$(themeSwitcher.parentNode).on('click', function (e) {
    themeSwitch();
});

function darkTheme(theme) {
    setCookie("theme", theme);
    if (theme == "dark") {
        // Dark Theme
        themeSwitcher.innerText = "brightness_4";
        document.body.classList.add('mdui-theme-layout-dark');
        document.body.classList.remove('mdui-theme-accent-blue');
        document.body.classList.add('mdui-theme-accent-light-blue');
        // document.body.classList.remove('mdui-theme-primary-indigo');
        document.body.classList.add('mdui-theme-primary-grey');
    } else {
        // Light Theme
        themeSwitcher.innerText = "brightness_7";
        document.body.classList.remove('mdui-theme-layout-dark');
        document.body.classList.remove('mdui-theme-accent-light-blue');
        document.body.classList.add('mdui-theme-accent-blue');
        // document.body.classList.add('mdui-theme-primary-indigo');
        document.body.classList.remove('mdui-theme-primary-grey');
    }
    globalHook.darkTheme(theme);
}
function themeSwitch() {
    var theme = getCookie('theme');
    // var themeSwitcher = document.getElementById("themeSwitcher");
    let setContent = theme == 'dark'?'light':'dark';
    // let showContent = theme == 'dark'?'浅色':'深色';
    
    darkTheme(setContent);
    mdui.snackbar({
        // message: '已切换为' + showContent + '主题',
        message: 'Switch to ' + setContent + ' theme',
        buttonText: 'UNDO',
        position: 'left-bottom',
        onButtonClick: function() {
            darkTheme(theme);
        }
    });
}

// Cookie
const addCookie = function (name, value) {
    //设置名称为name,值为value的Cookie
    var exp = new Date(); //初始化时间
    exp.setTime(exp.getTime() + 30 * 60 * 1000); //时间单位毫秒
    document.cookie = name + "=" + value + ";expires=" + exp.toGMTString() + ";path=/";
    //即document.cookie= name+"="+value+";path=/";  时间默认为当前会话可以不要，但路径要填写，因为JS的默认路径是当前页，如果不填，此cookie只在当前页面生效！
};
const setCookie = addCookie;

const getCookie = function(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if(arr = document.cookie.match(reg))
		return unescape(arr[2]);
	else
		return '';
};

const delCookie = function(name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 10000);
	var cval = getCookie(name);
	if(cval != null)
		document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + ";path=/";
};

const clearCookie = function() {
	var exp = new Date();
	exp.setTime(exp.getTime() - 10000);
	var keys=document.cookie.match(/[^ =;]+(?=\=)/g);
  if (keys) {
    for (var i =  keys.length; i--;)
      document.cookie = keys[i] + "=0; expire="+exp.toGMTString() + ";path=/";
  }
};
