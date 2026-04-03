const { queryRef, executeQuery, validateArgsWithOptions, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'moviegallery',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const allMoviesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'AllMovies');
}
allMoviesRef.operationName = 'AllMovies';
exports.allMoviesRef = allMoviesRef;

exports.allMovies = function allMovies(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(allMoviesRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;
