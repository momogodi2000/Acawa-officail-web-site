import React from 'react';
import { Helmet } from 'react-helmet-async';

const ChampionsPage: React.FC = () => {
  const champions = [
    {
      id: 1,
      name: "Jean Kamdem",
      grade: "7e Dan",
      achievements: ["Champion National 2020", "Champion Africain 2019"],
      category: "Senior Masculin"
    },
    {
      id: 2,
      name: "Marie Nguyen",
      grade: "5e Dan",
      achievements: ["Championne Nationale 2021", "Vice-Championne Africaine 2020"],
      category: "Senior Féminin"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Nos Champions - ACAWA | Karaté Wadokai</title>
        <meta 
          name="description" 
          content="Découvrez les champions de karaté Wadokai d'ACAWA. Nos athlètes d'exception qui représentent le Cameroun sur la scène internationale." 
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Nos Champions</h1>
            <p className="text-xl text-yellow-100 max-w-3xl mx-auto">
              L'excellence sportive au service du Karaté Wadokai
            </p>
          </div>
        </section>

        {/* Champions Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {champions.map((champion) => (
                <div key={champion.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center text-white text-2xl">
                      🏆
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{champion.name}</h3>
                    <p className="text-red-600 font-medium mb-2">{champion.grade}</p>
                    <p className="text-gray-600 text-sm mb-4">{champion.category}</p>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-800">Palmarès:</h4>
                      {champion.achievements.map((achievement, index) => (
                        <p key={index} className="text-sm text-gray-600">🥇 {achievement}</p>
                      ))}
                    </div>
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

export default ChampionsPage;