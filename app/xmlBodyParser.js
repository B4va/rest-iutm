const convert = require('xml-js')
const xmlToJsOptions = {ignoreComment: true, alwaysChildren: false, compact: true};

module.exports = (req, res, next) => {
    if (req.header('Accept') === 'application/xml') {
        // todo : remplacer 'utilisateur' par 'item', plus général
        req.body = convert.xml2js(req.body, xmlToJsOptions).utilisateur
    }
    next();
}