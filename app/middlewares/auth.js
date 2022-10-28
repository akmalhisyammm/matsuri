const { UnauthenticatedError, UnauthorizedError } = require('../errors');
const { decodeToken } = require('../utils/jwt');

const authenticateUser = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    let token;

    if (authorization && authorization.startsWith('Bearer')) {
      token = authorization.split(' ')[1];
    }

    if (!token) {
      throw new UnauthenticatedError('Invalid authentication.');
    }

    const payload = decodeToken(token);

    req.user = {
      id: payload.userId,
      name: payload.name,
      email: payload.email,
      role: payload.role,
      organizerId: payload.organizerId,
    };

    next();
  } catch (error) {
    next(error);
  }
};

const authenticateParticipant = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    let token;

    if (authorization && authorization.startsWith('Bearer')) {
      token = authorization.split(' ')[1];
    }

    if (!token) {
      throw new UnauthenticatedError('Invalid authentication.');
    }

    const payload = decodeToken(token);

    req.participant = {
      id: payload.participantId,
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
    };

    next();
  } catch (error) {
    next(error);
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError('Not authorized to access this route.');
    }

    next();
  };
};

module.exports = { authenticateUser, authenticateParticipant, authorizeRoles };
