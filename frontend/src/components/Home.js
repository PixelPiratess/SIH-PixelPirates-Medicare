import React, { useState, useEffect } from 'react';
import { Activity, Users, Clock, Hospital } from 'lucide-react';
import { State, City } from 'country-state-city';
import './Home.css';

const services = [
  { id: 1, title: 'General Health', icon: <Activity />, details: ['Service A', 'Service B', 'Service C'] },
  { id: 2, title: 'Specialized Care', icon: <Users />, details: ['Service D', 'Service E', 'Service F'] },
  { id: 3, title: 'Emergency Services', icon: <Clock />, details: ['Service G', 'Service H', 'Service I'] },
  { id: 4, title: 'Surgical Procedures', icon: <Hospital />, details: ['Service J', 'Service K', 'Service L'] },
  { id: 5, title: 'Diagnostic Tests', icon: <Activity />, details: ['Service M', 'Service N', 'Service O'] },
  { id: 6, title: 'Pediatric Care', icon: <Users />, details: ['Service P', 'Service Q', 'Service R'] },
  { id: 7, title: 'Geriatric Care', icon: <Clock />, details: ['Service S', 'Service T', 'Service U'] },
  { id: 8, title: 'Orthopedic Services', icon: <Hospital />, details: ['Service V', 'Service W', 'Service X'] },
  { id: 9, title: 'Cardiology', icon: <Activity />, details: ['Service Y', 'Service Z', 'Service AA'] },
  { id: 10, title: 'Neurology', icon: <Users />, details: ['Service BB', 'Service CC', 'Service DD'] },
  { id: 11, title: 'Oncology', icon: <Clock />, details: ['Service EE', 'Service FF', 'Service GG'] },
  { id: 12, title: 'Dermatology', icon: <Hospital />, details: ['Service HH', 'Service II', 'Service JJ'] },
];

const hospitals = [
  { id: 1, name: 'City Hospital', location: 'Mumbai, Maharashtra', city: 'Mumbai', state: 'Maharashtra' },
  { id: 2, name: 'State Medical Center', location: 'Delhi, Delhi', city: 'Delhi', state: 'Delhi' },
  { id: 3, name: 'General Hospital', location: 'Bangalore, Karnataka', city: 'Bangalore', state: 'Karnataka' },
  { id: 4, name: 'Community Health Center', location: 'Chennai, Tamil Nadu', city: 'Chennai', state: 'Tamil Nadu' },
  { id: 5, name: 'District Hospital', location: 'Kolkata, West Bengal', city: 'Kolkata', state: 'West Bengal' },
  // Top 5 Hospitals ends here
  { id: 6, name: 'Public Health Center', location: 'Hyderabad, Telangana', city: 'Hyderabad', state: 'Telangana' },
  // More hospitals...
];

const Home = () => {
  const [selectedService, setSelectedService] = useState(1);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [displayLocation, setDisplayLocation] = useState('');
  const [filteredHospitals, setFilteredHospitals] = useState(hospitals.slice(0, 5));

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, []);

  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
            const data = await response.json();
            const address = data.address || {};
            const city = address.town || address.city || '';
            const state = address.state || '';
            setSelectedCity(city);
            setSelectedState(state);
            setDisplayLocation(`Your Location: ${city}, ${state}`);
          } catch (error) {
            console.error('Error fetching location data:', error);
          }
        },
        (error) => {
          console.error('Error detecting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const states = State.getStatesOfCountry('IN');
  const cities = City.getCitiesOfState('IN', selectedState);

  useEffect(() => {
    let updatedHospitals = [];
    if (selectedCity) {
      updatedHospitals = hospitals.filter(hospital => hospital.city === selectedCity).slice(0, 5);
    } else if (selectedState) {
      updatedHospitals = hospitals.filter(hospital => hospital.state === selectedState).slice(0, 5);
    } else {
      updatedHospitals = hospitals.slice(0, 5);
    }
  
    setFilteredHospitals(updatedHospitals);
  }, [selectedState, selectedCity]);  

  return (
    <div className={`home ${darkMode ? 'dark-mode' : ''}`}>
      <div className="content-wrapper">
        <section className="hero">
          <div className="hero-content">
            <h1>Your One Stop Health Solution</h1>
            <p>Securely share your comprehensive medical history with doctors and loved ones, for better communication and care.</p>
            <button className="cta-button">Appointment Now</button>
          </div>
          <div className="hero-image">
            <img src={require('../assets/HeroImg.png')} alt="Hero" />
          </div>
        </section>

        <section className="features">
          <div className="feature-box">
            <div className="feature">
              <h3>AI Health Diagnosis</h3>
              <p>Cutting-edge AI technology for accurate health diagnostics.</p>
            </div>
          </div>
          <div className="feature-box">
            <div className="feature">
              <h3>Appointment Booking</h3>
              <p>Easy and efficient appointment booking system.</p>
            </div>
          </div>
          <div className="feature-box">
            <div className="feature">
              <h3>24/7 Support</h3>
              <p>Round-the-clock customer support for all your queries.</p>
            </div>
          </div>
          <div className="feature-box">
            <div className="feature">
              <h3>Personalized Health Plans</h3>
              <p>Customized health plans tailored to individual needs.</p>
            </div>
          </div>
        </section>

        <section className="services">
          <h2>Services</h2>
          <div className="services-container">
            <div className="services-grid">
              {services.map((service) => (
                <div 
                  key={service.id} 
                  className={`service-item ${selectedService === service.id ? 'selected' : ''}`}
                  onClick={() => setSelectedService(service.id)}
                >
                  <div className="service-header">
                    {service.icon}
                    <h3>{service.title}</h3>
                  </div>
                </div>
              ))}
            </div>
            <div className="service-details">
              <h3>{services.find(service => service.id === selectedService)?.title}</h3>
              {services.find(service => service.id === selectedService)?.details.map((detail, index) => (
                <p key={index}>{detail}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="premium-features">
          <div className="premium-heading">
            <span className="star">⭐</span>
            <h2>Premium Features</h2>
            <span className="star">⭐</span>
          </div>
          <div className="premium-grid">
            <div className="premium-feature">
              <h3>Advanced Diagnostics</h3>
              <p>Get detailed health diagnostics with our premium AI technology.</p>
            </div>
            <div className="premium-feature">
              <h3>Priority Support</h3>
              <p>Enjoy expedited support with dedicated priority service.</p>
            </div>
            <div className="premium-feature">
              <h3>Exclusive Health Plans</h3>
              <p>Access exclusive, tailored health plans designed for optimal care.</p>
            </div>
            <div className="premium-feature">
              <h3>Personal Health Coach</h3>
              <p>Work with a personal health coach to achieve your wellness goals.</p>
            </div>
          </div>
        </section>

        <section className="partnered-hospitals">
          <h2>Partnered Hospitals</h2>
          <div className="hospital-container">
            <div className="hospital-options">
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state.isoCode} value={state.isoCode}>
                    {state.name}
                  </option>
                ))}
              </select>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                disabled={!selectedState}
              >
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
              <div className="or-divider">
                <span>or</span>
              </div>
              <button className="location-button" onClick={detectLocation}>
                Detect my Location
              </button>
              {displayLocation && (
                <p>{displayLocation}</p>
              )}
            </div>
            <div className="hospital-carousel">
              <h3>{selectedCity ? `Top Hospitals in ${selectedCity}` : selectedState ? `Top Hospitals in ${selectedState}` : 'Top 5 Hospitals'}</h3>
              <div className="carousel-wrapper">
                {filteredHospitals.length > 0 ? (
                  filteredHospitals.map((hospital) => (
                    <div key={hospital.id} className="carousel-item">
                      <h3>{hospital.name}</h3>
                      <p>{hospital.location}</p>
                    </div>
                  ))
                ) : (
                  <p>No hospitals available.</p>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;