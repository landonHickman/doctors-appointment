import './App.css';
import {Route, Switch} from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import About from './pages/About';
import Tests from './pages/Tests';
import Examples from './pages/Examples';
import {MAIN_CONTAINER} from './styles/styles'
import Patients from './pages/patients/Patients';
import Doctors from './pages/doctors/Doctors';
import Appointments from './pages/appointments/Appointments';
import Patient from './pages/patients/Patient';
import Doctor from './pages/doctors/Doctor';

function App() {
  return (
    <>
    <NavBar />
    <MAIN_CONTAINER>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/examples' component={Examples} />
      <Route exact path='/about' component={About} />
      <Route exact path='/tests' component={Tests} />

      <Route exact path='/patients' component={Patients} />
      <Route exact path='/patients/:id' component={Patient} />
      <Route exact path='/doctors' component={Doctors} />
      <Route exact path='/doctors/:id' component={Doctor} />
      <Route exact path='/appointments' component={Appointments} />
    </Switch>
    </MAIN_CONTAINER>
    </>
  );
}

export default App;
