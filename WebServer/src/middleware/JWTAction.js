import jwt, { decode } from 'jsonwebtoken';

const createJWT = (payload) => {
    let key = process.env.JWT_SECRET;
    let token = null;
    try {
        token = jwt.sign(payload, key, { expiresIn: process.env.JWT_EXPIRES_IN });
    } catch (error) {
        console.log(error);
    }
    return token;
};

const verifyToken = (token) => {
    let key = process.env.JWT_SECRET;
    let data = null;
    try {
        let decoded = jwt.verify(token, key);
        data = decoded;
    } catch (error) {
        console.log(error);
    }
    return data;
};

const extractToken = (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    }
    return null;
};

const checkUserJWT = (req, res, next) => {
    let cookies = req.cookies;
    const tokenFromHeader = extractToken(req);

    if ((cookies && cookies.jwt) || tokenFromHeader) {
        let token = cookies && cookies.jwt ? cookies.jwt : tokenFromHeader;
        let decoded = verifyToken(token);
        if (decoded) {
            console.log('check user success');
            req.user = decoded;
            req.token = token;
            return next();
        } else {
            console.log('decode jwt fail');
            return res.redirect('/login');
        }
    } else {
        console.log('Not authenticated the user');
        return res.redirect('/login');
    }
};

const checkUserPermission = (req, res, next) => {
    // Nếu vào /login /register thì không cần check quyền mà cho đi tiếp
    if (nonSecurePaths.includes(req.path) || req.path === '/account') return next();

    if (req.user) {
        // Có cách làm khác là lấy email query xuống db để lấy quyền thay vì trong token
        let email = req.user.email;
        let roles = req.user.groupWithRoles.Roles;
        let currentUrl = req.path;
        if (!roles || roles.length === 0) {
            return res.status(403).json({
                EM: `You don't have permission to access this resource...`,
                EC: -1,
                DT: '',
            });
        }
        let canAccess = roles.some((item) => item.url === currentUrl);

        if (canAccess) {
            next();
        } else {
            return res.status(403).json({
                EM: `You don't have permission to access this resource...`,
                EC: -1,
                DT: '',
            });
        }
    } else {
        return res.status(401).json({
            EM: 'Not authenticated the user',
            EC: -1,
            DT: '',
        });
    }
};

module.exports = { createJWT, verifyToken, checkUserJWT, checkUserPermission };
