import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ROUTE } from './utils/constants';
import { Layout } from './shared/components/Layout/Layout';
import { Provider } from 'react-redux';
import { store } from './app/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AllPostsPage } from './pages/AllPostsPage/AllPostsPage';
import { PostPage } from './pages/PostPage/PostPage';
import { AllCommentsPage } from './pages/AllCommentsPage/AllCommentsPage';

function App() {
  return (
    <Provider store={store}>
      <Layout>
        <Routes>
          <Route path={ROUTE.INDEX} element={<AllPostsPage />} />
          <Route path={`${ROUTE.POSTS}/:id`} element={<PostPage />} />
          <Route path={`${ROUTE.COMMENTS}`} element={<AllCommentsPage />} />
        </Routes>
      </Layout>
    </Provider>
  );
}

export default App;
