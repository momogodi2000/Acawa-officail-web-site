import React from 'react';
import { Helmet } from 'react-helmet-async';

const AboutPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>À Propos - ACAWA | Association Camerounaise de Karaté Wadokai</title>
        <meta 
          name="description" 
          content="Découvrez l'histoire et la mission d'ACAWA, l'Association Camerounaise de Karaté Wadokai. Notre vision, nos valeurs et notre engagement pour l'art martial." 
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">À Propos d'ACAWA</h1>
            <p className="text-xl text-red-100 max-w-3xl mx-auto">
              L'Association Camerounaise de Karaté Wadokai - Une tradition d'excellence depuis plus de 10 ans
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Notre Mission</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  ACAWA a pour mission de promouvoir et développer l'art martial traditionnel du Karaté Wadokai au Cameroun. 
                  Nous nous engageons à former des pratiquants respectueux des valeurs traditionnelles tout en développant 
                  leurs compétences techniques et leur caractère.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Notre approche combine la discipline traditionnelle du Wadokai avec des méthodes d'enseignement modernes, 
                  créant un environnement d'apprentissage optimal pour tous les âges et niveaux.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-red-600 mb-4">Nos Valeurs</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-600 rounded-full mr-3"></span>
                    Respect et discipline
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-600 rounded-full mr-3"></span>
                    Excellence technique
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-600 rounded-full mr-3"></span>
                    Tradition authentique
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-600 rounded-full mr-3"></span>
                    Esprit communautaire
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-600 rounded-full mr-3"></span>
                    Développement personnel
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutPage;