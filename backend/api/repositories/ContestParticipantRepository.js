exports.addContestParticipant = (contestId, participantId) => {
  return ContestParticipant.create({
    contest: contestId,
    participant: participantId
  }).fetch();
};

exports.deleteContestParticipant = (contestId, participantId) => {
  return ContestParticipant.destroy({ contest: contestId, participant: participantId });
};
