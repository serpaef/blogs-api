function sendError(status, message) {
  return { status, message };
}

function validateDisplayName(displayName) {
  const error = sendError(400, '"displayName" length must be at least 8 characters long');
  
  if (!displayName
    || typeof displayName !== 'string'
    || displayName.length < 8
  ) return error;

  return false;
}

module.exports = { validateDisplayName };