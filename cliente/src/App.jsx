import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./Router";
import './styles.css'

export const App = () => {
  return (
    <Router>
      <AppRouter />
    </Router>
  );
};
