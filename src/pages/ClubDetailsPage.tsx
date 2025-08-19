import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const ClubDetailsPage: React.FC = () => {
  const { clubId } = useParams<{ clubId: string }>();
  
  // Mock data - in real app, this would come from API
  const club = {
    id: clubId,
    name: "Dojo Central Yaoundé",
    location: "Yaoundé, Centre",
    address: "Rue de la République, Yaoundé",
    contact: "675395238",
    email: "contact@acawa-cameroon.org",
    schedule: {
      "Lundi": "18h00 - 20h00",
      "Mercredi": "18h00 - 20h00",
      "Vendredi": "18h00 - 20h00",
      "Samedi": "10h00 - 12h00"
    },
    instructor: "Sensei Jean Kamdem",
    level: "Tous niveaux",
    description: "Le Dojo Central de Yaoundé est le club principal d'ACAWA. Fondé en 2010, il accueille des pratiquants de tous niveaux dans un environnement convivial et professionnel."
  };

  return (
    <>
      <Helmet>
        <title>{club.name} - ACAWA | Détails du Club</title>
        <meta 
          name="description" 
          content={`Découvrez ${club.name}, club de karaté Wadokai ACAWA à ${club.location}. Horaires, contact et informations pratiques.`}
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Link 
                to="/clubs" 
                className="inline-flex items-center text-red-200 hover:text-white mb-6 transition-colors"
              >
                ← Retour aux clubs
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{club.name}</h1>
              <p className="text-xl text-red-100">📍 {club.location}</p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Details */}
                <div className="space-y-8">
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Informations</h2>
                    <div className="space-y-3">
                      <p><strong>Adresse:</strong> {club.address}</p>
                      <p><strong>Téléphone:</strong> {club.contact}</p>
                      <p><strong>Email:</strong> {club.email}</p>
                      <p><strong>Instructeur:</strong> {club.instructor}</p>
                      <p><strong>Niveau:</strong> {club.level}</p>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">À propos</h2>
                    <p className="text-gray-600 leading-relaxed">{club.description}</p>
                  </div>
                </div>

                {/* Schedule */}
                <div className="space-y-8">
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Horaires</h2>
                    <div className="space-y-3">
                      {Object.entries(club.schedule).map(([day, time]) => (
                        <div key={day} className="flex justify-between py-2 border-b border-gray-100">
                          <span className="font-medium">{day}</span>
                          <span className="text-gray-600">{time}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 rounded-lg text-white">
                    <h3 className="text-xl font-bold mb-4">Prêt à nous rejoindre ?</h3>
                    <p className="mb-6">Contactez-nous pour plus d'informations ou pour réserver votre cours d'essai gratuit.</p>
                    <a
                      href={`https://wa.me/237${club.contact}?text=Bonjour, je souhaite des informations sur ${club.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Contacter via WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ClubDetailsPage;