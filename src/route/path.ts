import {Ipath, IPathRoute} from "../domain/IPath";

function path(url: string): IPathRoute {
    const allRoutes: Ipath = {
        "/test": {
            methods: ["POST", "GET", "PUT", "DELETE"]
        },
        "/extra": {
            methods: ["POST", "GET", "PUT"]
        },
        // auth
        "/auth": {
            methods: ["POST"]
        },
        // tables
        "/gettable": {
            methods: ["POST"]
        },
        "/addtable": {
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
    return allRoutes[url];
}

export default path;
