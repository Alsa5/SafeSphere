import React, { useState } from 'react';
import { Home, MapPin, Globe, Scale, Workflow, User, Moon, Sun, Award } from 'lucide-react'; // Added Globe icon
import CrimeReportFeed from './components/CrimeReportFeed';
import SafetySimulation from './components/SafetySimulation';
import Header from './components/Header';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'feed' | 'map' | 'heatmap' | 'simulation' | 'workflow' | 'community' | 'award'>('feed'); // Added 'heatmap'
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (  
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} overflow-hidden`}>
      <Header 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode} 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      
      <main className="pb-16 overflow-hidden">
        {currentPage === 'feed' && <CrimeReportFeed darkMode={darkMode} />}
        {currentPage === 'map' && (
          <iframe
            src="https://saferoutenavigator.netlify.app/"
            title="Safe Route Navigator"
            className="w-full h-[90vh] border-none"
            style={{ overflow: 'hidden' }}
          />
        )}
        {currentPage === 'heatmap' && (
          <iframe
            src="https://safesphereheatmap.netlify.app/"
            title="Safe Sphere Heat Map"
            className="w-full h-[90vh] border-none"
            style={{ overflow: 'hidden' }}
          />
        )}
        {currentPage === 'simulation' && <SafetySimulation />}
        {currentPage === 'workflow' && (
          <iframe
            src="https://safespheresimulationgame.netlify.app/"
            title="Safe Sphere Simulation"
            className="w-full h-[90vh] border-none"
            style={{ overflow: 'hidden' }}
          />
        )}
        {currentPage === 'community' && (
          <iframe
            src="https://safespherecommunity.netlify.app/"
            title="Safe Sphere Community"
            className="w-full h-[90vh] border-none"
            style={{ overflow: 'auto' }}
          />
        )}
        {currentPage === 'award' && (
          <iframe
            src="https://safesspheregallantryawards.netlify.app/"
            title="Safe Sphere Gallantry Awards"
            className="w-full h-[90vh] border-none"
            style={{ overflow: 'auto' }}
          />
        )}
      </main>

      <nav className={`fixed bottom-0 w-full ${darkMode ? 'bg-gray-800 border-t border-gray-700' : 'bg-white border-t border-gray-200'} py-2 px-4`}>
        <div className="flex justify-around items-center">
          <button 
            onClick={() => setCurrentPage('feed')} 
            className={`p-2 rounded-full ${currentPage === 'feed' && (darkMode ? 'bg-blue-900' : 'bg-blue-100')}`}
          >
            <Home size={24} className={currentPage === 'feed' ? 'text-blue-500' : darkMode ? 'text-gray-400' : 'text-gray-500'} />
          </button>
          <button 
            onClick={() => setCurrentPage('map')} 
            className={`p-2 rounded-full ${currentPage === 'map' && (darkMode ? 'bg-blue-900' : 'bg-blue-100')}`}
          >
            <MapPin size={24} className={currentPage === 'map' ? 'text-blue-500' : darkMode ? 'text-gray-400' : 'text-gray-500'} />
          </button>
          <button 
            onClick={() => setCurrentPage('heatmap')} 
            className={`p-2 rounded-full ${currentPage === 'heatmap' && (darkMode ? 'bg-blue-900' : 'bg-blue-100')}`}
          >
            <Globe size={24} className={currentPage === 'heatmap' ? 'text-blue-500' : darkMode ? 'text-gray-400' : 'text-gray-500'} />
          </button>
          <button 
            onClick={() => setCurrentPage('simulation')} 
            className={`p-2 rounded-full ${currentPage === 'simulation' && (darkMode ? 'bg-blue-900' : 'bg-blue-100')}`}
          >
            <Scale size={24} className={currentPage === 'simulation' ? 'text-blue-500' : darkMode ? 'text-gray-400' : 'text-gray-500'} />
          </button>
          <button 
            onClick={() => setCurrentPage('workflow')} 
            className={`p-2 rounded-full ${currentPage === 'workflow' && (darkMode ? 'bg-blue-900' : 'bg-blue-100')}`}
          >
            <Workflow size={24} className={currentPage === 'workflow' ? 'text-blue-500' : darkMode ? 'text-gray-400' : 'text-gray-500'} />
          </button>
          <button 
            onClick={() => setCurrentPage('community')} 
            className={`p-2 rounded-full ${currentPage === 'community' && (darkMode ? 'bg-blue-900' : 'bg-blue-100')}`}
          >
            <User size={24} className={currentPage === 'community' ? 'text-blue-500' : darkMode ? 'text-gray-400' : 'text-gray-500'} />
          </button>
          <button 
            onClick={() => setCurrentPage('award')} 
            className={`p-2 rounded-full ${currentPage === 'award' && (darkMode ? 'bg-blue-900' : 'bg-blue-100')}`}
          >
            <Award size={24} className={currentPage === 'award' ? 'text-blue-500' : darkMode ? 'text-gray-400' : 'text-gray-500'} />
          </button>
        </div>
      </nav>
    </div>
  );
}

export default App;
