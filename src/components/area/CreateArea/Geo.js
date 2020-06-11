import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MUIPlacesAutocomplete, { geocodeBySuggestion } from 'mui-places-autocomplete'
import Typography from '@material-ui/core/Typography';

class Geo extends React.Component {
  constructor(props) {
    super(props)
    var coord = {
        lat: this.props.location.latitude,
        lng: this.props.location.longitude
    }
    this.state = { open: false, coordinates: coord, errorMessage: null, description: this.props.location.address }

    this.onClose = this.onClose.bind(this)
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this)
  }

  onClose() {
    // Be sure to reset our coordinates/errorMessage so we can render the message displayed in the
    // <Snackbar> appropriately (see 'renderMessage()').
    this.setState({ open: false, coordinates: null, errorMessage: null })
  }

  onSuggestionSelected(suggestion) {
    // Once a suggestion has been selected by your consumer you can use the utility geocoding
    // functions to get the latitude and longitude for the selected suggestion.
    geocodeBySuggestion(suggestion).then((results) => {
      if (results.length < 1) {
        this.setState({
          open: true,
          errorMessage: 'Geocode request completed successfully but without any results',
        })

        return
      }

      // Just use the first result in the list to get the geometry coordinates
      const { geometry } = results[0]

      const coordinates = {
        lat: geometry.location.lat(),
        lng: geometry.location.lng(),
      }
      var location = {
          name: suggestion.description,
          address: suggestion.description,
          latitude: coordinates.lat,
          longitude: coordinates.lng,
          city: suggestion.terms[suggestion.terms.length - 2].value
      }
      this.props.chooseAddress(location);
      // Add your business logic here. In this case we simply set our state to show our <Snackbar>.
      this.setState({ open: true, description: suggestion.description, coordinates })
    }).catch((err) => {
      this.setState({ open: true, errorMessage: err.message })
    })
  }

  renderMessage() {
    const { coordinates, errorMessage, description } = this.state

    if (coordinates) {
      return `Выбран адрес: ${description}.`
    } else if (errorMessage) {
      return `Произошла ошибка: ${errorMessage}`
    }

    // If we don't have any coordinates or error message to render (probably due to being rendered
    // the first time) then render nothing
    return null
  }

  render() {
    const { open } = this.state
    //const {location} = this.props;
    return (
      <div style={{ position: 'relative' }}>
            <Typography variant="h6" align='center' gutterBottom>
                Введите адрес
            </Typography>
        <MUIPlacesAutocomplete
          onSuggestionSelected={this.onSuggestionSelected}
          //textFieldProps={{value: location.address}}
          renderTarget={() => (<div />)}
        />
        <Snackbar
          onClose={this.onClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          autoHideDuration={5000}
          open={open}
          message={(<span>{this.renderMessage()}</span>)}
          style={{ width: '70vw' }}
        />
      </div>
    )
  }
}

Geo.description = 'Geocoding (i.e. latitude/longitude) a selected suggestion'

export default Geo