import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead, SEOPresets } from '../components/seo/SEOHead';

/**
 * Home Page Component - ACAWA Platform
 * Landing page with hero section, overview and CTAs
 */
const HomePage: React.FC = () => {
  return (
    <>
      <SEOHead {...SEOPresets.home} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-red-900 via-red-800 to-orange-900 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-400/10 rounded-full blur-3xl animate-pulse"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <div className="max-w-4xl mx-auto">
            {/* Logo Animation */}
            <div className="mb-8 animate-bounce">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-4xl shadow-2xl">
                🥋
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="block text-yellow-300">ACAWA</span>
              <span className="block text-2xl md:text-4xl lg:text-5xl text-white/90 font-light mt-2">
                Association Camerounaise de Karaté Wadokai
              </span>
            </h1>

            {/* Tagline */}
            <p className="text-xl md:text-2xl text-yellow-200 mb-8 font-medium">
              🥋 L'Art Martial de l'Excellence
            </p>

            {/* Description */}
            <p className="text-lg md:text-xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
              Découvrez la tradition millénaire du Karaté Wadokai au Cameroun. 
              Rejoignez notre communauté de pratiquants passionnés et développez 
              force, discipline et respect à travers l'art martial authentique.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                to="/clubs"
                className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
              >
                <span className="flex items-center justify-center">
                  <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                  </svg>
                  Trouver un Club
                </span>
              </Link>

              <a
                href="https://wa.me/237675395238?text=Bonjour, je souhaite rejoindre ACAWA"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
              >
                <span className="flex items-center justify-center">
                  <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.700"/>
                  </svg>
                  Rejoindre ACAWA
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m0 0l7-7" />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Pourquoi Choisir ACAWA ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une formation complète dans l'art martial traditionnel du Karaté Wadokai
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                🥋
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Tradition Authentique</h3>
              <p className="text-gray-600 leading-relaxed">
                Apprenez le véritable Karaté Wadokai selon les enseignements traditionnels 
                transmis par les maîtres japonais depuis 1939.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center text-white text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                🏆
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Excellence Sportive</h3>
              <p className="text-gray-600 leading-relaxed">
                Formez-vous aux côtés de champions nationaux et internationaux 
                dans un environnement d'excellence sportive et technique.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                🤝
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Communauté Unie</h3>
              <p className="text-gray-600 leading-relaxed">
                Rejoignez une famille de pratiquants passionnés répartis dans 
                tout le Cameroun, unis par les valeurs du respect et de la discipline.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                💪
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Développement Personnel</h3>
              <p className="text-gray-600 leading-relaxed">
                Développez confiance en soi, discipline mentale, condition physique 
                et équilibre émotionnel à travers la pratique régulière.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                🎯
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Techniques Efficaces</h3>
              <p className="text-gray-600 leading-relaxed">
                Maîtrisez des techniques de self-défense efficaces et des mouvements 
                fluides caractéristiques du style Wadokai.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                👨‍👩‍👧‍👦
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Pour Toute la Famille</h3>
              <p className="text-gray-600 leading-relaxed">
                Des cours adaptés à tous les âges et niveaux, de l'enfant à l'adulte, 
                dans une ambiance familiale et bienveillante.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Wado Ryu History Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                L'Histoire du Karaté Wado Ryu
              </h2>
              <p className="text-xl text-gray-600">
                Une tradition séculaire d'arts martiaux japonais
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h3 className="text-3xl font-bold text-red-600 mb-6">Les Origines (1939)</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Le Karaté Wado Ryu fut fondé en 1939 par <strong>Hironori Ohtsuka</strong> (1892-1982), 
                  un maître d'arts martiaux japonais visionnaire. Ohtsuka sensei avait étudié le 
                  Ju-jutsu traditionnel pendant plus de 20 ans avant de découvrir le Karaté d'Okinawa 
                  sous l'enseignement du légendaire Gichin Funakoshi.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Le terme "Wado" signifie littéralement "Voie de la Paix" ou "Voie de l'Harmonie", 
                  reflétant la philosophie unique de cette école qui prône l'efficacité technique 
                  dans la non-violence et l'harmonie avec l'adversaire.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="text-6xl text-center mb-4">🏯</div>
                <h4 className="text-xl font-bold text-center text-gray-800 mb-4">
                  Principe Fondamental
                </h4>
                <blockquote className="text-lg text-gray-600 text-center italic">
                  "L'essence du Wado Ryu est de ne pas s'opposer directement à la force, 
                  mais de l'utiliser et de la rediriger"
                </blockquote>
                <p className="text-center text-gray-500 mt-4">- Hironori Ohtsuka</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="lg:order-2">
                <h3 className="text-3xl font-bold text-red-600 mb-6">Évolution et Reconnaissance</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  En 1966, Hironori Ohtsuka fut honoré par l'Empereur du Japon du titre de 
                  <strong> "Meijin"</strong> (Maître Accompli), la plus haute distinction dans les arts martiaux japonais. 
                  Le Wado Ryu devint l'une des quatre grandes écoles de Karaté reconnues officiellement au Japon.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Aujourd'hui, le Wado Ryu est pratiqué dans plus de 180 pays à travers le monde, 
                  combinant harmonieusement techniques de frappe, esquives fluides, et projections, 
                  héritées de l'influence du Ju-jutsu traditionnel.
                </p>
                <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                  <h5 className="font-bold text-gray-800 mb-2">Caractéristiques Uniques :</h5>
                  <ul className="text-gray-700 space-y-1">
                    <li>• Mouvements fluides et naturels</li>
                    <li>• Esquives et déplacements intelligents</li>
                    <li>• Intégration d'éléments de Ju-jutsu</li>
                    <li>• Philosophie de non-résistance active</li>
                  </ul>
                </div>
              </div>
              <div className="lg:order-1">
                <div className="bg-gradient-to-br from-red-500 to-red-600 text-white p-8 rounded-lg shadow-lg">
                  <h4 className="text-2xl font-bold mb-6 text-center">Chronologie</h4>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-white text-red-600 rounded-full flex items-center justify-center font-bold mr-4">
                        1892
                      </div>
                      <div>
                        <p className="font-semibold">Naissance de Hironori Ohtsuka</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-white text-red-600 rounded-full flex items-center justify-center font-bold mr-4">
                        1939
                      </div>
                      <div>
                        <p className="font-semibold">Fondation du Wado Ryu</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-white text-red-600 rounded-full flex items-center justify-center font-bold mr-4">
                        1966
                      </div>
                      <div>
                        <p className="font-semibold">Titre de Meijin décerné</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-white text-red-600 rounded-full flex items-center justify-center font-bold mr-4">
                        1982
                      </div>
                      <div>
                        <p className="font-semibold">Décès du fondateur</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Témoignages de nos Pratiquants
            </h2>
            <p className="text-xl text-gray-600">
              Découvrez l'expérience de ceux qui ont choisi ACAWA
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gray-50 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white text-2xl mr-4">
                  👨‍💼
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-800">Jean-Paul Mballa</h4>
                  <p className="text-gray-600">Pratiquant depuis 5 ans</p>
                </div>
              </div>
              <blockquote className="text-gray-700 italic mb-4">
                "ACAWA a transformé ma vie. J'ai gagné en confiance, en discipline et j'ai trouvé 
                une vraie famille. Les enseignements des maîtres m'ont appris bien plus que des techniques 
                de combat - ils m'ont enseigné une philosophie de vie."
              </blockquote>
              <div className="flex text-yellow-400 text-xl">
                ⭐⭐⭐⭐⭐
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gray-50 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-2xl mr-4">
                  👩‍🎓
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-800">Marie Nguessam</h4>
                  <p className="text-gray-600">Championne régionale</p>
                </div>
              </div>
              <blockquote className="text-gray-700 italic mb-4">
                "Commencer le karaté à ACAWA était la meilleure décision de ma vie. Non seulement 
                j'ai développé mes capacités physiques, mais j'ai aussi appris à me défendre et 
                à avoir confiance en mes capacités."
              </blockquote>
              <div className="flex text-yellow-400 text-xl">
                ⭐⭐⭐⭐⭐
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-gray-50 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl mr-4">
                  👦
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-800">Pierre Kana (Parent)</h4>
                  <p className="text-gray-600">Père d'un jeune pratiquant</p>
                </div>
              </div>
              <blockquote className="text-gray-700 italic mb-4">
                "Mon fils pratique à ACAWA depuis 3 ans. J'ai vu une amélioration remarquable 
                dans sa discipline, ses notes à l'école et son respect envers les autres. 
                Les valeurs enseignées ici sont exceptionnelles."
              </blockquote>
              <div className="flex text-yellow-400 text-xl">
                ⭐⭐⭐⭐⭐
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold text-red-500 mb-2 group-hover:scale-110 transition-transform duration-300">
                15+
              </div>
              <div className="text-lg text-gray-300">Clubs Affiliés</div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold text-yellow-500 mb-2 group-hover:scale-110 transition-transform duration-300">
                500+
              </div>
              <div className="text-lg text-gray-300">Membres Actifs</div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold text-green-500 mb-2 group-hover:scale-110 transition-transform duration-300">
                25+
              </div>
              <div className="text-lg text-gray-300">Champions</div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold text-blue-500 mb-2 group-hover:scale-110 transition-transform duration-300">
                10+
              </div>
              <div className="text-lg text-gray-300">Années d'Excellence</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Prêt à Commencer Votre Parcours ?
          </h2>
          <p className="text-xl mb-8 text-red-100 max-w-2xl mx-auto">
            Rejoignez ACAWA aujourd'hui et découvrez la voie du Karaté Wadokai. 
            Votre transformation commence maintenant.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-red-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Nous Contacter
            </Link>
            <Link
              to="/clubs"
              className="border-2 border-white text-white hover:bg-white hover:text-red-600 font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Trouver un Club
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
