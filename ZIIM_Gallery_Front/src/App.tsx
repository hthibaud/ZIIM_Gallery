import './App.css'
import HeaderComponent from './components/Header'
import Router from './router';

function App() {

  return (
    <>
      <Router/>
      <div className="bg-gray-900">
        <header>
          <HeaderComponent />
        </header>
      </div>
    </>
  )
}

export default App
