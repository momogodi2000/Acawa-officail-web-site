import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  category: 'competition' | 'sensei' | 'training' | 'events';
  title: string;
  description: string;
  date?: string;
  location?: string;
}

const GalleryPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    // Competition Photos
    {
      id: 1,
      src: '/images/gallery/competition-1.jpg',
      alt: 'Championnat National ACAWA 2024',
      category: 'competition',
      title: 'Championnat National ACAWA 2024',
      description: 'Finale du championnat national avec la participation de tous nos clubs',
      date: '2024-03-15',
      location: 'Yaoundé'
    },
    {
      id: 2,
      src: '/images/gallery/competition-2.jpg',
      alt: 'Tournoi International de Douala',
      category: 'competition',
      title: 'Tournoi International de Douala',
      description: 'Compétition internationale avec des participants de toute l\'Afrique Centrale',
      date: '2024-01-20',
      location: 'Douala'
    },
    {
      id: 3,
      src: '/images/gallery/competition-3.jpg',
      alt: 'Coupe ACAWA Junior',
      category: 'competition',
      title: 'Coupe ACAWA Junior',
      description: 'Tournoi dédié aux jeunes pratiquants de moins de 16 ans',
      date: '2024-02-10',
      location: 'Bafoussam'
    },

    // Sensei Photos
    {
      id: 4,
      src: '/images/gallery/sensei-1.jpg',
      alt: 'Maître Kouakam lors d\'un stage',
      category: 'sensei',
      title: 'Maître Kouakam - Stage Technique',
      description: 'Notre Président démontrant les techniques avancées de Wado Ryu',
      date: '2024-04-05',
      location: 'Centre ACAWA'
    },
    {
      id: 5,
      src: '/images/gallery/sensei-2.jpg',
      alt: 'Équipe pédagogique ACAWA',
      category: 'sensei',
      title: 'Équipe Pédagogique ACAWA',
      description: 'Photo officielle de l\'équipe des maîtres et instructeurs certifiés',
      date: '2024-05-01',
      location: 'Yaoundé'
    },
    {
      id: 6,
      src: '/images/gallery/sensei-3.jpg',
      alt: 'Maître Ferdinand en démonstration',
      category: 'sensei',
      title: 'Maître Ferdinand - Démonstration Kata',
      description: 'Exécution parfaite du kata Pinan Shodan lors d\'une cérémonie',
      date: '2024-03-28',
      location: 'Douala'
    },

    // Training Photos
    {
      id: 7,
      src: '/images/gallery/training-1.jpg',
      alt: 'Cours enfants ACAWA',
      category: 'training',
      title: 'Cours Enfants - Apprentissage Ludique',
      description: 'Séance d\'entraînement pour les jeunes karatékas de 6 à 12 ans',
      date: '2024-04-15',
      location: 'Club Bonaberi'
    },
    {
      id: 8,
      src: '/images/gallery/training-2.jpg',
      alt: 'Entraînement avancé kumite',
      category: 'training',
      title: 'Session Kumite Avancée',
      description: 'Entraînement intensif de combat libre pour les ceintures noires',
      date: '2024-04-20',
      location: 'Dojo Central'
    },

    // Events Photos
    {
      id: 9,
      src: '/images/gallery/event-1.jpg',
      alt: 'Cérémonie de remise de ceintures',
      category: 'events',
      title: 'Cérémonie de Passage de Grades',
      description: 'Moment émouvant de remise des nouvelles ceintures aux pratiquants méritants',
      date: '2024-06-01',
      location: 'Palais des Congrès, Yaoundé'
    },
    {
      id: 10,
      src: '/images/gallery/event-2.jpg',
      alt: 'Stage international avec maître japonais',
      category: 'events',
      title: 'Stage International',
      description: 'Visite exceptionnelle d\'un maître japonais 8ème Dan de la fédération mondiale',
      date: '2024-02-28',
      location: 'Yaoundé'
    }
  ];

  const categories = [
    { key: 'all', label: 'Toutes', icon: '🖼️' },
    { key: 'competition', label: 'Compétitions', icon: '🏆' },
    { key: 'sensei', label: 'Nos Maîtres', icon: '🥋' },
    { key: 'training', label: 'Entraînements', icon: '💪' },
    { key: 'events', label: 'Événements', icon: '🎉' }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  const openModal = (item: GalleryItem) => {
    setSelectedImage(item);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <Helmet>
        <title>Galerie Photos - ACAWA | Compétitions et Senseis</title>
        <meta 
          name="description" 
          content="Découvrez les moments forts d'ACAWA : compétitions, démonstrations de nos senseis, entraînements et événements spéciaux." 
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Galerie ACAWA</h1>
            <p className="text-xl text-red-100 max-w-3xl mx-auto">
              Découvrez les moments forts de notre association : compétitions épiques, 
              démonstrations de maîtres, entraînements passionnés et événements mémorables
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 bg-white shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category.key}
                  onClick={() => setSelectedCategory(category.key)}
                  className={`flex items-center px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category.key
                      ? 'bg-red-600 text-white shadow-lg transform scale-105'
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

        {/* Gallery Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
                  onClick={() => openModal(item)}
                >
                  <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    {/* Placeholder for images */}
                    <div className="text-6xl">
                      {item.category === 'competition' && '🏆'}
                      {item.category === 'sensei' && '🥋'}
                      {item.category === 'training' && '💪'}
                      {item.category === 'events' && '🎉'}
                    </div>
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                      <p className="text-sm opacity-90 mb-2">{item.description}</p>
                      {item.date && (
                        <div className="flex items-center text-xs opacity-80">
                          <span className="mr-3">📅 {new Date(item.date).toLocaleDateString('fr-FR')}</span>
                          {item.location && <span>📍 {item.location}</span>}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* View Icon */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredItems.length === 0 && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">📸</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Aucune photo dans cette catégorie</h3>
                <p className="text-gray-600">Les photos seront bientôt ajoutées à notre galerie.</p>
              </div>
            )}
          </div>
        </section>

        {/* Modal */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur p-4">
            <div className="relative max-w-4xl w-full max-h-[90vh] bg-white rounded-lg shadow-2xl overflow-hidden">
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Image */}
              <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <div className="text-8xl">
                  {selectedImage.category === 'competition' && '🏆'}
                  {selectedImage.category === 'sensei' && '🥋'}
                  {selectedImage.category === 'training' && '💪'}
                  {selectedImage.category === 'events' && '🎉'}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">{selectedImage.title}</h2>
                <p className="text-gray-600 mb-4">{selectedImage.description}</p>
                
                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  {selectedImage.date && (
                    <div className="flex items-center">
                      <span className="mr-2">📅</span>
                      {new Date(selectedImage.date).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  )}
                  {selectedImage.location && (
                    <div className="flex items-center">
                      <span className="mr-2">📍</span>
                      {selectedImage.location}
                    </div>
                  )}
                  <div className="flex items-center">
                    <span className="mr-2">🏷️</span>
                    {categories.find(cat => cat.key === selectedImage.category)?.label}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-red-600 to-red-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Rejoignez-nous pour vivre ces moments !</h2>
            <p className="text-xl text-red-100 mb-8">
              Participez aux prochaines compétitions et événements ACAWA
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-white text-red-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Nous Rejoindre
              </a>
              <a
                href="/evenements"
                className="border-2 border-white text-white hover:bg-white hover:text-red-600 font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Voir les Événements
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default GalleryPage;
