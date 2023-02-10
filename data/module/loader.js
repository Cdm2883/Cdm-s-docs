/* 
    加载模块
 */

var $ = mdui.$;

var drawScreen = {
    lastTime: 0,
    fab: function () {
        $(window).on('scroll', () => {
            let mScroll = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
            if (mScroll > 0 && docsManager.setting.get('scroll-to-top-button')) {
                // show
                $('body > .mdui-fab-fixed')[0].classList.remove('mdui-fab-hide');
            } else {
                // hide
                $('body > .mdui-fab-fixed')[0].classList.add('mdui-fab-hide');
            }
            $('body > .mdui-fab-fixed > .circle-progress').percent((mScroll / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
        });
        this.fab = () => {};
    },
    load: function () {
        if (new Date().getTime() - this.lastTime < 500) return;
        this.lastTime = new Date().getTime();
        this.fab();
    }
};

addEventListener('message', (e) => {
    if (e.data.theme) darkTheme(e.data.theme);
});

$(window).on('resize', () => {
    drawScreen.load();
    fileAPI.htmlIframe();
    tabManager.load();
    $('#right-drawer').css('padding-top', (window.innerWidth > 1024 ? $('body > .mdui-appbar').height() : 0) + 'px');
    if (fileManager.htmlDirectoryData.right.getState() == 'opening' || fileManager.htmlDirectoryData.right.getState() == 'opened') fileManager.htmlDirectory($(tabManager.items[tabManager.nowIndex].screen).children('.mdui-container').get(0));
});

globalHook.darkTheme = function (theme) {
    $('.file-html-content').each(function (index, element) {
        element.contentWindow.postMessage({who: 'Cdm\'s docs', theme: theme}, '*');
    });
}

drawScreen.load();
btnEvent.load();
fileManager.load();
try {
    (() => {
        if (fileAPI.type != 'PHP') return;
        fileAPI.serverCheck();
        let mXHR = new XMLHttpRequest();
        mXHR.open("GET", fileAPI.useServerHttp, false);
        mXHR.send(null);
    })();
    // setTimeout(() => {
    //     if (tabManager.items[tabManager.nowIndex].node) tabManager.items[tabManager.nowIndex].node.click();
    //     document.documentElement.scrollTo({top: 0, behavior: 'smooth'});
    // }, 500);
} catch (error) {
    mdui.alert('cannot connect server!');
}
saveManager.load();
tabManager.load();
window.addEventListener("load", () => {
    if (tabManager.items[tabManager.nowIndex].node) tabManager.items[tabManager.nowIndex].node.click();
    document.documentElement.scrollTo({top: 0, behavior: 'smooth'});
}, false) ;

$('body > .mdui-fab-fixed > .circle-progress').circle_progress({
    percent: 0,
    color: 'rgba(255,255,255,.6)'
});

// $('#error-page').remove();
console.log('%c扒我网站你妈今天必死', `
    font-size: 100px;
    color: red;
    backgroung-color: black;
`);