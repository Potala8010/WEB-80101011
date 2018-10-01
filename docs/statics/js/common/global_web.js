$.isjson= $.isjson || function(obj) {
    return typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
};
$.escape_b64 = $.escape_b64 || function(Keyword) {
    return escape(Keyword.replace(/\¡¤/ig,".")).replace(/\+/ig, "%2B").replace(/\//ig, "%2F");
};