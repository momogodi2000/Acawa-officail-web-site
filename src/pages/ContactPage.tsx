import React from 'react';
import { Helmet } from 'react-helmet-async';

const ContactPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Contact - ACAWA | Nous Contacter</title>
        <meta 
          name="description" 
          content="Contactez ACAWA pour rejoindre nos clubs de karaté Wadokai au Cameroun. Informations, adhésion et renseignements." 
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Nous Contacter</h1>
            <p className="text-xl text-red-100 max-w-3xl mx-auto">
              Rejoignez la communauté ACAWA ou obtenez plus d'informations
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-8">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Informations de Contact</h2>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-4">
                        📞
                      </div>
                      <div>
                        <p className="font-medium">Téléphone</p>
                        <p className="text-gray-600">+237 675 395 238</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-4">
                        ✉️
                      </div>
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-gray-600">contact@acawa-cameroon.org</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-4">
                        📍
                      </div>
                      <div>
                        <p className="font-medium">Adresse</p>
                        <p className="text-gray-600">Yaoundé, Cameroun</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Réseaux Sociaux</h2>
                  <div className="flex space-x-4">
                    <a 
                      href="https://www.facebook.com/ACAWA.cameroon"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
                    >
                      📘
                    </a>
                    <a 
                      href="https://www.instagram.com/ACAWA_cameroon"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center text-white hover:bg-pink-700 transition-colors"
                    >
                      📷
                    </a>
                    <a 
                      href="https://wa.me/237675395238"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white hover:bg-green-700 transition-colors"
                    >
                      💬
                    </a>
                  </div>
                </div>
              </div>

              {/* Quick Contact Form */}
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Rapide</h2>
                <div className="space-y-6">
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h3 className="font-bold text-yellow-800 mb-2">Contact WhatsApp Recommandé</h3>
                    <p className="text-yellow-700 text-sm mb-4">
                      Pour une réponse rapide, contactez-nous directement via WhatsApp.
                    </p>
                    <a
                      href="https://wa.me/237675395238?text=Bonjour, je souhaite obtenir des informations sur ACAWA"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Contacter via WhatsApp
                    </a>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-bold text-gray-800">Questions Fréquentes</h3>
                    <div className="space-y-2 text-sm">
                      <p className="font-medium">• Comment rejoindre un club ?</p>
                      <p className="font-medium">• Quels sont les tarifs ?</p>
                      <p className="font-medium">• Programme pour débutants ?</p>
                      <p className="font-medium">• Horaires et localisations ?</p>
                    </div>
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

export default ContactPage;