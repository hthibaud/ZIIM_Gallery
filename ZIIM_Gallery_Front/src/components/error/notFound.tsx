import { Link } from "react-router-dom";

const notFound = () => {
  return (
    <div>
      <h2>Oh non !</h2>
      <p>Il ne te reste plus grand-chose ici.</p>
      <Link to="/">Retour à l'accueil</Link>
    </div>
  );
};

export default notFound;
