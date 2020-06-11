import React from 'react';
import EventCard from './EventCard';
import { Grid } from '@material-ui/core';

class EventsGrid extends React.Component {
    render() {
        const { events } = this.props;

        return <React.Fragment>
            <h2 style={{ fontWeight: '400' }}>БЛИЖАЙШИЕ МЕРОПРИЯТИЯ</h2>

            <Grid container spacing={24}>
                {
                    events && events.map((item) => {
                        return <Grid key={item.id} item xs={12} sm={6} md={6} lg={3}>
                            <EventCard
                                event={item}
                            />
                        </Grid>
                    })
                }
            </Grid>
        </React.Fragment>
    }
}
export default EventsGrid;