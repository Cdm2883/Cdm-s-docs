var $ = mdui.$;

$(document.body).attr('class', 'mdui-appbar-with-toolbar mdui-appbar-with-tab mdui-drawer-body-left mdui-drawer-body-right mdui-loaded');
$(document.body).prepend(
    `<div class="mdui-appbar cdm-bg mdui-appbar-fixed mdui-appbar-scroll-toolbar-hide" style="max-width:100vw">
    <div class="mdui-toolbar">
        <a mdui-drawer="{target: '#left-drawer'}" class="mdui-btn mdui-btn-icon">
            <i class="mdui-icon material-icons">folder_open</i>
        </a>
        <a class="mdui-typo-title">Cdm's docs</a>
        <div class="mdui-toolbar-spacer"></div>
        <div class="mdui-textfield mdui-textfield-expandable mdui-float-right" style="padding-top: 0;padding-bottom: 0;">
            <button class="mdui-textfield-icon mdui-btn mdui-btn-icon">
                <i class="mdui-icon material-icons">search</i>
            </button>
            <input class="mdui-textfield-input" id="search-input-1" type="text" placeholder="Search" />
            <button class="mdui-textfield-close mdui-btn mdui-btn-icon">
                <i class="mdui-icon material-icons">close</i>
            </button>
        </div>
        <a class="mdui-btn mdui-btn-icon">
            <i id="themeSwitcher" class="mdui-icon material-icons"></i>
        </a>
        <a mdui-menu="{target: '#page-more-menu'}" class="mdui-btn mdui-btn-icon">
            <i class="mdui-icon material-icons">more_vert</i>
        </a>
        <ul class="mdui-menu" id="page-more-menu">
            <li class="mdui-menu-item">
                <a href="javascript:location.reload();" class="mdui-ripple">
                    <i class="mdui-menu-item-icon mdui-icon material-icons">refresh</i>
                    Refresh
                </a>
            </li>
            <i id="close-all-tabs-flag" style="display:none"></i>
            <li id="close-all-tabs" class="mdui-menu-item" disabled>
                <a class="close-other-tabs mdui-ripple">
                    <i class="mdui-menu-item-icon mdui-icon material-icons">clear_all</i>
                    Close other tabs
                </a>
            </li>
            <li class="mdui-menu-item">
                <a class="go-to-path" class="mdui-ripple">
                    <i class="mdui-menu-item-icon mdui-icon material-icons">keyboard_arrow_left</i>
                    Go to path
                </a>
            </li>
            <li class="mdui-menu-item">
                <a mdui-dialog="{target: '#page-more-menu-dialog'}" class="mdui-ripple">
                    <i class="mdui-menu-item-icon mdui-icon material-icons">more_vert</i>
                    More..
                </a>
            </li>
            <li class="mdui-divider"></li>
            <i id="setting-menu-flag" style="display:none"></i>
            <li class="mdui-menu-item">
                <a class="ask-cdm2883" class="mdui-ripple">
                    <i class="mdui-menu-item-icon mdui-icon material-icons">launch</i>
                    ask Cdm2883
                </a>
            </li>
        </ul>
    </div>
    <div class="mdui-tab" mdui-tab></div>
</div>

<div class="mdui-drawer" id="left-drawer" style="white-space:normal"></div>
<div class="mdui-drawer mdui-drawer-right" id="right-drawer" style="visibility:hidden;white-space:normal;">
    <li class="mdui-subheader">Content</li>
    <ul class="list"></ul>
</div>

<div id="tabs-screen"></div>

<footer>
    <text>Cdm's docs - v2</text>
</footer>

<button onclick="window.scrollTo({top: 0, behavior: 'smooth'});" class="mdui-fab mdui-fab-fixed mdui-ripple mdui-color-theme-accent mdui-fab-hide" style="z-index:2">
    <div class="circle-progress"></div>
    <i class="mdui-icon material-icons">keyboard_arrow_up</i>
</button>

<div id="error-page" class="mdui-container mdui-typo" style="width:100%;padding:80px 0 80px 0;">
    <div class="mdui-center" style="width:50%;text-align:center;">
        <i class="mdui-icon material-icons" style="font-size:120px">error</i>
        <p class="mdui-text-color-theme-icon" style="font-size:1.2em">There may be something wrong with the webpage</p>
        <p id="log-info"></p>
        <div class="mdui-divider"></div>
        <a href="javascript:useVConsole();" class="mdui-btn mdui-ripple mdui-m-t-3">
            <i class="mdui-icon mdui-icon-right material-icons">bug_report</i> vConsole
        </a>
        <a href="javascript:tryToFix();" class="mdui-btn mdui-ripple mdui-m-t-3">
            <i class="mdui-icon mdui-icon-right material-icons">build</i> Try to fix
        </a>
    </div>
</div>

<div class="mdui-dialog" id="change-server-dialog">
    <div class="mdui-dialog-title">
        <i class="mdui-icon material-icons" style="margin-right:8px">cloud_queue</i> Change servers
    </div>
    <div class="mdui-dialog-content">
        <div class="mdui-row-md-4"></div>
    </div>
    <div class="mdui-dialog-actions">
        <button class="mdui-btn mdui-ripple" mdui-dialog-close>cancel</button>
        <button class="mdui-btn mdui-ripple" mdui-dialog-confirm>change</button>
    </div>
</div>

<div id="search-screen">
    <div class="search-bar">
        <button class="close mdui-btn mdui-btn-icon mdui-ripple mdui-text-color-theme-icon">
            <i class="mdui-icon material-icons">close</i>
        </button>
        <input class="input" placeholder="Search here" value="test"/>
        <button class="search mdui-btn mdui-btn-icon mdui-ripple mdui-text-color-theme-icon" mdui-tooltip="{content: 'search'}">
            <i class="mdui-icon material-icons">search</i>
        </button>
    </div>
    <div class="mdui-progress">
        <div class="mdui-progress-indeterminate"></div>
    </div>
    <ul class="mdui-list mdui-typo"></ul>
</div>

<div class="mdui-dialog" id="page-more-menu-dialog">
    <div class="mdui-dialog-title">More menu</div>
    <div class="mdui-dialog-content">
        <ul class="mdui-list">
            <li class="favorites mdui-list-item mdui-ripple" mdui-dialog-close>
                <i class="mdui-list-item-icon mdui-icon material-icons">favorites</i>
                <div class="mdui-list-item-content">Favorites</div>
            </li>
            <li class="change-servers mdui-list-item mdui-ripple" mdui-dialog-close>
                <i class="mdui-list-item-icon mdui-icon material-icons">cloud_queue</i>
                <div class="mdui-list-item-content">Change servers</div>
            </li>
            <li class="debugger mdui-list-item mdui-ripple" mdui-dialog-close>
                <i class="mdui-list-item-icon mdui-icon material-icons">bug_report</i>
                <div class="mdui-list-item-content">Debugger</div>
            </li>
            <li class="settings mdui-list-item mdui-ripple" mdui-dialog-close>
                <i class="mdui-list-item-icon mdui-icon material-icons">settings</i>
                <div class="mdui-list-item-content">Settings</div>
            </li>
        </ul>
    </div>
    <div class="mdui-dialog-actions">
        <button class="mdui-btn mdui-ripple" mdui-dialog-close>close</button>
    </div>
</div>`
);
$(document.body).trigger("create");
mdui.mutation();