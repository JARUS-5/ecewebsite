import { Component } from "react";
import { CarouselProvider, Slider, Slide } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import CircularProgress from '@material-ui/core/CircularProgress';
import { apiurl } from '../../varconfig';

interface AppProps {
  url_slug: string
}
interface AppState {
  imgs: {cimgs: {img: string}[]},
  totalimgs: number,
  isLoadState: boolean
}

export default class MobileCarousel extends Component<AppProps,AppState> {
  constructor(props: any){
    super(props);
    this.state = {
      imgs: {cimgs: [{img: ""}]},
      totalimgs: 1,
      isLoadState: false
    }
  };

  componentDidMount(){
    fetch(apiurl+'/backend/'+this.props.url_slug+'/getimages/',
      {method: 'GET'}
    ).then(
      response => response.json()
      ).then(result =>{
        this.setState({imgs:result});
        this.setState({totalimgs: result.cimgs.length});
        this.setState({isLoadState: true})
      }).catch(error=>{console.log("Did not get images")})
  };

  imgSliders = () =>{
    let da = this.state.imgs.cimgs.map(function(objs,index){
      return (
        <Slide index={index}>
          <div style={{ display: "flex", justifyContent: "center", width: "100vw" }}>
            <img width={"100%"} src={objs.img} />                
          </div>
        </Slide>)
        });
    return da;
  }

  render() {
    return (
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={50}
        totalSlides={this.state.totalimgs}
        isPlaying={true}
        infinite={true}
        interval={3000}
      >
        <Slider>
          {
            this.state.isLoadState ? (
              this.imgSliders()
            ) : (
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "30vh" }} >
                <CircularProgress />
                <h4>Getting images...</h4>
              </div>
          )} 
        </Slider>
      </CarouselProvider>
    );
  }
}
