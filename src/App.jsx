import HomePage from 'containers/HomePage';
import './App.css';
import MainPage from 'containers/MainPage';
import GlobalStyle from './global-styles';

function App() {
  return (
    <>
      <GlobalStyle />
      <div className="app">
        <HomePage />
        <MainPage />
      </div>
    </>
  );
}

export default App;
