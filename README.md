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
            - modified the header / footer like the hover for the buttons/links, increased the size of the name of the app, added a small description in the footer
            - took back an old authentification html file that i refactored to get a JSX component so I can call it in my App
            - resolved the "Link" conflict in the header component
        Leo:
            - Added all the cards for the artworks with their details in the gallery of the profile page (that I also did)
            - added buttons on the banner only if I am the user in charge of this account (id verification)
            - configured the back with the good dependencies
            - Started the docker compose file

        Romain:
            - full Homepage artistic direction
            - Got the card components from Leo and added a carousel of them on the homepage
            -  linked the homepage to the gallery / user gallery with a button
Third session:
        21/09/26
        Thibaud:
            - fixed the register page and the routes to it
            - added a middleware to specify the port of the front app to the back
            - added an helper in TS to help the back make the authentification (with functions like login, checkAuthentification that returns a bool, and logout that redirects to regsiter page)
            - added a working login page with token generation and verification
            - added a page with a form to post an art on the app and make it available for sale (with price).
            - added the corresponding routes of what I did today

        Leo:
            - configuration mini for the pics
            - upgrade register
            - add avatar

        Romain:
            - finish homepage
            - add error 404 page
            - add button for buy the card
            - add transaction page (is not functional)
Fourth session:
        22/09/26
        Thibaud:
            - re-added the + button to create (bad merge conflict removed it)
            - modified the colors of the create page and login pages for them to correspond to the theme of the app
            - linked the create page to the create button in user banner
            

