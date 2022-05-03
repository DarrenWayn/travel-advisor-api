import React, { useState, useEffect }from 'react'
import { CssBaseline, Grid } from '@material-ui/core'

import Header from './components/Header/Header'
import List from './components/List/List'
import Map from './components/Map/Map'
import { getPlacesData, getWeatherData } from './api'

function App() {
  const [places, setPlaces] = useState([])
  const [filteredPlaces, setFilteredPlaces] = useState([])
  const [weatherData, setWeatherData] = useState([])
 
  const [childClicked, setChildClicked] = useState(null)

  const [coordinates, setCoordinates] = useState({})
  const [bounds, setBounds] = useState(false)


  const [isLoading, setIsLoading] = useState(false)
  const [type, setType] = useState('restaurants')
  const [rating, setRating] = useState('All')

  // this use effect function for accessing location the user when they first enter the webiste
  // this useEffect triggered when started
  useEffect(function() {
    navigator.geolocation.getCurrentPosition(function( {coords: {latitude, longitude}} ) {
      setCoordinates( {lat: latitude, lng: longitude} )
    })
  }, [])

  /**
   * * this useEffect triggered when the rating changes
   */
  useEffect(() => {
    const filteredPlaces = places.filter((place) => Number(place.rating) > rating);
    setFilteredPlaces(filteredPlaces);
    // eslint-disable-next-line
  }, [rating]);

  /**
   * * this useEffect triggered when state, coordinates, and bounds changes
   */
  useEffect(function() {
    if (bounds.sw && bounds.ne) {
      setIsLoading(true)

      getWeatherData(coordinates.lat, coordinates.lng)
      .then(function(data) {
        setWeatherData(data)
      })

      getPlacesData(type, bounds.sw, bounds.ne)
      .then(function(data) {
        setPlaces(data?.filter((place) => place.name && place.num_reviews > 0))
        setFilteredPlaces([])
        setIsLoading(false)
      })
    }
  }, [type, bounds])

  return (
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates}/>
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List 
            places={filteredPlaces.length ? filteredPlaces : places}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map 
            setCoordinates={setCoordinates} 
            setBounds={setBounds}
            coordinates={coordinates}
            places={filteredPlaces.length ? filteredPlaces : places}
            setChildClicked={setChildClicked}
            weatherData={weatherData}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default App
