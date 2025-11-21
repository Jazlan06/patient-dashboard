import Header from './components/Header'
import Sidebar from './components/Sidebar';
import DiagnosisHistory from './components/DiagnosisHistory';
import ProfilePanel from './components/Profile';
import DiagnosticListPanel from './components/DiagnosticList';
import LabResultsPanel from './components/LabResults';

function App() {
    return (
        <div className="absolute top-0 left-0 w-[1600px] h-[1195px] bg-[#F6F7F8] bg-no-repeat bg-[0%_0%] opacity-100 overflow-hidden scrollbar-hide">
            <Header />
            <Sidebar />
            <DiagnosisHistory />
            <ProfilePanel />
            <DiagnosticListPanel />
            <LabResultsPanel />
        </div>
    );
}

export default App;
