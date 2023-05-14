/* 
    docsManager
*/

var $ = mdui.$;

var docsManager = {
    favorites: {
        storage: JSON.parse(localStorage.getItem('docs_favorites') == null ? '{}': LZString.decompress(localStorage.getItem('docs_favorites'))),
        isIn: function (path) {
            if (this.storage[fileAPI.server] == null) this.storage[fileAPI.server] = [];
            for (const item of this.storage[fileAPI.server]) {
                if (item.path == path) return true;
            }
            return false;
        },
        add: function (name, path, isDir) {
            if (this.storage[fileAPI.server] == null) this.storage[fileAPI.server] = [];
            if (this.isIn(path)) return this.storage;
            this.storage[fileAPI.server].push({
                name: name,
                path: path,
                isDir: isDir
            });
            this.save();
            return this.storage;
        },
        remove: function (path) {
            let mStorage = [];
            this.storage[fileAPI.server].forEach((item) => {
                if (item.path != path) {
                    mStorage.push(item);
                }
            });
            this.storage[fileAPI.server] = mStorage;
            this.save();
            return this.storage;
        },
        clear: function () {
            this.storage[fileAPI.server] = [];
            this.save();
        },
        save: function () {
            localStorage.setItem('docs_favorites', LZString.compress(JSON.stringify(this.storage)));
        }
    },
    setting: {
        storage: JSON.parse(localStorage.getItem('docs_setting') == null ? '{}': LZString.decompress(localStorage.getItem('docs_setting'))),
        get: function (k) {
            this.storage = JSON.parse(localStorage.getItem('docs_setting') == null ? '{}': LZString.decompress(localStorage.getItem('docs_setting')));
            return this.storage[k] == null ? this.default[k] : this.storage[k];
        },
        set: function (k, v) {
            this.storage[k] = v;
            localStorage.setItem('docs_setting', LZString.compress(JSON.stringify(this.storage)));
        },
        settings: [
            'Document',
            {
                type: 'switch',
                k: 'auto-save',
                icon: 'save',
                title: 'Auto save'
            },
            {
                type: 'switch',
                k: 'auto-restore',
                icon: 'open_in_browser',
                title: 'Auto restore'
            },
            {
                type: 'switch',
                k: 'save-scrolling',
                icon: 'format_line_spacing',
                title: 'Save the scrolling progress'
            },
            {
                type: 'switch',
                k: 'cannot-open-the-same-file-twice',
                icon: 'looks_one',
                title: 'Open the same file on the same page',
                content: 'If you turn, you will can\'t open the same file twice!'
            },
            {
                type: 'switch',
                k: 'readable-sidebar',
                icon: 'format_indent_increase',
                title: 'Make the sidebar more readable',
                content: 'The sidebar expands to hold up the drawer'
            },
            'Website',
            {
                type: 'switch',
                k: function (value, e) { darkTheme(value ? 'dark' : 'light'); },
                v: function () { return getCookie('theme') == 'dark'; },
                icon: 'brightness_2',
                title: 'Dark mode',
            },
            {
                type: 'switch',
                k: 'scroll-to-top-button',
                icon: 'vertical_align_top',
                title: '"Scroll To Top" button'
            },
            {
                type: 'switch',
                k: 'tab-animation-beta',
                k: function (value, e) {
                    if (value) {
                        mdui.confirm(`<div class="mdui-typo">
                        If you <b>turn on</b>, some things may change:</br>
                        </br>
                        1. When you <code>restore</code>, it will take more time</br>
                        2. When <code>TAB</code> is operate, an exception may appear</br>
                        <i>...</i></div>`, 'Some browsers may not be support!',
                            () => { docsManager.setting.set('tab-animation-beta', true); },
                            function () {
                                e.checked = false;
                                docsManager.setting.set('tab-animation-beta', false);
                            },
                            { modal: true}
                        );
                    } else {
                        docsManager.setting.set('tab-animation-beta', value);
                    }
                },
                v: function () { return docsManager.setting.get('tab-animation-beta'); },
                icon: 'label',
                title: `<div class="mdui-typo">Tab toggle animation <code>beta</code></div>`,
                content: 'Some browsers may not be support'
            }
        ],
        default: {
            'auto-save': true
        }
    }
};

debugTool.loaded();