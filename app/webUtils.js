const convert = require('xml-js')
const jsToXmlOptions = {compact: true, ignoreComment: true, spaces: 4}

const _sendMsg = (req, res, code, contentFr, contentEn) => {
    let msg = {msg: req.header('Accept-Language') === 'en' ? contentEn : contentFr}
    if (req.header('Accept') === 'application/xml') {
        msg = convert.js2xml(msg, jsToXmlOptions)
    }
    res.status(code).send(msg);
}

const _sendDataCollection = (req, res, data) => {
    if (req.header('Accept') === 'application/xml') {
        data = convert.js2xml({
            // todo : remplacer 'utilisateurs' par 'collection', plus générique
            utilisateurs: {
                // todo : remplacer 'utilisateur' par 'item', plus générique
                utilisateur: JSON.parse(JSON.stringify(data))
            }
        }, jsToXmlOptions);
    }
    res.status(200).send(data);
}

const _sendData = (req, res, data, code) => {
    if (req.header('Accept') === 'application/xml') {
        data = convert.js2xml({
            // todo : remplacer 'utilisateur' par 'item', plus générique
            utilisateur: JSON.parse(JSON.stringify(data))
        }, jsToXmlOptions);
    }
    res.status(code).send(data);
}

module.exports = {
    sendMsg: _sendMsg,
    sendData: _sendData,
    sendDataCollection: _sendDataCollection
}