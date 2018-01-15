import app from './app';

const server = app.listen(app.get('port'), () => {
  console.log(`Topsecret Server is running at http://localhost: ${app.get('port')} 
               in ${app.get('env')} mode`);
  console.log('Press CTRL-C to stop\n');
});

export = server;
