import React from 'react';
import { Construction } from 'lucide-react';
import './UnderConstruction.css';

const UnderConstruction = () => {
  return (
    <div className="under-construction">
      <div className="content">
        <Construction className="icon construction-icon" />
        <h1>Website Under Construction</h1>
        <p>We're working hard to improve our website and we'll be ready soon</p>
        <div className="update-info">
          <span>Check back later for updates</span>
        </div>
      </div>
    </div>
  );
};

export default UnderConstruction;