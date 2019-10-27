import React from 'react';

type AppProps = {};
const App: React.FC<AppProps> = () => {
  return (
    <>
      <h1>Hello, frontend!</h1>
      <style jsx global>{`
      html,
      body,
      #root {
        height: 100%;
      }
      body {
        margin: 0;
      }
      `}</style>
      <style jsx>{`
      h1 {
        margin: 0;
      }
      `}</style>
    </>
  );
};

export default App;
