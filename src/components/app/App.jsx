import './App.css';
import { Header} from '../header/Header';
import { BreadSection } from '../brea_crumber/Bread';
import { Partner } from '../partner/Partner';
import { Footer } from '../footer/Footer';  
import {ShopPage} from '../pages/shop/ShopPage';
import Chatbot from '../chatbot/Chatbot';

function App() {

  return (
    <>
        <Header />
        <BreadSection />
        <ShopPage />
        <Partner />
        <Footer />
        <Chatbot />
    </>
  );
}

export default App;