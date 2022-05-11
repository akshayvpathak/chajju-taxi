const defaultRouter = absoluteRequire('routes/default');
const userRouter = absoluteRequire('routes/user');
const driverRouter = absoluteRequire('routes/driver');

module.exports = (app) => {
  app.use('/', defaultRouter);
  app.use('/user', userRouter);
  app.use('/driver', driverRouter);
};
