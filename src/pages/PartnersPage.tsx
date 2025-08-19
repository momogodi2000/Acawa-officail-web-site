import React from 'react';
import { Helmet } from 'react-helmet-async';

const PartnersPage: React.FC = () => {
  const partners = [
    {
      id: 1,
      name: "Fédération Camerounaise de Karaté",
      type: "Institutionnel",
      description: "Partenaire officiel pour la promotion du karaté au Cameroun"
    },
    {
      id: 2,
      name: "Wadokai International",
      type: "Technique",
      description: "Organisation mondiale du style Wadokai"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Nos Partenaires - ACAWA | Collaborations</title>
        <meta 
          name="description" 
          content="Découvrez les partenaires d'ACAWA qui nous accompagnent dans le développement du karaté Wadokai au Cameroun." 
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Nos Partenaires</h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Ensemble pour le développement du karaté Wadokai
            </p>
          </div>
        </section>

        {/* Partners Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {partners.map((partner) => (
                <div key={partner.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-2xl">
                      🤝
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{partner.name}</h3>
                    <p className="text-green-600 font-medium text-sm mb-4">{partner.type}</p>
                    <p className="text-gray-600 text-sm">{partner.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PartnersPage;