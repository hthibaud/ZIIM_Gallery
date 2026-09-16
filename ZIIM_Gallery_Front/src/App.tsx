import './App.css'
import FooterComponent from './components/Footer';
import HeaderComponent from './components/Header'
import Router from './router';
import AuthentificationComponent from './components/utils/Authentification'

function App() {

  return (
    <>


      <div className="bg-gray-900">
          <HeaderComponent />
          <div className="min-h-screen">
            <div>
              <AuthentificationComponent />
            </div>
          </div>
          <FooterComponent />
        <Router/>
  
      </div>
    </>
  )
}

export default App
