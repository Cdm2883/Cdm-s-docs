/* 
    错误修复模块
 */

var $ = mdui.$;

$('#log-info').html(document.cookie + '</br>' + JSON.stringify(localStorage));
function useVConsole() {
    var linkObj = document.createElement("script");
    linkObj.setAttribute("src", "https://cdn.bootcss.com/vConsole/3.3.0/vconsole.min.js");
    linkObj.onload = () => {
        let vConsole = new VConsole();
    };
    document.body.appendChild(linkObj);
}
function tryToFix() {
    clearCookie();
    localStorage.clear();
    location.reload();
}

var debugTool = {
    all: 0,
    ok: 0,
    vc: useVConsole,
    fix: tryToFix,
    load: function () {
        this.all = 0;
        // try { if (docsManager) this.all++; } catch (e) {}
        // try { if (fileAPI) this.all++; } catch (e) {}
        // try { if (tabManager) this.all++; } catch (e) {}
        // try { if (fileManager) this.all++; } catch (e) {}
        // try { if (saveManager) this.all++; } catch (e) {}
        // try { if (btnEvent) this.all++; } catch (e) {}
        // try { if (doc) this.all++; } catch (e) {}
        $(document.body).children('script').each(function(index, element) {
            if (/.*module.*js/.test($(this).attr('src')) && $(this).attr('src').indexOf('debugger.js') === -1) debugTool.all++;
        });
    },
    loaded: function () {
        this.ok++;
        this.load();
        if (this.ok === this.all) $('#error-page').hide(); else $('#error-page').show();
    }
};
debugTool.load();