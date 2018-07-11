'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var jwt = require('jsonwebtoken');

var _require = require('../config/auth'),
    secret = _require.secret;

module.exports = function (req, res, next) {

    var authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'No token provided' });
    }

    var parts = authHeader.split(' ');

    if (!parts.length === 2) {
        return res.status(401).json({ error: 'Token error' });
    }

    var _parts = _slicedToArray(parts, 2),
        scheme = _parts[0],
        token = _parts[1];

    if (!/Bearer$/i.test(scheme)) {
        console.log(scheme);
        return res.status(401).json({ error: 'Token malformatted' });
    }

    jwt.verify(token, secret, function (err, decoded) {
        if (err) {
            res.status(401).json({ error: 'Token invalid' });
        }

        req.userId = decoded.id;
        return next();
    });
};