import React from 'react';
import { SEOHead, SEOPresets } from '../components/seo/SEOHead';
import OptimizedImage from '../components/ui/OptimizedImage';

/**
 * About Page Component - ACAWA Platform
 * Detailed information about ACAWA organization
 */
const AboutPage: React.FC = () => {
  return (
    <>
      <SEOHead {...SEOPresets.about} />

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
            {/* Logo and Introduction */}
            <div className="text-center mb-16">
              <div className="flex justify-center mb-8">
                <OptimizedImage 
                  src="/icons/logo.jpg" 
                  alt="Logo ACAWA" 
                  className="w-32 h-32 object-contain rounded-full shadow-lg border-4 border-red-200"
                  lazy={false}
                />
              </div>
              <h2 className="text-4xl font-bold text-red-600 mb-4">Notre Histoire</h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                ACAWA (Association Camerounaise de Karaté Wadokai) fut créée avec la vision de 
                développer et promouvoir l'art martial traditionnel du Karaté Wado Ryu au Cameroun. 
                Depuis sa fondation, notre association s'est imposée comme une référence dans 
                l'enseignement du Karaté authentique.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-3xl font-bold text-red-600 mb-6">Notre Mission</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  ACAWA a pour mission de promouvoir et développer l'art martial traditionnel du Karaté Wadokai au Cameroun. 
                  Nous nous engageons à former des pratiquants respectueux des valeurs traditionnelles tout en développant 
                  leurs compétences techniques et leur caractère.
                </p>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Notre approche combine la discipline traditionnelle du Wadokai avec des méthodes d'enseignement modernes, 
                  créant un environnement d'apprentissage optimal pour tous les âges et niveaux.
                </p>
                <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
                  <h4 className="font-bold text-gray-800 mb-3">🎯 Objectifs Principaux :</h4>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Préserver l'authenticité du Wado Ryu traditionnel</li>
                    <li>• Former des pratiquants compétents et respectueux</li>
                    <li>• Développer la discipline et le caractère</li>
                    <li>• Promouvoir l'excellence sportive et technique</li>
                    <li>• Créer une communauté unie par les valeurs martiales</li>
                  </ul>
                </div>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-red-600 mb-4">Nos Valeurs</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-red-600 rounded-full mr-4"></span>
                    <span className="text-gray-700 font-medium">Respect et discipline</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-red-600 rounded-full mr-4"></span>
                    <span className="text-gray-700 font-medium">Excellence technique</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-red-600 rounded-full mr-4"></span>
                    <span className="text-gray-700 font-medium">Tradition authentique</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-red-600 rounded-full mr-4"></span>
                    <span className="text-gray-700 font-medium">Esprit communautaire</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-red-600 rounded-full mr-4"></span>
                    <span className="text-gray-700 font-medium">Développement personnel</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-red-600 rounded-full mr-4"></span>
                    <span className="text-gray-700 font-medium">Intégrité et honneur</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Our Vision */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-12 rounded-lg mb-16">
              <div className="text-center">
                <h3 className="text-3xl font-bold mb-6">Notre Vision</h3>
                <p className="text-xl text-red-100 leading-relaxed max-w-4xl mx-auto">
                  Devenir la référence du Karaté Wado Ryu en Afrique Centrale, en formant une nouvelle 
                  génération de pratiquants qui incarnent les valeurs traditionnelles tout en s'adaptant 
                  aux défis du monde moderne. Nous aspirons à créer un réseau de clubs unis par 
                  l'excellence, le respect et la passion de l'art martial.
                </p>
              </div>
            </div>

            {/* Achievement Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 text-center">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="text-4xl font-bold text-red-600 mb-2">15+</div>
                <div className="text-gray-600">Clubs Affiliés</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="text-4xl font-bold text-red-600 mb-2">500+</div>
                <div className="text-gray-600">Membres Actifs</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="text-4xl font-bold text-red-600 mb-2">25+</div>
                <div className="text-gray-600">Champions Formés</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="text-4xl font-bold text-red-600 mb-2">10+</div>
                <div className="text-gray-600">Années d'Excellence</div>
              </div>
            </div>

            {/* Team Leadership Section */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-red-600 text-center mb-12">Direction ACAWA</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* President */}
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white text-2xl shadow-lg">
                    👑
                  </div>
                  <h3 className="text-xl font-bold text-red-600 mb-2">Kouakam Rodrique</h3>
                  <p className="text-yellow-600 font-medium mb-2">4ème Dan</p>
                  <p className="text-gray-600 text-sm font-semibold">PRÉSIDENT ACAWA</p>
                  <p className="text-gray-500 text-sm mt-2">
                    Dirigeant de l'association, garant de la vision et de la stratégie d'ACAWA
                  </p>
                </div>

                {/* Technical Director */}
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-2xl shadow-lg">
                    🥋
                  </div>
                  <h3 className="text-xl font-bold text-red-600 mb-2">Kenfack Anissé</h3>
                  <p className="text-yellow-600 font-medium mb-2">5ème Dan</p>
                  <p className="text-gray-600 text-sm font-semibold">DIRECTEUR TECHNIQUE</p>
                  <p className="text-gray-500 text-sm mt-2">
                    Responsable de la formation technique et pédagogique
                  </p>
                </div>

                {/* Master Founder */}
                <div className="bg-white p-6 rounded-lg shadow-lg text-center md:col-span-2 lg:col-span-1">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl shadow-lg">
                    🏆
                  </div>
                  <h3 className="text-xl font-bold text-red-600 mb-2">Maître Aouna</h3>
                  <p className="text-yellow-600 font-medium mb-2">6ème Dan</p>
                  <p className="text-gray-600 text-sm font-semibold">PÈRE FONDATEUR</p>
                  <p className="text-gray-500 text-sm mt-2">
                    Un des pères fondateurs du Wado Ryu au Cameroun
                  </p>
                </div>
              </div>
            </div>

            {/* Other Masters Section */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-red-600 text-center mb-12">Nos Maîtres</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Master Ferdinand */}
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-400 to-red-500 rounded-full flex items-center justify-center text-white text-xl shadow-lg">
                    🥋
                  </div>
                  <h3 className="text-lg font-bold text-red-600 mb-2">Maître Ferdinand</h3>
                  <p className="text-yellow-600 font-medium mb-1">Ceinture Noire</p>
                  <p className="text-gray-500 text-sm">
                    Maître expérimenté à Douala
                  </p>
                </div>

                {/* Master Ledo Michael */}
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-400 to-red-500 rounded-full flex items-center justify-center text-white text-xl shadow-lg">
                    🥋
                  </div>
                  <h3 className="text-lg font-bold text-red-600 mb-2">Ledo Michael</h3>
                  <p className="text-yellow-600 font-medium mb-1">Ceinture Noire</p>
                  <p className="text-gray-500 text-sm">
                    Maître à Bonaberi Petit Paris
                  </p>
                </div>

                {/* Master Kenfant */}
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-400 to-red-500 rounded-full flex items-center justify-center text-white text-xl shadow-lg">
                    🥋
                  </div>
                  <h3 className="text-lg font-bold text-red-600 mb-2">Maître Kenfant</h3>
                  <p className="text-yellow-600 font-medium mb-1">Ceinture Noire</p>
                  <p className="text-gray-500 text-sm">
                    Maître à Lundi, Douala
                  </p>
                </div>

                {/* Momo Yvan */}
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-400 to-red-500 rounded-full flex items-center justify-center text-white text-xl shadow-lg">
                    🥋
                  </div>
                  <h3 className="text-lg font-bold text-red-600 mb-2">Momo Yvan</h3>
                  <p className="text-yellow-600 font-medium mb-1">Ceinture Blue</p>
                  <p className="text-gray-500 text-sm">
                    Palais des Congrès, Yaoundé
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutPage;
