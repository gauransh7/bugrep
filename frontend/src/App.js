import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import Home from './components/pages/Home';
import Bugs from './components/pages/Bugs';
import Login from './components/auth/Login';
import Token from './components/auth/Token';
import Projects from './components/pages/Projects';
import { Layout } from 'antd';
import PrivateRoute from './common/PrivateRoute';
import store from './store';
import { loadUser } from './store/actions/authActions';

const { Sider } = Layout


class App extends React.Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Layout style={{ minHeight: '100vh', background: '#fff' }}>
            <Switch>
              <Route path='/token' component={Token} />
              <Route path="/Login" component={Login} />
              <Route path='/*' component={NavBar} />
            </Switch>
            <Layout>
              <PrivateRoute exact path="/" component={Home} />
              <PrivateRoute exact path='/Bugs' component={Bugs} />
              <PrivateRoute exact path='/Projects' component={Projects} />
            </Layout>
          </Layout>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
