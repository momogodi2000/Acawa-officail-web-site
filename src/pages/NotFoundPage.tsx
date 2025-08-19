import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

/**
 * 404 Not Found Page Component
 */
const NotFoundPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Page Non Trouvée | ACAWA</title>
        <meta name="description" content="La page que vous recherchez n'existe pas ou a été déplacée." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-yellow-50">
        <div className="text-center px-4 py-16 max-w-lg mx-auto">
          {/* 404 Animation */}
          <div className="mb-8">
            <div className="text-8xl md:text-9xl font-bold text-red-600 mb-4 animate-bounce">
              404
            </div>
            <div className="text-4xl mb-4">🥋</div>
          </div>

          {/* Error Message */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Oups ! Page Non Trouvée
          </h1>
          
          <p className="text-gray-600 mb-8 leading-relaxed">
            La page que vous recherchez n'existe pas ou a été déplacée. 
            Retournez à l'accueil pour continuer votre parcours avec ACAWA.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Retour à l'Accueil
            </Link>
            
            <Link
              to="/clubs"
              className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
            >
              Voir les Clubs
            </Link>
          </div>

          {/* Help Links */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">Liens utiles :</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link to="/a-propos" className="text-red-600 hover:underline">
                À Propos
              </Link>
              <Link to="/contact" className="text-red-600 hover:underline">
                Contact
              </Link>
              <Link to="/evenements" className="text-red-600 hover:underline">
                Événements
              </Link>
              <Link to="/champions" className="text-red-600 hover:underline">
                Champions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
