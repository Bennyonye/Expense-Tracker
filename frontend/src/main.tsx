import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { GlobalStyle } from './styles/GlobalStyles.tsx'
import { GlobalProvider } from './context/globalContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalStyle /> 
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </StrictMode>
);
