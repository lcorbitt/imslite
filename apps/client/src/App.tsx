import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query'; // Import QueryClient and QueryClientProvider

// components
import ProductInput from './components/ProductInput'; 
import ProductsList from './components/ProductsList'; 

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <div className='section-padding text-center bg-green-500 text-white flex justify-between items-center'>
            <Link to="/" className="font-bold"><h1>IMSLite</h1></Link>
            <div>
              <h2>Your simple, light-weight inventory management solution.</h2>
            </div>
            <Link to="/products/new" className="btn btn-info">Add Product</Link>
          </div>
          <Routes>
            <Route path="/" element={<ProductsList />} />
            <Route path="/products/new" element={<ProductInput />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
