import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Create from "./pages/Create";
import Notes from "./pages/Notes";

import Container from '@material-ui/core/Container';

import { pink, blue } from "@material-ui/core/colors";

import { createTheme, ThemeProvider } from "@material-ui/core";

const theme = createTheme({
  palette: {
    primary: blue,
    secondary: pink
  }
})


const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth='sm'>
        <Router>
          <Switch>

            <Route path='/' exact>
              <Notes />
            </Route>

            <Route path='/create' exact>
              <Create />
            </Route>

          </Switch>
        </Router>
      </Container>
    </ThemeProvider>
  )
}

export default App
