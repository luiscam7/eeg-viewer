import EEGViewer from './components/EEGViewer';
import BrainWaveToolbar from './components/Toolbar';

import userImage from './images/profile/deadmau5.jpg';
import logoImage from './images/logo/wave.png'


function App() {
  return (
      <div className="bg-base-100"> {/* Set the overall background color */}
          <BrainWaveToolbar
              userName="Deadmau5"
              userImage={userImage}
              logoPath={logoImage}
          />
          <div style={{ marginTop: '10px' }}>
              <EEGViewer />
          </div>
      </div>
  );
}

export default App;

