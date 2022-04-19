const defaultRouter = absoluteRequire('routes/default');
const userRouter = absoluteRequire('routes/user');

module.exports = (app) => {
  app.use('/', defaultRouter);
  app.use('/user', userRouter);
};
