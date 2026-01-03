// =======================
// НАСТРОЙКИ
// =======================
const SHIFT = 7; // ключ сдвига

// =======================
// BASE64 (для любого текста)
// =======================
function base64Encode(text) {
    return btoa(unescape(encodeURIComponent(text)));
}

function base64Decode(text) {
    return decodeURIComponent(escape(atob(text)));
}

// =======================
// СДВИГ СИМВОЛОВ
// =======================
function shiftEncrypt(text) {
    let result = "";
    for (let i = 0; i < text.length; i++) {
        result += String.fromCharCode(text.charCodeAt(i) + SHIFT);
    }
    return result;
}

function shiftDecrypt(text) {
    let result = "";
    for (let i = 0; i < text.length; i++) {
        result += String.fromCharCode(text.charCodeAt(i) - SHIFT);
    }
    return result;
}

// =======================
// ОСНОВНЫЕ ФУНКЦИИ
// =======================
function encryptText(text) {
    return shiftEncrypt(base64Encode(text));
}

function decryptText(text) {
    return base64Decode(shiftDecrypt(text));
}

// =======================
// КНОПКИ (ВАЖНО: window)
// =======================
window.encrypt = function () {
    const input = document.getElementById("inputText").value;
    document.getElementById("outputText").value = encryptText(input);
};

window.decrypt = function () {
    const input = document.getElementById("outputText").value;
    document.getElementById("inputText").value = decryptText(input);
};