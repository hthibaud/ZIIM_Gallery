import HeaderComponent from "../components/Header"
import AuthentificationComponent from "../components/utils/Authentification"
import FooterComponent from "../components/Footer"

export default function AuthentificationPage(){
    return(
              <div className="bg-gray-900">
                  <HeaderComponent />
                  <div className="min-h-screen">
                      <AuthentificationComponent />
                  </div>
                  <FooterComponent />
            </div>
    );
}