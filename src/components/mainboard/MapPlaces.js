import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { YMaps, Map, GeoObject, Clusterer, Placemark, ObjectManager } from 'react-yandex-maps';

function TabContainer(props) {
    return (
        <Typography component="div">
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
});

class MapPlaces extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes, points, areas, events } = this.props;
        const { value } = this.state;
        const defaultLocation = {
            center: [51.132435, 71.404126],
            zoom: 12
        }
        const pointsAreas = areas && areas.filter(area => area.location.latitude != '').map(area => ({
            type: 'Feature',
            id: area.id,
            geometry: {
                type: 'Point',
                coordinates: [area.location.latitude, area.location.longitude],
            },
            properties: {
                hintContent: `<strong>${area.location.address}</strong>`,
                ballonContent: `<strong>${area.name}</strong><br/>${area.location.address}`
            }
        }));
        const pointsEvents = events && events.filter(event => event.location.latitude != '').map(event => ({
            type: 'Feature',
            id: event.id,
            geometry: {
                type: 'Point',
                coordinates: [event.location.latitude, event.location.longitude],
            },
            properties: {
                hintContent: `<strong>${event.location.address}</strong>`,
                ballonContent: `<strong>${event.name}</strong><br />${event.location.address}`
            }
        }))

        return (
            <React.Fragment>
                <h2 style={{ fontWeight: '400' }} align="center" >ВСЕГДА РЯДОМ</h2>

                <AppBar position="static" style={{ color: 'black', backgroundColor: 'white' }} >
                    <Tabs value={value} onChange={this.handleChange} variant="fullWidth" indicatorColor="primary">
                        <Tab label="Мероприятия" />
                        <Tab label="Площадки" />
                    </Tabs>

                </AppBar>
                {value === 0 && <TabContainer>
                    <br />
                    <YMaps>
                        <Map width={'100%'} height={450} defaultState={defaultLocation}>
                            <ObjectManager
                                options={{
                                    clusterize: true,
                                    gridSize: 32,
                                }}
                                objects={{
                                    openBalloonOnClick: true,
                                    preset: 'islands#greenDotIcon',
                                }}
                                clusters={{
                                    preset: 'islands#redClusterIcons',
                                }}
                                defaultFeatures={pointsEvents}
                                modules={[
                                    'objectManager.addon.objectsBalloon',
                                    'objectManager.addon.objectsHint',
                                ]}
                            />
                        </Map>
                    </YMaps>
                </TabContainer>
                }
                {value === 1 && <TabContainer><br />
                    <YMaps>
                        <Map width={'100%'} height={450} defaultState={defaultLocation}>
                            <ObjectManager
                                options={{
                                    clusterize: true,
                                    gridSize: 32,
                                }}
                                objects={{
                                    openBalloonOnClick: true,
                                    preset: 'islands#greenDotIcon',
                                }}
                                clusters={{
                                    preset: 'islands#redClusterIcons',
                                }}
                                defaultFeatures={pointsAreas}
                                modules={[
                                    'objectManager.addon.objectsBalloon',
                                    'objectManager.addon.objectsHint',
                                ]}
                            />
                        </Map>
                    </YMaps>
                </TabContainer>
                }

            </React.Fragment>
        );
    }
}

MapPlaces.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MapPlaces);