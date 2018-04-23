const testConfig = {
  MONGOURI: 'mongodb://root:root@ds161148.mlab.com:61148/topsecret_test',
  PORT: 3000,
};

const devConfig = {
  MONGOURI: 'mongodb://root:root@ds259268.mlab.com:59268/topsecret_dev',
  //PORT: 3000,
  // Change before commit
  PORT: 4000,
};

const prodConfig = {
  MONGOURI: 'mongodb://root:root@ds261088.mlab.com:61088/topsecret_prod',
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
