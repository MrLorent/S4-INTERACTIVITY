import './MapCanvas.css'

import KeplerGl from 'kepler.gl';
import {addDataToMap} from 'kepler.gl/actions';
import {keplerGlReducer} from 'kepler.gl/reducers';
import {taskMiddleware} from 'react-palm/tasks';
import {Provider, useDispatch} from 'react-redux';
import {applyMiddleware, combineReducers, createStore} from 'redux';

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
  return <KeplerGl
    id="dgfip_facilities_access"
    mapboxApiAccessToken={IDS.mapbox_token}
    width={window.innerWidth}
    height={window.innerHeight}
    />
}