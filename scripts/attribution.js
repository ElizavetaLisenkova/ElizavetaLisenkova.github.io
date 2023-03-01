function getParam(key) {
    var p = window.location.search;
    p = p.match(new RegExp(key + '=([^&=]+)'));

    return p ? p[1] : false;
};

function deleteCookie(name) {
    setCookie(name, "", {
      'max-age': -1
    })
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

if (source != 'gdeslon') {
    deleteCookie(cookieName);
}

checkCurrentDeduplication(cookieName);