import { Switch, Route } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import { Navigation } from "./components/Navigation";
import RecipeIndex from "./components/RecipeIndex";
import RecipeShow from "./components/RecipeShow";
import SavedIndex from "./components/SavedIndex";
import Modal from "./components/Modal/Modal";

function App() {
  return (
    <>
      <Navigation />
      <Modal />
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/recipes/:recipeId">
            <RecipeShow />
          </Route>
          <Route path="/saved">
            <SavedIndex />
          </Route>
          <Route path="/">
            <RecipeIndex />
          </Route>
        </Switch>
    </>
  );
}

export default App;
