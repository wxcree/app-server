import {Ipath, IPathRoute} from "../domain/IPath";

function path(url: string): IPathRoute {
    const allRoutes: Ipath = {
        // home and test
        "/home": {
            methods: ["POST", "GET"]
        },
        "/table1": {
            methods: ["POST", "GET"]
        },
        // auth
        "/auth": {
            methods: ["POST"]
        },
        // tables
        "/gettable": {
            methods: ["POST"]
        },
        "/getmutiltable": {
            methods: ["POST"]
        },
        "/addtable": {
            methods: ["POST"]
        },
        "/savetable": {
            methods: ["POST"]
        },
        "/updatetable": {
            methods: ["POST"]
        },
        // pkgs
        "/getpkg": {
            methods: ["POST"]
        },
        "/setpkg": {
            methods: ["POST"]
        },
        "/addpkg": {
            methods: ["POST"]
        },
        
    }

    // 处理query部分
    const index = url.indexOf('?');
    if(index > 0)
        url = url.slice(0, index);
    return allRoutes[url];
}

export default path;
