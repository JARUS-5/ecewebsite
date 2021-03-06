import Container from '@material-ui/core/Container';
import Box from "@material-ui/core/Box";
import PrimaryCarousel from "../Carouselfold/CarouselComp";
import PrimaryDepro from "../DepartmentProfile";
import Primaryqlinks from "../Quicklinks";
import Primarynews from "../Newsfold/Newsindex";
import Primarymv from "../MissionandVision";
import SwipeableTextMobileStepper from '../Testimonials';

export default function Deskhome() {
    return (
        <div id="bg">
        <div id="carsa">
          <PrimaryCarousel url_slug="carousel" />
        </div>
        <div id="botcardsa">
          <Container style={{ display: "flex"}}>
            <div id="lmain">
              <PrimaryDepro />
            </div>
            <div id="rmain">
              <div>
                <Primaryqlinks />
              </div>
              <div id="newsindex">
                <Primarynews url_slug="newsblog" child_url="news" />
              </div>
            </div>
          </Container>
          <Container style={{  display: "flex", marginTop:"25px"}}>
          <div style={{ width: "100vw", padding: "15px" }}>
            <Box display="flex">
              <Primarymv />
            </Box>
          </div>
          </Container>
          <div>
            <SwipeableTextMobileStepper />
          </div>
        </div>
      </div>
    )
}