# ZIIM_Gallery
this is the repo for our digital art gellery project (python fastAPI + React.js course modules)

First session:
    15/09/26
    Thibaud: 
        - Initialized the repo in github and the project in the IDE. 
        - installed the needed dependencies as react-router-dom, tailwindcss.
        - Made classic simple Header and Footer for the webapp with a link to profile and main gallery (not implemented yet)
    Leo:
        - Initialisation du router: route "user/:id"
        composant : 
        
        - Photo de profile: affichage de la photo de profile circulaire avec début de logic de récupération api via id.
        Bannière de profile: afichage de infos de profile avec photo de profile image de bannière ( pour l'instant dégrader css ) username id  et etc. Avec début de logique pour l'appel api avec l'id utilisateur.

        - Page:
        User: Page d'affichage du user et de sa galerie : Affichage du composant bannière et récupération de l'id de la route avec useParams

    Romain:
        - Project Setup & Configuration: Initialized the front-end application (ZIIM_Gallery_Front) using Vite, React, and TypeScript, configured with ESLint and Tailwind CSS.

        - Routing & Pages: Created the app routing structure (router.tsx) and the main landing page (pages/homepage.tsx).

        - Home Components: Built the initial homepage sections under components/home/, including the Hero section (with hero.png), PaintCarousel, and HomeSectionProfile.

        - Assets & Base Layout: Integrated SVG/PNG assets and wired up the core application container (App.tsx, index.css, App.css).

Second session:
        16/09/26
        Thibaud: 
            - Added a simple searchbar to the header
            