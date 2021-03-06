import { Component, Suspense, lazy } from "react";
import { render } from "react-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import "./styles/style.css";
import "./styles/editedquill.snow.min.css";
import "./styles/editedquilltable.css";

import Choosenav from "./components/NavigBar/Nvgmanager";
import Primaryfooter from "./components/Footer";
import ChooseAcad from "./components/Academicsfold/Acadmanager";
import Choosehome from "./components/Homefold/Homemanager";
import ChooseAoR from "./components/AreasofResearch/Aormanager";
import Newspagecomp from "./components/Newsfold/Newspage";

// Lazy loading
const Facultyapp = lazy(()=>import("./components/Facultiesfold/Facultypage"));
const Staffapp = lazy(()=>import("./components/Stafffold/Staffpage"));
const Activityapp = lazy(()=>import("./components/Activitiescomp"));
const Phdapp = lazy(()=>import("./components/Phdfold/Phdpage"));
const Creditspage = lazy(()=>import("./components/Creditsfold/Creditscomp"));
const Staticpage = lazy(()=>import("./components/Staticpagefold/Staticmanager"));
const Labslist = lazy(()=>import("./components/Labsfold/Labslistpage"));
const Labpage = lazy(()=>import("./components/Labsfold/Labspecific"));

// Alumni page fix needed
const Alumni = lazy(()=>import("./components/Alumnipage"));

interface AppProps {}
interface AppState {
  isLoaded: boolean
}

// ------------ THEME COLOR ---------------------
// #062a51
// #26a69a

const theme = createMuiTheme({
  typography:{
    fontFamily: "Karla,sans-serif,Montserrat",
    h6: {
      fontSize: "15px"
    }
  },
  palette: {
    primary: {
      main: "#26a69a"
    },
    secondary: {
      main: "#fffff0"
    },
    text: {
      primary: "#062a51"
    }
  }
});

const circloaderfall = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70vh", width: "100%" }} >
      <CircularProgress />
      <h4>Taking more time than usual. Please check your internet connection and refresh the page.</h4>
    </div>
  )
}

class App extends Component<AppProps, AppState> {
  constructor(props: any){
    super(props);
    this.state = {
      isLoaded: false
    }
  }

  componentDidMount(){
    this.setState({isLoaded:true})
  }
  
  circloader = () => {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", width: "100%" }} >
        <CircularProgress />
        <h4>Loading...</h4>
      </div>
    )
  }

  renderChoose = () => {
    return (
      <Router>
        <Choosenav />
        <Suspense fallback={circloaderfall}>
          <Switch>
            <Route path="/news">
              <Newspagecomp url_slug="newsblog" />
            </Route>
            <Route path="/alumninews">
              <Newspagecomp url_slug="alumni" />
            </Route>
            <Route path="/btech">
              <ChooseAcad heading="B Tech" acadurl="btech" />
            </Route>
            <Route path="/mtech">
              <ChooseAcad heading="M Tech" acadurl="mtech" />
            </Route>
            <Route path="/phd">
              <ChooseAcad heading="PhD" acadurl="phd" />
            </Route>
            <Route path="/faculty" component={Facultyapp} />
            <Route path="/alumni">
              <Alumni isMobile={true} />
            </Route>
            <Route path="/labs/:labid">
              <Labpage />
            </Route>
            <Route path="/labs">
              <Labslist />
            </Route>
            <Route path="/staff">
              <Staffapp />
            </Route>
            <Route path="/conferenceroom">
              <Staticpage urlslug="conferenceroom" />
            </Route>
            <Route path="/areasofresearch">
              <ChooseAoR />
            </Route>
            <Route path="/seminarhall">
              <Staticpage urlslug="seminarhall" />
            </Route>
            <Route path="/departmentlibrary">
              <Staticpage urlslug="departmentlibrary" />
            </Route>
            <Route path="/departmentbuildings">
              <Staticpage urlslug="departmentbuildings" />
            </Route>
            <Route path="/phdongoing">
              <Phdapp />
            </Route>
            <Route path="/phdawarded">
              <Staticpage urlslug="phdawarded" />
            </Route>
            <Route path="/activities">
              <Activityapp />
            </Route>
            <Route path="/credits">
              <Creditspage />
            </Route>
            <Route path="/">
              <Choosehome />
            </Route>
          </Switch>
        </Suspense>
        <Primaryfooter />
      </Router>
    )
  };

  render() {
    return <ThemeProvider theme={theme}>{
      (this.state.isLoaded)?(this.renderChoose()):(this.circloader())
      }</ThemeProvider>;
  }
}

render(<App />, document.getElementById("root"));
