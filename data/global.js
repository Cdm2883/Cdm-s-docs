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

// https://blog.csdn.net/cc18868876837/article/details/114918262
function deepClone(target) {
    // WeakMap作为记录对象Hash表（用于防止循环引用）
    const map = new WeakMap()

    // 判断是否为object类型的辅助函数，减少重复代码
    function isObject(target) {
        return (typeof target === 'object' && target ) || typeof target === 'function'
    }

    function clone(data) {

        // 基础类型直接返回值
        if (!isObject(data)) {
            return data
        }

        // 日期或者正则对象则直接构造一个新的对象返回
        if ([Date, RegExp].includes(data.constructor)) {
            return new data.constructor(data)
        }

        // 处理函数对象
        if (typeof data === 'function') {
            return new Function('return ' + data.toString())()
        }

        // 如果该对象已存在，则直接返回该对象
        const exist = map.get(data)
        if (exist) {
            return exist
        }

        // 处理Map对象
        if (data instanceof Map) {
            const result = new Map()
            map.set(data, result)
            data.forEach((val, key) => {
                // 注意：map中的值为object的话也得深拷贝
                if (isObject(val)) {
                    result.set(key, clone(val))
                } else {
                    result.set(key, val)
                }
            })
            return result
        }

        // 处理Set对象
        if (data instanceof Set) {
            const result = new Set()
            map.set(data, result)
            data.forEach(val => {
                // 注意：set中的值为object的话也得深拷贝
                if (isObject(val)) {
                    result.add(clone(val))
                } else {
                    result.add(val)
                }
            })
            return result
        }

        // 收集键名（考虑了以Symbol作为key以及不可枚举的属性）
        const keys = Reflect.ownKeys(data)
        // 利用 Object 的 getOwnPropertyDescriptors 方法可以获得对象的所有属性以及对应的属性描述
        const allDesc = Object.getOwnPropertyDescriptors(data)
        // 结合 Object 的 create 方法创建一个新对象，并继承传入原对象的原型链， 这里得到的result是对data的浅拷贝
        const result = Object.create(Object.getPrototypeOf(data), allDesc)

        // 新对象加入到map中，进行记录
        map.set(data, result)

        // Object.create()是浅拷贝，所以要判断并递归执行深拷贝
        keys.forEach(key => {
            const val = data[key]
            if (isObject(val)) {
                // 属性值为 对象类型 或 函数对象 的话也需要进行深拷贝
                result[key] = clone(val)
            } else {
                result[key] = val
            }
        })
        return result
    }

    return clone(target)
}