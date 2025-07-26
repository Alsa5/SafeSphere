import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, AlertTriangle, Shield, Book, ArrowRight, RefreshCcw, Award, Scale, X, ChevronLeft, Search, MapPin, Star, Calendar, Users, Filter } from 'lucide-react';

interface Lawyer {
  id: number;
  name: string;
  gender: 'male' | 'female';
  specializations: string[];
  rating: number;
  reviews: number;
  location: string;
  distance: string;
  image: string;
  available: boolean;
}

const lawyers: Lawyer[] = [
  {
    id: 1,
    name: "Priya Sharma",
    gender: "female",
    specializations: ["Domestic Violence", "Sexual Harassment"],
    rating: 4.8,
    reviews: 127,
    location: "Indiranagar, Bangalore",
    distance: "2.5 km",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    available: true
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    gender: "male",
    specializations: ["Cyber Crime", "Property Disputes"],
    rating: 4.6,
    reviews: 98,
    location: "Koramangala, Bangalore",
    distance: "3.8 km",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    available: true
  },
  {
    id: 3,
    name: "Sneha Reddy",
    gender: "female",
    specializations: ["Child Abuse Cases", "Marriage Abuse"],
    rating: 4.9,
    reviews: 156,
    location: "HSR Layout, Bangalore",
    distance: "4.2 km",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    available: false
  }
];

const specializations = [
  "Chain Snatching",
  "Child Abuse Cases",
  "Marriage Abuse & Divorce Cases",
  "Sexual Harassment",
  "Cyber Crime & Online Harassment",
  "Domestic Violence",
  "Property Disputes"
];

interface LawyerCardProps {
  lawyer: Lawyer;
  onBook: () => void;
  onChat: () => void;
}

const LawyerCard: React.FC<LawyerCardProps> = ({ lawyer, onBook, onChat }) => (
  <div className="bg-white rounded-lg shadow-md p-4 mb-4">
    <div className="flex items-start space-x-4">
      <img src={lawyer.image} alt={lawyer.name} className="w-20 h-20 rounded-full object-cover" />
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-black text-lg">{lawyer.name}</h3>
            <div className="flex items-center mt-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm">{lawyer.rating}</span>
              <span className="text-sm text-gray-500 ml-1">({lawyer.reviews} reviews)</span>
            </div>
          </div>
          <div className={`px-2 py-1 rounded-full text-xs ${lawyer.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {lawyer.available ? 'Available Now' : 'Unavailable'}
          </div>
        </div>
        
        <div className="mt-2">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{lawyer.location}</span>
            <span className="mx-2">•</span>
            <span>{lawyer.distance}</span>
          </div>
        </div>
        
        <div className="mt-2 flex flex-wrap gap-2">
          {lawyer.specializations.map((spec, index) => (
            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
              {spec}
            </span>
          ))}
        </div>
        
        <div className="mt-4 flex space-x-3">
          <button
            onClick={onChat}
            className="flex-1 px-3 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors flex items-center justify-center"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Chat Now
          </button>
          <button
            onClick={onBook}
            className="flex-1 px-3 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  </div>
);

const SafetySimulation: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'game' | 'legal'>('legal');
  const [legalView, setLegalView] = useState<'lawyers' | 'chat'>('lawyers');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGender, setSelectedGender] = useState<'all' | 'male' | 'female'>('all');
  const [selectedSpecializations, setSelectedSpecializations] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ type: 'user' | 'assistant' | 'lawyer'; message: string; lawyer?: Lawyer }>>([
    { type: 'assistant', message: 'Welcome! You can search for lawyers or ask for legal assistance. How can I help you today?' }
  ]);

  const filteredLawyers = lawyers.filter(lawyer => {
    const matchesSearch = lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lawyer.specializations.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesGender = selectedGender === 'all' || lawyer.gender === selectedGender;
    const matchesSpecializations = selectedSpecializations.length === 0 ||
      lawyer.specializations.some(s => selectedSpecializations.includes(s));
    
    return matchesSearch && matchesGender && matchesSpecializations;
  });

  const handleSpecializationToggle = (specialization: string) => {
    setSelectedSpecializations(prev =>
      prev.includes(specialization)
        ? prev.filter(s => s !== specialization)
        : [...prev, specialization]
    );
  };

  const handleChat = (lawyer: Lawyer) => {
    setChatHistory(prev => [
      ...prev,
      { 
        type: 'lawyer',
        message: `Hello! I'm ${lawyer.name}. How can I assist you with your legal matters today?`,
        lawyer
      }
    ]);
    setLegalView('chat');
  };

  const handleBookAppointment = (lawyer: Lawyer) => {
    // Implement booking functionality
    alert(`Booking appointment with ${lawyer.name}`);
  };

  const sendMessage = () => {
    if (!chatMessage.trim()) return;
    
    setChatHistory(prev => [
      ...prev,
      { type: 'user', message: chatMessage },
      { type: 'assistant', message: 'I understand your concern.' }
    ]);
    setChatMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Navigation Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
          
            <button
              onClick={() => setCurrentPage('legal')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                currentPage === 'legal'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Legal Assistant
            </button>
          </div>
          {currentPage === 'legal' && (
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setLegalView('lawyers')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  legalView === 'lawyers'
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Find Lawyers
              </button>
              <button
                onClick={() => setLegalView('chat')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  legalView === 'chat'
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Legal Chat
              </button>
            </div>
          )}
        </div>

        {currentPage === 'legal' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {legalView === 'lawyers' ? (
              <div className="space-y-6">
               {/* Search and Filters */}
<div className="bg-white rounded-lg shadow-md p-4">
  <div className="flex items-center space-x-4">
    <div className="flex-1 relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
      <input
        type="text"
        placeholder="Search lawyers by name or specialization..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <button
      onClick={() => setShowFilters(!showFilters)}
      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg flex items-center space-x-2 hover:bg-gray-200 transition-colors"
    >
      <Filter className="w-4 h-4 text-gray-600" />
      <span>Filters</span>
    </button>
  </div>

  {showFilters && (
    <div className="mt-4 pt-4 border-t">
      {/* Gender Filter */}
      <div className="mb-4">
        <h3 className="font-medium text-gray-900 mb-2">Gender</h3>
        <div className="flex space-x-3">
          {['all', 'male', 'female'].map((gender) => (
            <button
              key={gender}
              onClick={() => setSelectedGender(gender)}
              className={`px-4 py-2 rounded-full font-medium transition ${
                selectedGender === gender
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {gender.charAt(0).toUpperCase() + gender.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Specialization Filter */}
      <div>
        <h3 className="font-medium text-gray-900 mb-2">Specializations</h3>
        <div className="flex flex-wrap gap-2">
          {specializations.map((spec) => (
            <button
              key={spec}
              onClick={() => handleSpecializationToggle(spec)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                selectedSpecializations.includes(spec)
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
                              {spec}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Lawyers List */}
                <div className="space-y-4">
                  {filteredLawyers.map((lawyer) => (
                    <LawyerCard
                      key={lawyer.id}
                      lawyer={lawyer}
                      onChat={() => handleChat(lawyer)}
                      onBook={() => handleBookAppointment(lawyer)}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-4 border-b flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Scale className="text-blue-500" />
                    <h2 className="text-xl text-black font-bold">Legal Chat</h2>
                  </div>
                  <button
                    onClick={() => setLegalView('lawyers')}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X />
                  </button>
                </div>
                
                <div className="h-[600px] flex flex-col">
                  <div className="flex-1 p-4 overflow-y-auto space-y-4">
                    {chatHistory.map((msg, index) => (
                      <div
                        key={index}
                        className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        {msg.type === 'lawyer' && msg.lawyer && (
                          <img
                            src={msg.lawyer.image}
                            alt={msg.lawyer.name}
                            className="w-8 h-8 rounded-full mr-2"
                          />
                        )}
                        <div
                          className={`max-w-[100%] rounded-lg p-3 ${
                            msg.type === 'user'
                              ? 'bg-blue-500 text-white'
                              : msg.type === 'lawyer'
                              ? 'bg-pink-300'
                              : 'bg-gray-500'
                          }`}
                        >
                          {msg.type === 'lawyer' && msg.lawyer && (
                            <div className="font-medium text-sm mb-1">{msg.lawyer.name}</div>
                          )}
                          <p className="text-sm">{msg.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 text-black border-t">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder="Type your message..."
                        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={sendMessage}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SafetySimulation;