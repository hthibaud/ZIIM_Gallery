import './App.css'
import HeaderComponent from './components/Header'
import Router from './router';

function App() {

  return (
    <>


      <div className="bg-gray-900">
        <header>
          <HeaderComponent />
        </header>
        <Router/>
  
      </div>
    </>
  )
}

export default App
