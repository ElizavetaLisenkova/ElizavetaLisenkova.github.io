function getCookie(name){
    return document.cookie.split(';').some(c => {
        return c.trim().startsWith(name + '=');
    });
}

function getParam(key) { //забирает источник из utm_source (значение в метке, либо (если метки нет) false)
    var p = window.location.search;
    p = p.match(new RegExp(key + '=([^&=]+)'));
    return p ? p[1] : false;
};

function deleteCookie( name, path, domain ) { //функция, которая удаляет Куку, если другой источник (не Гдеслон)
    if( getCookie( name ) ) {
      document.cookie = name + "=" +
        ((path) ? ";path="+path:"")+
        ((domain)?";domain="+domain:"") +
        ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
    }
  }

function setDeduplicationValue(cookieName) { //есть кука - возвращает "gdeslon", нет куки - возвращает "other"
    if (getCookie(cookieName)) {
        localStorage.setItem(localStorageDeduplicationKey, "gdeslon");
        
    }else{
        localStorage.setItem(localStorageDeduplicationKey, "other");
    }
}

const merchant_id = '107016'
const localStorageDeduplicationKey = `deduplication_${merchant_id}`;
const cookieName = "gdeslon.kokoc.com.__arc_aid"; //кука, на которую ориентируемся
const param = 'utm_source'; // метка, на которую смотрим
/* TODO:
если нет utm_source, но есть другая чужая рекламная метка, например yclid и др, проверять по нескольким ключам гет параметров  
*/
const domain = '.kokoc.com'; // домен рекламодателя, на который ставится кука
const gdeslonUtmValue = 'gdeslon'; //согласованное значение utm_source для Гдеслона
let source = getParam(param); //получаем значение метки utm_source

if (source != gdeslonUtmValue){ //если значение utm_source не gdeslon
    if (source) { //и если значение не false (то есть нет метки вообще)
        deleteCookie(cookieName, '/', domain); //удаляем куку
    } 
}

setDeduplicationValue(cookieName); //в local storage устанавливаем соответствующее значение deduplication