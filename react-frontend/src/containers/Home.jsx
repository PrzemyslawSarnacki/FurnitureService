import React from 'react';
import DocumentTitle from 'react-document-title';
import { enquireScreen } from 'enquire-js';
import Banner from '../components/Banner';
import Location from '../components/Location';
import PageRight from '../components/PageRight';
import '../components/static/styles.less';
import Offer from '../components/Offer';

let isMobile = false;
enquireScreen((b) => {
  isMobile = b;
});

class App extends React.PureComponent {
  state = {
    isFirstScreen: true,
    isMobile,
  };

  componentDidMount() {
    enquireScreen((b) => {
      this.setState({
        isMobile: !!b,
      });
    });
  }

  onEnterChange = (mode) => {
    this.setState({
      isFirstScreen: mode === 'enter',
    });
  }

  render() {
    return (
      <body>
        <Banner key="banner" onEnterChange={this.onEnterChange} />
        <Offer key="offer" isMobile={this.state.isMobile} />
        <PageRight key="shop" isMobile={this.state.isMobile} headerName={"Sklep"} paragraphName={"Zobacz ofertę w naszym sklepie"} buttonName={"Sprawdź"} />
        <Location key="location" isMobile={this.state.isMobile} headerName={"Lokalizacja"} paragraphName={"Sprawdź naszą lokalizację w serwisie Google Maps"} buttonName={"Mapa"} />
        <PageRight key="header" isMobile={this.state.isMobile} headerName={"Social Media"} paragraphName={"Zobacz nasze media społecznościowe (fb)"} buttonName={"Sprawdź"} />
        <DocumentTitle title="MEBLEidea" key="title" />
      </body>
    );
  }
}

export default App;
