import logo from './logo.svg';
import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import LandingPage from './pages/LandingPage';

const client = new ApolloClient({
    uri: "http://localhost:4000",
    cache: new InMemoryCache()
  })

function App() {
    return(
        <div className="App">
            <ApolloProvider client={client}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LandingPage />}></Route>
                    </Routes>
                </BrowserRouter>
            </ApolloProvider>
        </div>
    );
}

export default App;