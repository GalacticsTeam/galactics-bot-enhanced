const CrashHandler = (): void => {
  process.on('unhandledRejection', (reason: Error, p) => {
    console.log(`[Crash-Handler] :: Unhandled Rejection`);
    console.log(reason, p);
  });

  process.on('uncaughtException', (reason, p) => {
    console.log(`[Crash-Handler] :: Uncaught Exception`);
    console.log(reason, p);
  });

  process.on('uncaughtExceptionMonitor', (reason, p) => {
    console.log(`[Crash-Handler] :: Uncaught Exception Monitor`);
    console.log(reason, p);
  });
};

export default CrashHandler;
