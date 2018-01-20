const testConfig = {
  MONGOURI: 'mongodb://test:test@ds263367.mlab.com:63367/topsecret_test',
  PORT: 3000,
};

const devConfig = {
  MONGOURI: 'mongodb://dev:dev@ds159187.mlab.com:59187/topsecret_dev',
  PORT: 3000,
};

const prodConfig = {
  MONGOURI: 'mongodb://prod:prod@ds159187.mlab.com:59187/topsecret_prod',
  PORT: 80,
};


let exportConfig = {
  MONGOURI: '',
  PORT: 0,
};

switch (process.env.NODE_ENV) {
  case 'prod': {
    exportConfig = prodConfig;
    break;
  }

  case 'dev': {
    exportConfig = devConfig;
    break;
  }

  case 'test': {
    exportConfig = testConfig;
    break;
  } 

  default: {
    exportConfig = devConfig;    
  }
}

export { exportConfig as config };
