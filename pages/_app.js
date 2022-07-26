import { createContext, useState } from 'react';
import '../styles/globals.css'
// import { BrowserRouter as Router} from 'react-router-dom';

export const CredentialsContext = createContext();

function MyApp({ Component, pageProps }) {
  const Credentialstate = useState(null);
  return(
    // <Router>
    <CredentialsContext.Provider value = {Credentialstate}>
  <Component {...pageProps} />
   </CredentialsContext.Provider>
  //  {/* </Router> */}
  )
}

export default MyApp
