import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import Home from './components/pages/Home';
import AssignedBugs from './components/pages/AssignedBugs';
import Login from './components/auth/Login';
import Token from './components/auth/Token';
import Projects from './components/pages/Projects';
import ProjectDetail from './components/projects/ProjectDetail';
import { Layout } from 'antd';
import PrivateRoute from './common/PrivateRoute';
import store from './store';
import { loadUser } from './store/actions/authActions';
import { history } from './store';
import { ConnectedRouter } from 'connected-react-router';
import Issue from './components/issues/Issue';
import MyPage from './components/pages/MyPage';
import Admin from  './components/pages/Admin';

const { Sider } = Layout


class App extends React.Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <ConnectedRouter history={history}>
        <div className="App">
          <Layout style={{ minHeight: '100vh', background: '#fff' }}>
            <Switch>
              <Route path='/token' component={Token} />
              <Route path="/Login" component={Login} />
              <Route path='/*' component={NavBar} />
            </Switch>
            <Layout className="site-layout">
              <PrivateRoute exact path="/" component={Home} />
              <PrivateRoute exact path='/Bugs/:bugId' component={Issue} />
              <PrivateRoute exact path='/AssignedBugs' component={AssignedBugs} />
              <PrivateRoute exact path='/Projects/:projectId' component={ProjectDetail} />
              <PrivateRoute exact path='/Projects' component={Projects} />
              <PrivateRoute exact path='/My_Page' component={MyPage} />
              <PrivateRoute exact path='/Admin' component={Admin} />
            </Layout>
          </Layout>
        </div>
      </ConnectedRouter>
    );
  }
}

export default App;
