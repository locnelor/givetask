import './App.css';
import { Layout } from "antd"
import Page from './Page';
import Admin from './Admin';

function App() {
  if (window.location.search === "?admin") {
    return (
      <Admin />
    )
  }
  return (
    <Layout>
      <Layout.Content>
        <Page />
      </Layout.Content>
    </Layout>
  );
}

export default App;
