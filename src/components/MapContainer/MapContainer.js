import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import Geocode from "react-geocode";

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
    this.showcurrentLocation = this.showcurrentLocation.bind(this);

  }

  handleLocation = (GeoLocationCode) => {
    Geocode.setApiKey(googleApiKey)
    Geocode.fromLatLng(GeoLocationCode.lat, GeoLocationCode.lng).then(
      response => {
        const currentLocation = response.results[0].formatted_address;
        this.setState({ currentLocation });
      },
      error => {
        console.error(error);
      }
    );
  }

  onMarkerClick = (selectedPlace, activeMarker) =>
    this.setState({ selectedPlace, activeMarker, showingInfoWindow: true });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({ showingInfoWindow: false, activeMarker: null });
    }
  };
  showcurrentLocation = currentLocation => {
    return (<h4>Your current location is : {currentLocation !== '' ? currentLocation : ''}</h4>);
  }

  render() {
    const { currentLocation, activeMarker, showingInfoWindow } = this.state;
    return (
      <div className="container" >
        {this.showcurrentLocation(currentLocation)}
        <CurrentLocation centerAroundCurrentLocation google={this.props.google} location={this.handleLocation}>
          <Marker onClick={this.onMarkerClick} name={'current location'} />
          <InfoWindow marker={activeMarker} visible={showingInfoWindow} onClose={this.onClose}>
            {this.showcurrentLocation(currentLocation)}
          </InfoWindow>
        </CurrentLocation>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: googleApiKey
})(MapContainer);
