;
// const MAIN_ORIGIN = "http://127.0.0.1:5500";
const MAIN_ORIGIN = "https://eugenkondratiev.github.io/sandbox";

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
function setCookie(name, value, options = {}) {

    options = {
        path: '/',
        expires: (Date.now() + 86400000),
        // при необходимости добавьте другие значения по умолчанию
        ...options
    };

    if (options.expires.toUTCString) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }

    document.cookie = updatedCookie;
}
function deleteCookie(name) {
    setCookie(name, "", {
        'max-age': -1
    })
}

// function deleteLastLocation (depth = -1) {
//  ;
// }

/**
 * 
 */
const users = [
    { login: "xxx", pass: "qqq", role: "user" },
    { login: "igor", pass: "111", role: "user" },
    { login: "kes", pass: "4414", role: "admin" },
    { login: "olga", pass: "31415", role: "pm" },
];
const REFRESH_PAGE = null;

const uri = new URL(location);
const search = uri.search
    ? uri.search.slice(1).split("&").map(par => par.split("=")).reduce((obj, par) => {
        obj[par[0].toLocaleLowerCase()] = par[1];
        return obj;
    }, {})
    : undefined;

const pathString = uri.pathname;
const _path = pathString.indexOf("/") > -1 ? pathString.substring(1, pathString.lastIndexOf("/")) : "";
console.log('pathString ', _path);
console.log('search - ', search);
console.log('uri - ', uri);



const _userRole = (function () {
    if (!search) {
        console.log("nosearch");
        return getCookie("role");
    };

    if (search.login) {
        const userIndex = users.findIndex(user => user.login === search.login);
        console.log("userIndex  ", userIndex);
        if (userIndex < 0) {
            alert("NO SUCH USER");
            return REFRESH_PAGE;
        } else {
            const userRole = users[userIndex].role;
            if (users[userIndex].pass === search.pass) {
                setCookie("role", userRole);
                setCookie("user", users[userIndex].login);
            } else {
                alert("WRONG PASSWORD");
                return REFRESH_PAGE;
            }
            return REFRESH_PAGE;
            // return userRole;
        }
    }

    if (search.logout) {
        console.log("LOGOUT");
        deleteCookie("role");
        deleteCookie("user");
        return REFRESH_PAGE;
    }
})();
if (_userRole === REFRESH_PAGE) {
    // localStorage.setItem("delLastlocation", 1);
    window.location.replace(uri.origin + uri.pathname);
    // window.open(uri.origin + uri.pathname, "_self");

}

switch (_path) {
    case "coock":
        ;
        break;
    case "coock/view":
        console.log("view");
        break;
    default:
        break;
}
console.log("_userRole", _userRole);
console.log('coockies - ', document.cookie);

console.log("END");

