import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ROUTE } from './utils/constants';
import { Layout } from './shared/components/Layout/Layout';
import { Provider } from 'react-redux';
import { store } from './app/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AllPostsPage } from './pages/AllPostsPage/AllPostsPage';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route path={ROUTE.POSTS} element={<AllPostsPage />} />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
