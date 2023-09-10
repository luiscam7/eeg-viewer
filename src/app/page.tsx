import EEGViewer from './components/EEGViewer';
import BrainWaveToolbar from './components/Toolbar';


import userImage from './images/profile/deadmau5.jpg';
import logoImage from './images/logo/Brainwave.png'


function App() {
  return (
      <div>
          <BrainWaveToolbar
              userName="Deadmau5"
              userImage={userImage}
              logoPath={logoImage}
          />
          <div style={{ marginTop: '20px' }}> {/* Adding a top margin */}
              <EEGViewer />
          </div>
      </div>
  )
}


export default App;
