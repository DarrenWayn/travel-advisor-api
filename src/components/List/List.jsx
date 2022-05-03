import React, { useState, useEffect, createRef } from 'react' 
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core'
import PlaceDetails from '../PlaceDetails/PlaceDetails'

import useStyles from './styles'

const List = ( {places, childClicked, isLoading, type, setType, rating, setRating } ) => {
  const classes = useStyles()
  const [elRefs, setElRefs] = useState([])
  console.log({childClicked})
  // we use array constructor
  // we want to call this useEffect every time this dependency array called places are called
  
  useEffect(() => {
    setElRefs((refs) => Array(places?.length).fill().map((_, i) => refs[i] || createRef()));
  }, [places]);
  
  return (
    <div>
      <div className={classes.container}>
        <Typography variant="h4">
          Restaurants, Hotels & Attractions around you
        </Typography>
        { isLoading ? (
          <div className={classes.loading}>
            <CircularProgress size="5rem" />
          </div>
        ) : (
          <>
            <FormControl className={classes.formControl}>
              <InputLabel>Type</InputLabel>
              <Select value={type} onChange={function(e) {setType(e.target.value)}}>
                <MenuItem value="restaurants">Restaurants</MenuItem>
                <MenuItem value="hotels">Hotels</MenuItem>
                <MenuItem value="attractions">Attractions</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel>Rating</InputLabel>
              <Select value={rating} onChange={function(e) {setRating(e.target.value)}}>
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="3">Above 3.0</MenuItem>
                <MenuItem value="4">Above 4.0</MenuItem>
                <MenuItem value="4.5">Above 4.5</MenuItem>
              </Select>
            </FormControl>
            <Grid container spacing={3} className={classes.list}>
              {places?.map((place, i) => (
                <Grid  ref={elRefs[i]} key={i} item xs={12}>
                  <PlaceDetails 
                    selected={Number(childClicked) === i}
                    refProp={elRefs[i]}
                    place={place} 
                  />
                </Grid>
              ))}
            </Grid>
            
          </>
        )}
      </div>
    </div>
  )
  
}
 
export default List
