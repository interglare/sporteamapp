import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Router } from 'react-router-dom'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import ButtonAppBar from './components/layout/ButtonAppBar'
import EventList from './components/event/EventList'
import ImageGrid from './components/area/CreateArea/ImageGrid'
import CreateEventForm from './components/event/CreateEvent/CreateEventForm'
import Footer from './components/layout/Footer';
import MainBoard from './components/mainboard/MainBoard';
import EventBoard from './components/event/EventBoard';
import AreaBoard from './components/area/AreaBoard';
import CreateAreaForm from './components/area/CreateArea/CreateAreaForm';
import Dashboard2 from './components/dashboard/Dashboard'
import Sandbox from './components/layout/Sandbox';
import history from './components/layout/history';
import NotFoundPage from './components/layout/NotFoundPage';
import AreaList from './components/area/AreaList';
import Anasayfa from './components/anasayfa/Anasayfa';
import ScrollToTop from './components/layout/ScrollToTop';
import MyEventList from './components/event/MyEventList';
import NewsBoard from './components/news/NewsBoard'
import NewsList from './components/news/NewsList'
import About from './components/about/About'
import Settings from './components/about/Settings'
class App extends Component {
  render() {
    return (
      <Router history={history}>
      <ScrollToTop>
        <div className="App">
        <ButtonAppBar />
          <Switch>
            <Route exact path='/' component={Anasayfa} />
            <Route path='/login' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            <Route exact path='/events' component={EventList} />
            <Route exact path='/myevents/:uid' component={MyEventList} />
            <Route path='/events/create' component={CreateEventForm} />
            <Route path='/events/:id' component={EventBoard} />
            <Route exact path='/areas' component={AreaList} />
            <Route path='/areas/create' component={CreateAreaForm} />
            <Route path='/areas/:id' component={AreaBoard} />
            <Route path='/board' component={Dashboard2} />
            <Route path='/sandbox' component={Sandbox} />
            <Route path='/404' component={NotFoundPage}/>
            <Route path='/news/:id' component={NewsBoard}/>
            <Route exact path='/news' component={NewsList}/> 
            <Route path='/ana' component={Anasayfa}/>
            <Route path='/about' component={About}/>
            <Route path='/settings' component={Settings}/>
          </Switch>
          
        </div>
        </ScrollToTop>
      </Router>
    );
  }
}

export default App;
