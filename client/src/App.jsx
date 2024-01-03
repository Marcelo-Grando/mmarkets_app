import './App.css'

import { Router} from 'react-router-dom'

import routes from "./routes/routes.jsx"


function App() {

  return (
      <Router>
        {routes}
      </Router>
  )
}

export default App
