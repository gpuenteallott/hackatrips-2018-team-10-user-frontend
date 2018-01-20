import React, { Component } from 'react';

import { LANDING, BOOKING_FLOW } from '../constants/pages';

import Landing from './landing/Landing';
import BookingFlow from './booking-flow/BookingFlow';

const views = {
  [LANDING]: Landing,
  [BOOKING_FLOW]: BookingFlow,
};

class App extends Component {
  state = {
    activeView: LANDING,
  };

  handleGoToView = (activeView) => {
    this.setState(state => ({ ...state, activeView }));
  }

  render() {
    const View = views[this.state.activeView];
    return (
      <View
        onGoToView={this.handleGoToView}
      />
    );
  }
}

export default App;
