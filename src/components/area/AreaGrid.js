import React from 'react';
import AreaCard from './AreaCard';
import { Grid } from '@material-ui/core';

class AreaGrid extends React.Component {

    render() {
        const { areas } = this.props;
        return <React.Fragment>
            <h2 style={{ fontWeight: '400' }}>ПОПУЛЯРНЫЕ ПЛОЩАДКИ</h2>

            <Grid container spacing={24}>
                {
                    areas && areas.map((item) => {
                        return <Grid key={item.id} item xs={12} sm={6} md={6} lg={3}>
                            <AreaCard area={item} />
                        </Grid>
                    })
                }
            </Grid>
        </React.Fragment>
    }
}
export default AreaGrid;