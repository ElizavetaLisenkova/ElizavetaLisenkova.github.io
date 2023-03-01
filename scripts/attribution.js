function getCookie(name){
    return document.cookie.split(';').some(c => {
        return c.trim().startsWith(name + '=');
    });
}

function getParam(key) {
    var p = window.location.search;
    p = p.match(new RegExp(key + '=([^&=]+)'));
    return p ? p[1] : false;
};

function deleteCookie( name, path, domain ) {
    if( getCookie( name ) ) {
      document.cookie = name + "=" +
        ((path) ? ";path="+path:"")+
        ((domain)?";domain="+domain:"") +
        ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
    }
  }

function checkCurrentDeduplication(cookieName) {
    if (document.cookie.indexOf(cookieName) == 0) {
        localStorage.setItem("deduplication", "gdeslon");
        
    }else{
        localStorage.setItem("deduplication", "other");
    }
}


cookieName = "gdeslon.kokoc.com.__arc_aid";
source = getParam('utm_source');
console.log(source)

if (source != 'gdeslon'){
    if (source) {
        deleteCookie(cookieName, '/', '.swtest.ru');
    }
    
}

checkCurrentDeduplication(cookieName);