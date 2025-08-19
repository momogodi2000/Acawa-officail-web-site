import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

interface Event {
  id: number;
  title: string;
  date: string;
  endDate?: string;
  location: string;
  type: 'Stage' | 'Compétition' | 'Examen' | 'Séminaire';
  description: string;
  instructor?: string;
  level: 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Tous niveaux';
  price?: number;
  maxParticipants?: number;
  registrationOpen: boolean;
  image?: string;
}

const EventsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const events: Event[] = [
    {
      id: 1,
      title: "Stage National d'Hiver 2024",
      date: "15 Mars 2024",
      endDate: "17 Mars 2024",
      location: "Centre ACAWA, Yaoundé",
      type: "Stage",
      description: "Stage intensif de perfectionnement technique avec les grands maîtres du Wadokai. Au programme : katas avancés, kumité et applications martiales.",
      instructor: "Maître Kouakam et équipe pédagogique",
      level: "Tous niveaux",
      price: 25000,
      maxParticipants: 100,
      registrationOpen: true
    },
    {
      id: 2,
      title: "Championnat National ACAWA 2024",
      date: "20 Avril 2024",
      location: "Palais des Sports, Douala",
      type: "Compétition",
      description: "Compétition annuelle regroupant tous les clubs ACAWA. Catégories kumité et kata pour toutes les tranches d'âge.",
      level: "Tous niveaux",
      price: 5000,
      registrationOpen: true
    },
    {
      id: 3,
      title: "Examen de Passage de Grades",
      date: "15 Juin 2024",
      location: "Dojo Central, Yaoundé",
      type: "Examen",
      description: "Session d'examen pour les passages de ceintures colorées et noires. Évaluation technique et théorique.",
      instructor: "Commission technique ACAWA",
      level: "Tous niveaux",
      price: 15000,
      registrationOpen: true
    },
    {
      id: 4,
      title: "Stage International avec Maître Japonais",
      date: "5 Septembre 2024",
      endDate: "7 Septembre 2024",
      location: "Université de Yaoundé I",
      type: "Séminaire",
      description: "Événement exceptionnel avec la visite du Maître Takeshi Yamamoto, 8ème Dan, direct du Japon. Enseignements authentiques du Wado Ryu.",
      instructor: "Maître Takeshi Yamamoto (8ème Dan)",
      level: "Intermédiaire",
      price: 50000,
      maxParticipants: 80,
      registrationOpen: true
    },
    {
      id: 5,
      title: "Coupe ACAWA Junior",
      date: "10 Octobre 2024",
      location: "Gymnase Municipal, Bafoussam",
      type: "Compétition",
      description: "Tournoi dédié aux jeunes pratiquants de 8 à 16 ans. Encourage la progression et l'esprit sportif chez nos futurs champions.",
      level: "Débutant",
      price: 3000,
      registrationOpen: true
    },
    {
      id: 6,
      title: "Formation Instructeurs 2024",
      date: "20 Novembre 2024",
      endDate: "22 Novembre 2024",
      location: "Centre de Formation ACAWA",
      type: "Stage",
      description: "Formation certifiante pour devenir instructeur ACAWA. Pédagogie, techniques d'enseignement et certification officielle.",
      instructor: "Équipe pédagogique certifiée",
      level: "Avancé",
      price: 75000,
      maxParticipants: 20,
      registrationOpen: true
    }
  ];

  const categories = [
    { key: 'all', label: 'Tous les Événements', icon: '📅' },
    { key: 'Stage', label: 'Stages', icon: '🥋' },
    { key: 'Compétition', label: 'Compétitions', icon: '🏆' },
    { key: 'Examen', label: 'Examens', icon: '📋' },
    { key: 'Séminaire', label: 'Séminaires', icon: '🎓' }
  ];

  const filteredEvents = selectedCategory === 'all' 
    ? events 
    : events.filter(event => event.type === selectedCategory);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Stage': return 'bg-blue-100 text-blue-800';
      case 'Compétition': return 'bg-red-100 text-red-800';
      case 'Examen': return 'bg-green-100 text-green-800';
      case 'Séminaire': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Débutant': return 'bg-yellow-100 text-yellow-800';
      case 'Intermédiaire': return 'bg-orange-100 text-orange-800';
      case 'Avancé': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <>
      <Helmet>
        <title>Événements - ACAWA | Stages et Compétitions de Karaté Wadokai</title>
        <meta 
          name="description" 
          content="Découvrez tous les événements ACAWA : stages de perfectionnement, compétitions, examens de grades et séminaires avec des maîtres japonais." 
        />
        <meta name="keywords" content="stage karate, competition wadokai, examen ceinture, formation instructeur, cameroun" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Nos Événements</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Stages de perfectionnement, compétitions prestigieuses et formations d'excellence 
              pour tous les niveaux de pratiquants Wadokai
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#events"
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Voir les Événements
              </a>
              <a
                href="https://wa.me/237675395238?text=Je souhaite m'inscrire à un événement"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                S'inscrire
              </a>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 bg-white shadow-sm" id="events">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {categories.map((category) => (
                <button
                  key={category.key}
                  onClick={() => setSelectedCategory(category.key)}
                  className={`flex items-center px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category.key
                      ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span className="mr-2 text-lg">{category.icon}</span>
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Events List */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredEvents.map((event) => (
                <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                  {/* Event Header */}
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(event.type)} bg-white/20 text-white`}>
                          {event.type}
                        </span>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ml-2 ${getLevelColor(event.level)} bg-white/20 text-white`}>
                          {event.level}
                        </span>
                      </div>
                      {event.registrationOpen && (
                        <span className="bg-green-400 text-green-900 px-3 py-1 rounded-full text-sm font-medium">
                          Inscriptions ouvertes
                        </span>
                      )}
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-blue-100">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        {event.date}
                        {event.endDate && ` - ${event.endDate}`}
                      </div>
                      <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        {event.location}
                      </div>
                    </div>
                  </div>

                  {/* Event Content */}
                  <div className="p-6">
                    <p className="text-gray-700 mb-6 leading-relaxed">{event.description}</p>

                    {/* Event Details */}
                    <div className="space-y-3 mb-6">
                      {event.instructor && (
                        <div className="flex items-center text-gray-600">
                          <span className="w-6 h-6 mr-3 text-blue-500">👨‍🏫</span>
                          <span><strong>Instructeur :</strong> {event.instructor}</span>
                        </div>
                      )}
                      {event.price && (
                        <div className="flex items-center text-gray-600">
                          <span className="w-6 h-6 mr-3 text-green-500">💰</span>
                          <span><strong>Prix :</strong> {event.price.toLocaleString()} FCFA</span>
                        </div>
                      )}
                      {event.maxParticipants && (
                        <div className="flex items-center text-gray-600">
                          <span className="w-6 h-6 mr-3 text-purple-500">👥</span>
                          <span><strong>Places limitées :</strong> {event.maxParticipants} participants</span>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <a
                        href={`https://wa.me/237675395238?text=Je souhaite m'inscrire à l'événement : ${event.title}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-blue-600 text-white text-center py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium"
                      >
                        S'inscrire
                      </a>
                      <a
                        href={`https://wa.me/237675395238?text=Je souhaite plus d'informations sur : ${event.title}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 border-2 border-blue-600 text-blue-600 text-center py-3 px-4 rounded-lg hover:bg-blue-50 transition-colors duration-300 font-medium"
                      >
                        Plus d'infos
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredEvents.length === 0 && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">📅</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Aucun événement dans cette catégorie</h3>
                <p className="text-gray-600">De nouveaux événements seront bientôt ajoutés à notre calendrier.</p>
              </div>
            )}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Pourquoi Participer à nos Événements ?</h2>
              <p className="text-xl text-gray-600">Des opportunités uniques de progression et de rencontres</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl">
                  📈
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Progression Technique</h3>
                <p className="text-gray-600">
                  Perfectionnez votre technique avec des maîtres expérimentés et découvrez de nouveaux aspects du Wado Ryu.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-2xl">
                  🤝
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Rencontres Enrichissantes</h3>
                <p className="text-gray-600">
                  Rencontrez d'autres pratiquants passionnés, échangez et créez des liens durables dans la communauté ACAWA.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl">
                  🏆
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Esprit de Compétition</h3>
                <p className="text-gray-600">
                  Testez vos compétences dans un environnement bienveillant et mesurez vos progrès face à d'autres pratiquants.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Témoignages de Participants</h2>
              <p className="text-xl text-gray-600">Ce que disent ceux qui ont participé à nos événements</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl mr-4">
                    👨‍🎓
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Paul Nkomo</h4>
                    <p className="text-gray-600">Ceinture Noire 2ème Dan</p>
                  </div>
                </div>
                <blockquote className="text-gray-700 italic">
                  "Le stage avec le maître japonais a été une révélation. J'ai découvert des subtilités du Wado Ryu 
                  que je n'aurais jamais imaginées. Une expérience transformatrice !"
                </blockquote>
                <div className="text-yellow-400 mt-4">⭐⭐⭐⭐⭐</div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white text-xl mr-4">
                    👩‍🦱
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Marie Essomba</h4>
                    <p className="text-gray-600">Championne Régionale</p>
                  </div>
                </div>
                <blockquote className="text-gray-700 italic">
                  "Ma première compétition ACAWA m'a donné confiance en moi. L'ambiance était formidable 
                  et j'ai beaucoup appris en observant les autres compétiteurs."
                </blockquote>
                <div className="text-yellow-400 mt-4">⭐⭐⭐⭐⭐</div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-xl mr-4">
                    👨‍🏫
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Jean Fotso</h4>
                    <p className="text-gray-600">Instructeur Certifié</p>
                  </div>
                </div>
                <blockquote className="text-gray-700 italic">
                  "La formation d'instructeur m'a ouvert de nouveaux horizons. Excellent contenu pédagogique 
                  et encadrement professionnel. Je recommande vivement !"
                </blockquote>
                <div className="text-yellow-400 mt-4">⭐⭐⭐⭐⭐</div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Prêt à Rejoindre nos Événements ?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Ne ratez aucune opportunité de progresser et de rencontrer la communauté ACAWA. 
              Inscrivez-vous dès maintenant !
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/237675395238?text=Je souhaite être informé des prochains événements ACAWA"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Recevoir les Notifications
              </a>
              <a
                href="/contact"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Nous Contacter
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default EventsPage;