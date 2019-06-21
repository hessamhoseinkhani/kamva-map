import React, { Component } from 'react';
import Geocode from "react-geocode";
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

import CurrentLocation from '../Map/Map';
import './MapContainer.css';

const googleApiKey = 'AIzaSyBnOC2cYnLyaaYXtnd_IEQWZLkqvg0tqoE';

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      currentLocation: ''
    };
    this.handleLocation = this.handleLocation.bind(this);
  }

  handleLocation = (currentLocation) => {
    console.log('ttt', process.env);
    // get the name of new location
    Geocode.setApiKey(googleApiKey);
    // Enable or disable logs. Its optional.
    Geocode.enableDebug();
    // Get address from latidude & longitude.
    Geocode.fromLatLng(currentLocation.lat, currentLocation.lng).then(
      response => {
        const address = response.results[0].formatted_address;
        this.setState({ currentLocation: address });
      },
      error => {
        console.error(error);
      }
    );
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    return (
      <div className="container" >
        <h4>Your current location is : {this.state.currentLocation !== '' ? this.state.currentLocation : ''}</h4>
        <CurrentLocation centerAroundCurrentLocation google={this.props.google} location={this.handleLocation}>
          <Marker onClick={this.onMarkerClick} name={'current location'} />
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
            <div>
              <h4>{this.state.selectedPlace.name}</h4>
            </div>
          </InfoWindow>
        </CurrentLocation>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: googleApiKey
})(MapContainer);

