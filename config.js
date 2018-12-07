// Create and export configuration variables


// Container for all environments


const environments = {};


environments.staging = {
  "envName": "staging",
  "port": 3000
};


environments.production = {
  "envName": "production",
  "port": 5000
};

// Determine which environment was passed as a command line arguement
const currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Check that the current environment is one of the environments available
const environmentToPass = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;

module.exports = environmentToPass;
