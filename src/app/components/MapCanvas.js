import './MapCanvas.css'

import KeplerGl from 'kepler.gl';
import {addDataToMap} from 'kepler.gl/actions';
import {keplerGlReducer} from 'kepler.gl/reducers';
import React from 'react';
import {taskMiddleware} from 'react-palm/tasks';
import {Provider, useDispatch} from 'react-redux';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import useSwr from 'swr';

import IDS from '../../ids.js';

const reducers = combineReducers({
  keplerGl: keplerGlReducer,
});

const store = createStore(reducers, {}, applyMiddleware(taskMiddleware));

export default function MapCanvas() {
    return (
        <Provider store={store}>
            <Map/>
        </Provider>
    );
}

function Map() {
  const dispatch = useDispatch();
  const { data } = useSwr("covid", async () => {
    const response = await fetch('https://gist.githubusercontent.com/leighhalliday/a994915d8050e90d413515e97babd3b3/raw/a3eaaadcc784168e3845a98931780bd60afb362f/covid19.json'); // eslint-disable-line
    const data = await response.json();
    return data;
});

React.useEffect(() => {
  if (data) {
    dispatch(addDataToMap({
      datasets: {info: {label: 'COVID-19', id: 'covid19'}, data},
      option: {centerMap: true, readOnly: false},
      config: {}
    }));
  }
}, [dispatch, data]);

return < KeplerGl
id = 'dgfip_facilities_access'
mapboxApiAccessToken = {IDS.mapbox_token} width = {window.innerWidth} height = {
    window.innerHeight - 60} />
}