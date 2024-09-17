import React, { useState } from 'react';
import { Grid, List, Film, Bandage, Flame, Activity, Droplets, Slice, icons, flame, LifeBuoy, Bone, HeartPulse, PlaneLanding, BriefcaseMedical, SquareActivity, Link } from 'lucide-react';
import './FirstAid.css';

const firstAidData = {
  "Nosebleed": {
    icon: Droplets,
    "treatments": [
      "Sit up straight and lean slightly forward",
      "Pinch the soft part of the nose for 10-15 minutes",
      "Apply a cold compress to the nose and cheeks",
    ],
    "videoId": "-l8a3Bc3jRA?si=2wKwS4Q8BlDE1Aj3"
  },
"Cuts and Scrapes": {
    icon: Slice,
    "treatments": [
      "Clean the wound with soap and water",
      "Apply an antibiotic ointment",
      "Cover with a sterile bandage"
    ],
    "videoId": "4e7evinsfm0?si=u1UDyIfjJvI8sQpx"
  },
"Burns": {
    icon: Flame,
    "treatments": [
      "Cool the burn under running water for 10-15 minutes",
      "Cover the burn with a sterile non-stick bandage",
      "Do not apply ice or ointments to severe burns"
    ],
    "videoId": "z_5tuB1YMK0?si=ZrzYn93RohIG9KQR"
  },
"CPR": {
    icon: LifeBuoy,
    "treatments": [
      "Perform 30 chest compressions at a rate of 100-120 per minute",
      "Give 2 rescue breaths",
      "Repeat until help arrives or the person starts breathing"
    ],
    "videoId": "Ey--wndekTU?si=-uI8x-e71mT4w_VC"
  },
"Choking": {
    icon: SquareActivity,
    "treatments": [
      "Perform upward abdominal thrusts",
      "Repeat thrusts until the object is dislodged",
      "Seek immediate medical attention if necessary"
    ],
    "videoId": "nfHGzD93XuU?si=yiVYDQrP3WqU7E8e"
  },
"Fractures": {
    icon: Bone,
    "treatments": [
      "Immobilize the injured area with a splint",
      "Apply a cold pack to reduce swelling",
      "Seek professional medical help immediately"
    ],
    "videoId": "V1YiDNEqOHM?si=85Oi5GBJZPW2WAlB"
  },
"Bleeding": {
    icon: BriefcaseMedical,
    "treatments": [
      "Apply direct pressure to the wound",
      "Elevate the injured area above heart level",
      "Use a clean cloth or sterile bandage to cover"
    ],
    "videoId": "8pTaqY40-Rs?si=G9LjYznJzKEjv-ir"
  },
"Shock": {
    icon: HeartPulse,
    "treatments": [
      "Lay the person down with their legs elevated",
      "Keep the person warm and comfortable",
      "Do not give food or drink"
    ],
    "videoId": "61urGQrmeNM?si=79Qm_7GakAiLeFBm"
  },
"Sprains": {
    icon: PlaneLanding,
    "treatments": [
      "Rest the injured area",
      "Apply ice for 20 minutes at a time",
      "Wrap with a compression bandage"
    ],
    "videoId": "0jps5SZlTdo?si=Zc3oJpf9WUaPPsgg"
  }
};

const FirstAid = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div className="first-aid">
      <h1>Basic First Aid Guide</h1>
      <div className="first-aid-content">
        <div className="categories">
          {Object.entries(firstAidData).map(([category, data]) => (
            <div
              key={category}
              className={`category-card ${selectedCategory === category ? 'selected' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              <div className="category-header">
                {React.createElement(data.icon, { size: 24 })}
                <h3>{category}</h3>
              </div>
            </div>
          ))}
        </div>
        {selectedCategory && (
          <div className="treatments">
            <h2> Treatments for {selectedCategory}</h2>
            <ul>
              {firstAidData[selectedCategory].treatments.map((treatment, index) => (
                <li key={index}>{treatment}</li>
              ))}
            </ul>
            <div className="video-container">
              <h3>Instructional Video</h3>
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${firstAidData[selectedCategory].videoId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FirstAid;