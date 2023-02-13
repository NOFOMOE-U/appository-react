import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'
// import { Auth0Provider } from '@auth0/auth0-react'

import App from './app/app'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <StrictMode>
    {/* <Auth0Provider */}
      domain="YOUR_APP_DOMAIN" // Get it from Auth0 console
      clientId="YOUR_CLIENT_ID" // Get it from Auth0 console
      redirectUri={window.location.origin}
    {/* >/ */}
      <App />
    {/* </Auth0Provider> */}
  </StrictMode>,
)
