const CryptoJS = require("crypto-js");

const token_publico=process.env.PAYKU_TOKEN_PUBLICO
const token_privado=process.env.PAYKU_TOKEN_PRIVADO
const base_url=process.env.PAYKU_BASE_URL
export async function sign(requestPath,data) {
    const orderedData = {};
    Object.keys(data).sort().forEach(function(key) {
    orderedData[key] = data[key];
    if (typeof orderedData[key] === 'object') {
            delete orderedData[key];
        }
    })
    const arrayConcat = new URLSearchParams(orderedData).toString();
    const apiPath = encodeURIComponent(requestPath);
    const concat = apiPath + "&" + arrayConcat;
    const signature = CryptoJS.HmacSHA256(concat, token_privado).toString();
    return signature;
}