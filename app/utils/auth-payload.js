const createUserPayload = (user) => {
  return {
    userId: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    organizerId: user.organizerId,
  };
};

const createParticipantPayload = (participant) => {
  return {
    participantId: participant._id,
    firstName: participant.firstName,
    lastName: participant.lastName,
    email: participant.email,
  };
};

module.exports = { createUserPayload, createParticipantPayload };
