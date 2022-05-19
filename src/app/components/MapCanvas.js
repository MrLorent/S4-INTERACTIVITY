import './MapCanvas.css'

import keplerGl from 'kepler.gl';
import {addDataToMap} from 'kepler.gl/actions';
import {keplerGlReducer} from 'kepler.gl/reducers';
import {taskMiddleware} from 'react-palm/tasks';
import {Provider, useDispatch} from 'react-redux';
import {applyMiddleware, combineReducers, createStore} from 'redux';

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
  return <div>I'm the map</div>
}