import HeaderComponent from "../components/Header"
import RegisterComponent from "../components/utils/register"
import FooterComponent from "../components/Footer"

export default function AuthentificationPage(){
    return(
              <div className="bg-gray-900">
                  <HeaderComponent />
                  <div className="min-h-screen">
                      <RegisterComponent />
                  </div>
                  <FooterComponent />
            </div>
    );
}