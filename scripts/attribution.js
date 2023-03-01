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

function setDeduplicationValue(cookieName) {
    if (document.cookie.indexOf(cookieName) == 0) {
        localStorage.setItem("deduplication", "gdeslon");
        
    }else{
        localStorage.setItem("deduplication", "other");
    }
}


cookieName = "gdeslon.kokoc.com.__arc_aid"; //кука, на которую ориентируемся
source = getParam('utm_source'); // метка, на которую смотрим
/* TODO:
если нет utm_source, но есть другая чужая рекламная метка, например yclid и др, проверять по нескольким ключам гет параметров  
*/

domain = '.swtest.ru'; // домен рекламодателя, на который ставится кука

if (source != 'gdeslon'){
    if (source) {
        deleteCookie(cookieName, '/', domain);
    } 
}

setDeduplicationValue(cookieName);