import jwt from 'jsonwebtoken';
import fs from 'fs';
import logger from '../libs/logger';
import service from '../service';

const publicKeyLocation = process.env.PUBLIC_KEY_LOCATION;
const rootDir = process.cwd();
const publicKey = fs.readFileSync(`${rootDir}${publicKeyLocation}`);

/**
 * Generate and return an authentication middleware with `stricted` parameter
 * @param {Boolean} stricted whether it is necessary to carried jwt or not
 */
const AuthenticationMiddleware = (checkAdmin, stricted = true) => async (req, res, next) => {
  const auth = req.headers.authorization;
  if (auth && auth.startsWith('Bearer ')) {
    try {
      const token = auth.slice(7);
      const payload = jwt.verify(token, publicKey, { algorithms: ['RS256'] });

      if (!payload.isAdmin && checkAdmin) { throw new Error('User not Admin'); }

      const found = await service.user.findOne({ _id: payload._id });
      if (found) {
        req.user = payload;
      } else {
        throw new Error('outdated Admin token');
      }

      next();
    } catch (error) {
      logger.error(
        `[Authentication Middleware] Authentifaction failed, invalid token, error: ${error}.`
      );
      res.status(401).json({ message: 'Authentication failed.' });
    }
  } else if (stricted) {
    logger.error(
      '[Authentication Middleware] Authentifaction failed, no token carried.'
    );
    res.status(401).json({ message: 'Authentication failed.' });
  } else {
    req.user = {};
    next();
  }
};

export default AuthenticationMiddleware;
