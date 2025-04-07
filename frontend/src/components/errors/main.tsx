export const MainErrorFallback = () => {
  return (
    <div>
      <h2>Something went wrong, please try again.</h2>
      <button onClick={() => window.location.assign(window.location.origin)}>
        Refresh
      </button>
    </div>
  );
};
