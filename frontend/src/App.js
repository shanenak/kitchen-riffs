import { Switch, Route } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";

function App() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&family=Radley&display=swap" />
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
        </Switch>
    </>
  );
}

export default App;
