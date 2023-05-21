/* 
    doc
*/

var $ = mdui.$;

var doc = {
    t: btnEvent.toNodeByID,
    f: (path) => {
        path = fileManager.getPagePath(
            fileAPI.parentPath(tabManager.items[tabManager.nowIndex].path),
            path
        );

        let mGetDir = fileAPI.getDir(path);
        if (mGetDir.length !== 0) {
            fileManager.toPath(path);
            fileManager.drawer.open();
        } else {
            tabManager.append(path);
        }
    },
    ff: (path) => {
        let mParent = fileManager.path;
        path = path.replace(/%20/g, ' ');
        if (path.substring(0, 1) == '/') path = mParent + path;
        if (path.substring(0, 2) == './') path = path.slice(2);
        // if (path.substring(0, 10) == '../../docs') path = path.slice(10);
        let mGetDir = fileAPI.getDir(path);
        if (mGetDir.length !== 0) {
            fileManager.toPath(path);
            fileManager.drawer.open();
        } else {
            tabManager.append(path);
        }
    },
    fp: (path, mParent) => {
        path = path.replace(/%20/g, ' ');
        if (path.substring(0, 1) == '/') path = mParent + path;
        if (path.substring(0, 2) == './') path = path.slice(2);
        // if (path.substring(0, 10) == '../../docs') path = path.slice(10);
        let mGetDir = fileAPI.getDir(path);
        if (mGetDir.length !== 0) {
            fileManager.toPath(path);
            fileManager.drawer.open();
        } else {
            tabManager.append(path);
        }
    }
}

debugTool.loaded();