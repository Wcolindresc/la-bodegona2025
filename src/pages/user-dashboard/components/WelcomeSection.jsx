import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeSection = ({ userName, userEmail, profileCompletion }) => {
  const currentHour = new Date()?.getHours();
  const getGreeting = () => {
    if (currentHour < 12) return 'Buenos días';
    if (currentHour < 18) return 'Buenas tardes';
    return 'Buenas noches';
  };

  return (
    <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-6 text-white">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-2xl font-heading font-bold mb-2">
            {getGreeting()}, {userName}
          </h1>
          <p className="text-white/80 font-body mb-4">{userEmail}</p>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Icon name="User" size={16} color="white" />
              <span className="text-sm font-body">Perfil {profileCompletion}% completo</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} color="white" />
              <span className="text-sm font-body">Cuenta verificada</span>
            </div>
          </div>
        </div>
        
        <div className="hidden md:flex items-center justify-center w-20 h-20 bg-white/20 rounded-full">
          <Icon name="User" size={32} color="white" />
        </div>
      </div>
      
      {profileCompletion < 100 && (
        <div className="mt-4 p-3 bg-white/10 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-body">Completa tu perfil</span>
            <span className="text-sm font-body font-medium">{profileCompletion}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-white rounded-full h-2 transition-all duration-300"
              style={{ width: `${profileCompletion}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default WelcomeSection;