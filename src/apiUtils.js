export const parseApiErrors = (error) => {
  console.log(error);
  return error.response.body.violations.reduce(
    (parsedErrors, violation) => {
      parsedErrors[violation['propertyPath']] = violation['message'];
      return parsedErrors;
    },
    {}
  );
};

export const hydraPageCount = (collection) => {
  if (!collection['hydra:view']) {
    return 1;
  }
  if (!collection['hydra:view']['hydra:last']) {
    return 1;
  }

  return Number(
    collection['hydra:view']['hydra:last'].match(/page=(\d+)/)[1]
  );
};

const canWriteBlogPostRoles = ['ROLE_WRITER', 'ROLE_ADMIN', "ROLE_SUPERADMIN"];

export const canWriteBlogPost = (userData) => {
  return null !== userData
    && userData.roles.some(
      userRoles => canWriteBlogPostRoles.includes(userRoles)
    );
};


const canAddTournamentResultRoles = ['ROLE_JUDGE', "ROLE_SUPERADMIN"];

export const canAddTournamentResult = (userData) => {
  return null !== userData
    && userData.roles.some(
      userRoles => canAddTournamentResultRoles.includes(userRoles)
    );
};
