const defaultRouter = absoluteRequire('routes/default');
const userRouter = absoluteRequire('routes/user');
const driverRouter = absoluteRequire('routes/driver');
const riderRouter = absoluteRequire('routes/rider');

module.exports = (app) => {
  app.use('/', defaultRouter);
  app.use('/user', userRouter);
  app.use('/driver', driverRouter);
  app.use('/rider', riderRouter);
};
