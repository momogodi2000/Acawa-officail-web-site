import React from 'react';
import { Helmet } from 'react-helmet-async';

const EventsPage: React.FC = () => {
  const events = [
    {
      id: 1,
      title: "Stage National d'Hiver 2024",
      date: "15-17 Mars 2024",
      location: "Yaoundé",
      type: "Stage",
      description: "Stage de perfectionnement technique avec les maîtres du Wadokai"
    },
    {
      id: 2,
      title: "Championnat National ACAWA",
      date: "20 Avril 2024",
      location: "Douala",
      type: "Compétition",
      description: "Compétition annuelle regroupant tous les clubs ACAWA"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Événements - ACAWA | Stages et Compétitions</title>
        <meta 
          name="description" 
          content="Découvrez tous les événements ACAWA : stages, compétitions, examens de grades et séminaires de karaté Wadokai." 
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Nos Événements</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Stages, compétitions et formations pour tous les niveaux
            </p>
          </div>
        </section>

        {/* Events List */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="space-y-8">
              {events.map((event) => (
                <div key={event.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium mr-3 ${
                          event.type === 'Stage' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {event.type}
                        </span>
                        <span className="text-gray-500">{event.date}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
                      <p className="text-gray-600 mb-2">📍 {event.location}</p>
                      <p className="text-gray-600">{event.description}</p>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-6">
                      <a
                        href="https://wa.me/237675395238?text=Bonjour, je souhaite des informations sur les événements ACAWA"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition-colors"
                      >
                        S'inscrire
                      </a>
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

export default EventsPage;