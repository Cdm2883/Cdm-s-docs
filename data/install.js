const loadJavaScript = function (url) {
    return new Promise((resolve, reject) => {
        let mScript = document.createElement("script");
        mScript.setAttribute("src", url);
        mScript.onload = () => reject();
        document.body.appendChild(mScript);
    });
};

async function docs_load() {
    let fileServer = 'http://docs.cdms.vip/data/';
    await loadJavaScript('https://unpkg.com/mdui@1.0.2/dist/js/mdui.min.js');
    // await loadJavaScript(fileServer + 'global.js');
    await loadJavaScript('https://unpkg.com/showdown/dist/showdown.min.js');
    await loadJavaScript('https://unpkg.com/@highlightjs/cdn-assets@11.6.0/highlight.min.js');
    // await loadJavaScript('');
    // await loadJavaScript('');
    // await loadJavaScript('');
    // await loadJavaScript('');
    // await loadJavaScript('');

    await loadJavaScript('https://unpkg.com/@highlightjs/cdn-assets@11.6.0/languages/cpp.min.js');
    await loadJavaScript('https://unpkg.com/@highlightjs/cdn-assets@11.6.0/languages/excel.min.js');
    await loadJavaScript('https://unpkg.com/@highlightjs/cdn-assets@11.6.0/languages/dos.min.js');
    await loadJavaScript('https://unpkg.com/@highlightjs/cdn-assets@11.6.0/languages/go.min.js');
    await loadJavaScript('https://unpkg.com/@highlightjs/cdn-assets@11.6.0/languages/ini.min.js');
    await loadJavaScript('https://unpkg.com/@highlightjs/cdn-assets@11.6.0/languages/java.min.js');
    await loadJavaScript('https://unpkg.com/@highlightjs/cdn-assets@11.6.0/languages/javascript.min.js');
    await loadJavaScript('https://unpkg.com/@highlightjs/cdn-assets@11.6.0/languages/json.min.js');
    await loadJavaScript('https://unpkg.com/@highlightjs/cdn-assets@11.6.0/languages/lua.min.js');
    await loadJavaScript('https://unpkg.com/@highlightjs/cdn-assets@11.6.0/languages/python.min.js');
    await loadJavaScript('https://unpkg.com/@highlightjs/cdn-assets@11.6.0/languages/ruby.min.js');
    await loadJavaScript('https://unpkg.com/@highlightjs/cdn-assets@11.6.0/languages/rust.min.js');
    await loadJavaScript('https://unpkg.com/@highlightjs/cdn-assets@11.6.0/languages/shell.min.js');
    await loadJavaScript('https://unpkg.com/@highlightjs/cdn-assets@11.6.0/languages/smali.min.js');
    await loadJavaScript('https://unpkg.com/@highlightjs/cdn-assets@11.6.0/languages/scss.min.js');
    await loadJavaScript('https://unpkg.com/@highlightjs/cdn-assets@11.6.0/languages/css.min.js');
    await loadJavaScript('https://unpkg.com/@highlightjs/cdn-assets@11.6.0/languages/html.min.js');
    await loadJavaScript('https://unpkg.com/@highlightjs/cdn-assets@11.6.0/languages/sql.min.js');
    await loadJavaScript('https://unpkg.com/@highlightjs/cdn-assets@11.6.0/languages/xml.min.js');
    await loadJavaScript('https://unpkg.com/@highlightjs/cdn-assets@11.6.0/languages/yaml.min.js');
}
docs_load();