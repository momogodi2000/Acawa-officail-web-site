import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const ClubsPage: React.FC = () => {
  const clubs = [
    {
      id: 1,
      name: "Dojo Central Yaoundé",
      location: "Yaoundé, Centre",
      contact: "675395238",
      schedule: "Lun, Mer, Ven: 18h-20h",
      level: "Tous niveaux"
    },
    {
      id: 2,
      name: "Karaté Club Douala",
      location: "Douala, Littoral",
      contact: "675395238",
      schedule: "Mar, Jeu, Sam: 17h-19h",
      level: "Débutant à Avancé"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Nos Clubs - ACAWA | Trouvez un Dojo près de chez vous</title>
        <meta 
          name="description" 
          content="Découvrez tous les clubs de karaté Wadokai affiliés à ACAWA au Cameroun. Trouvez le dojo le plus proche de chez vous." 
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Nos Clubs</h1>
            <p className="text-xl text-red-100 max-w-3xl mx-auto">
              Découvrez les dojos ACAWA près de chez vous
            </p>
          </div>
        </section>

        {/* Clubs Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {clubs.map((club) => (
                <div key={club.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{club.name}</h3>
                  <div className="space-y-2 text-gray-600 mb-6">
                    <p>📍 {club.location}</p>
                    <p>📞 {club.contact}</p>
                    <p>⏰ {club.schedule}</p>
                    <p>🥋 {club.level}</p>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      to={`/clubs/${club.id}`}
                      className="flex-1 bg-red-600 text-white py-2 px-4 rounded text-center hover:bg-red-700 transition-colors"
                    >
                      Détails
                    </Link>
                    <a
                      href={`https://wa.me/237${club.contact}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-green-600 text-white py-2 px-4 rounded text-center hover:bg-green-700 transition-colors"
                    >
                      Contact
                    </a>
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

export default ClubsPage;