import React from 'react';
import ReactDOM from 'react-dom';


export class CurrentLocation extends React.Component {
  constructor(props) {
    super(props);
    const { lat, lng } = this.props.initialCenter;
    this.state = {
      currentLocation: { lat, lng }
    };
  }
  componentDidMount() {
    if (this.props.centerAroundCurrentLocation) {
      if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
          const coords = pos.coords;
          this.setState({ currentLocation: { lat: coords.latitude, lng: coords.longitude } });
        });
      }
    }
    this.loadMap();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
    if (prevState.currentLocation !== this.state.currentLocation) {
      this.recenterMap();
    }
  }

  loadMap() {
    if (this.props && this.props.google) {
      // checks if google is available
      const { google } = this.props;
      const maps = google.maps;
      const mapRef = this.refs.map;
      // reference to the actual DOM element
      const node = ReactDOM.findDOMNode(mapRef);
      let { zoom } = this.props;
      const { lat, lng } = this.state.currentLocation;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign({}, { center: center, zoom: zoom }
      );
      // maps.Map() is constructor that instantiates the map
      this.map = new maps.Map(node, mapConfig);
    }
  }

  recenterMap() {
    const map = this.map;
    const current = this.state.currentLocation;
    const google = this.props.google;
    const maps = google.maps;
    // send Current data to parent component
    this.props.location(current);

    if (map) {
      let center = new maps.LatLng(current.lat, current.lng);
      map.panTo(center);
    }
  }

  renderChildren() {
    const { children } = this.props;
    if (!children) return;
    return React.Children.map(children, c => {
      if (!c) return;
      return React.cloneElement(c, {
        map: this.map,
        google: this.props.google,
        mapCenter: this.state.currentLocation
      });
    });
  }

  render() {
    return (
      <div>
        <div style={styles.map} ref="map">
          Loading map...
        </div>
        {this.renderChildren()}
      </div>
    );
  }
}
const styles = {
  map: {
    position: 'absolute',
    width: '50%',
    height: '50%'
  }
};

CurrentLocation.defaultProps = {
  zoom: 14,
  initialCenter: {
    lat: 35.713024,
    lng: 51.3785856
  },
  centerAroundCurrentLocation: false,
  visible: true
};
export default CurrentLocation;


