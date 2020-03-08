import React from 'react';
import DocumentTitle from 'react-document-title';
import { enquireScreen } from 'enquire-js';
import Header from './Header';
import Banner from './Banner';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import Footer from './Footer';
import './static/styles.less';
import Offer from './Offer';

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

render(){
  return (
    [
      <Header key="header" isFirstScreen={this.state.isFirstScreen} isMobile={this.state.isMobile} />,
      <Banner key="banner" onEnterChange={this.onEnterChange} />,
      <Offer key="offer" isMobile={this.state.isMobile} />,
      <Page1 key="page1" isMobile={this.state.isMobile} />,
      <Page2 key="page2" isMobile={this.state.isMobile} />,
      <Page3 key="page3" isMobile={this.state.isMobile} />,
      <Footer key="footer" />,
      <DocumentTitle title="Ant Design UI" key="title" />,
    ]
    );
  }
}

export default App;
