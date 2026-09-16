import './App.css'
import FooterComponent from './components/Footer';
import HeaderComponent from './components/Header'
import Router from './router';

function App() {

  return (
    <>

      <div className="bg-gray-900">
          <HeaderComponent />
            <Router/>
          <FooterComponent />
  
      </div>
    </>
  )
}

export default App
