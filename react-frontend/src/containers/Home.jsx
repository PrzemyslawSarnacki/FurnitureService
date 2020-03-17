import React from 'react';
import DocumentTitle from 'react-document-title';
import { enquireScreen } from 'enquire-js';
import Banner from '../components/Banner';
import Page1 from '../components/Page1';
import Page2 from '../components/Page2';
import Page3 from '../components/Page3';
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
      [
        <Banner key="banner" onEnterChange={this.onEnterChange} />,
        <Offer key="offer" isMobile={this.state.isMobile} />,
        <Page3 key="page3" isMobile={this.state.isMobile} headerName={"Sklep"} paragraphName={"Zobacz ofertę w naszym sklepie"} buttonName={"Sprawdź"} />,
        <Page2 key="page2" isMobile={this.state.isMobile} headerName={"Lokalizacja"} paragraphName={"Sprawdź naszą lokalizację w serwisie Google Maps"} buttonName={"Mapa"} />,
        <Page3 key="page3" isMobile={this.state.isMobile} headerName={"Header"} paragraphName={"Paragraph"} buttonName={"OK"} />,
        <Page1 key="page1" isMobile={this.state.isMobile} />,
        <DocumentTitle title="MEBLEidea" key="title" />,
      ]
    );
  }
}

export default App;
