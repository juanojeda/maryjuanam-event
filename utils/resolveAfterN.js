const resolveAfterNSeconds = secs => new Promise((resolve) => {
  setTimeout(() => resolve('resolved'), secs * 1000);
});

export default resolveAfterNSeconds;
