import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const ClubsPage: React.FC = () => {
  const clubs = [
    {
      id: 1,
      name: "Club de Maître Kenfant",
      location: "Lundi, Douala",
      contact: "675395238",
      schedule: "Lun, Mer, Ven: 18h-20h",
      level: "Tous niveaux",
      master: "Maître Kenfant",
      description: "Club dirigé par Maître Kenfant, spécialisé dans la formation traditionnelle Wado Ryu"
    },
    {
      id: 2,
      name: "Club de Maître Kouakam",
      location: "Bonaberi, Douala",
      contact: "675395238",
      schedule: "Mar, Jeu, Sam: 17h-19h",
      level: "Débutant à Avancé",
      master: "Maître Kouakam",
      description: "Formation complète avec le Président d'ACAWA, expert 4ème Dan"
    },
    {
      id: 3,
      name: "Club de Ledo Michael",
      location: "Bonaberi Petit Paris, Douala",
      contact: "675395238",
      schedule: "Mer, Ven, Sam: 16h-18h",
      level: "Tous niveaux",
      master: "Ledo Michael",
      description: "Enseignement moderne du Wado Ryu dans un cadre convivial"
    },
    {
      id: 4,
      name: "Club de Maître Ferdinand",
      location: "Douala Centre",
      contact: "675395238",
      schedule: "Lun, Mer, Ven: 19h-21h",
      level: "Débutant à Expert",
      master: "Maître Ferdinand",
      description: "Formation rigoureuse avec un maître expérimenté au cœur de Douala"
    },
    {
      id: 5,
      name: "Club de Monsieur Momo Yvan",
      location: "Palais des Congrès, Yaoundé",
      contact: "675395238",
      schedule: "Mar, Jeu, Sam: 18h-20h",
      level: "Tous niveaux",
      master: "Momo Yvan",
      supervisor: "Sous supervision des Grands Maîtres",
      description: "Club prestigieux situé au Palais des Congrès, encadré par les grands maîtres d'ACAWA"
    },
    {
      id: 6,
      name: "Dojo Central ACAWA Yaoundé",
      location: "Centre-ville, Yaoundé",
      contact: "675395238",
      schedule: "Lun, Mer, Ven: 17h-19h",
      level: "Tous niveaux",
      master: "Équipe pédagogique ACAWA",
      description: "Siège social d'ACAWA, formation d'excellence avec l'équipe dirigeante"
    },
    {
      id: 7,
      name: "Club ACAWA Douala Port",
      location: "Zone Portuaire, Douala",
      contact: "675395238",
      schedule: "Mer, Ven, Dim: 16h-18h",
      level: "Débutant à Intermédiaire",
      master: "Instructeur certifié",
      description: "Club moderne équipé pour la formation des jeunes et adultes"
    },
    {
      id: 8,
      name: "Dojo ACAWA Bafoussam",
      location: "Bafoussam, Ouest",
      contact: "675395238",
      schedule: "Mar, Jeu, Sam: 17h-19h",
      level: "Tous niveaux",
      master: "Instructeur régional",
      description: "Extension d'ACAWA dans la région de l'Ouest"
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

        {/* Stats Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="group">
                <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                  {clubs.length}
                </div>
                <div className="text-lg text-gray-600">Clubs Actifs</div>
              </div>
              <div className="group">
                <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                  500+
                </div>
                <div className="text-lg text-gray-600">Membres</div>
              </div>
              <div className="group">
                <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                  3
                </div>
                <div className="text-lg text-gray-600">Régions</div>
              </div>
              <div className="group">
                <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                  10+
                </div>
                <div className="text-lg text-gray-600">Années</div>
              </div>
            </div>
          </div>
        </section>

        {/* Clubs Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {clubs.map((club) => (
                <div key={club.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white text-xl mr-4">
                      🥋
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{club.name}</h3>
                      <p className="text-red-600 font-medium">{club.master}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{club.description}</p>
                  
                  <div className="space-y-2 text-gray-600 mb-6">
                    <div className="flex items-center">
                      <span className="w-5 h-5 text-red-500 mr-2">📍</span>
                      <span className="text-sm">{club.location}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-5 h-5 text-green-500 mr-2">📞</span>
                      <span className="text-sm">{club.contact}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-5 h-5 text-blue-500 mr-2">⏰</span>
                      <span className="text-sm">{club.schedule}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-5 h-5 text-yellow-500 mr-2">🥋</span>
                      <span className="text-sm">{club.level}</span>
                    </div>
                    {club.supervisor && (
                      <div className="flex items-center">
                        <span className="w-5 h-5 text-purple-500 mr-2">👑</span>
                        <span className="text-sm text-purple-600 font-medium">{club.supervisor}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Link
                      to={`/clubs/${club.id}`}
                      className="flex-1 bg-red-600 text-white py-2 px-4 rounded text-center hover:bg-red-700 transition-colors duration-200 text-sm font-medium"
                    >
                      Voir Détails
                    </Link>
                    <a
                      href={`https://wa.me/237${club.contact}?text=Bonjour, je souhaite rejoindre le ${club.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-green-600 text-white py-2 px-4 rounded text-center hover:bg-green-700 transition-colors duration-200 text-sm font-medium"
                    >
                      Contacter
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-red-600 to-red-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Vous ne trouvez pas de club près de chez vous ?</h2>
            <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
              Contactez-nous pour ouvrir un nouveau dojo ACAWA dans votre région.
            </p>
            <a
              href="https://wa.me/237675395238?text=Bonjour, je souhaite ouvrir un club ACAWA"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-red-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Ouvrir un Club
            </a>
          </div>
        </section>
      </div>
    </>
  );
};

export default ClubsPage;
