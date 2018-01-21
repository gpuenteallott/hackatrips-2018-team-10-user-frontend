import React, { Component } from 'react';

import { LANDING, BOOKING_FLOW, BOOKING_CONFIRMATION } from '../constants/pages';

import Landing from './landing/Landing';
import BookingFlow from './booking-flow/BookingFlow';
import BookingConfirmation from './booking-confirmation/BookingConfirmation';

import Transition from 'react-transition-group/Transition';

const duration = 300;
const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100vw',
}

const transitionStyles = {
  entering: { opacity: 0 },
  entered:  { opacity: 1 },
};

class App extends Component {
  state = {
    activeView: LANDING,
  };

  handleGoToView = (activeView) => {
    this.setState(state => ({ ...state, activeView }));
  }

  render() {
    return (
      <div>
        {/* @TODO make this better, so much code repetition down here */}
        <Transition
          mountOnEnter
          unmountOnExit
          in={this.state.activeView === LANDING}
          timeout={duration}
        >
          {(state) => (
            <div style={{ ...defaultStyle, ...transitionStyles[state] }}>
              <Landing onGoToView={this.handleGoToView} />
            </div>
          )}
        </Transition>

        <Transition
          mountOnEnter
          unmountOnExit
          in={this.state.activeView === BOOKING_FLOW}
          timeout={duration}
        >
          {(state) => (
            <div style={{ ...defaultStyle, ...transitionStyles[state] }}>
              <BookingFlow onGoToView={this.handleGoToView} />
            </div>
          )}
        </Transition>

        <Transition
          mountOnEnter
          unmountOnExit
          in={this.state.activeView === BOOKING_CONFIRMATION}
          timeout={duration}
        >
          {(state) => (
            <div style={{ ...defaultStyle, ...transitionStyles[state] }}>
              <BookingConfirmation onGoToView={this.handleGoToView} />
            </div>
          )}
        </Transition>
      </div>
    );
  }
}

export default App;
