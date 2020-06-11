import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';

class AreaNameForm extends React.Component {
    onAreaNameChange = e =>{
        const areaName = e.currentTarget.value;
        this.props.areaNameChange(areaName);
    }
    render(){
        const {areaName} = this.props;
        return (
            <React.Fragment>
                <Typography variant="h6" align='center' gutterBottom>
                    Название
            </Typography>

                <Grid>
                    <Grid style={{ margin: 'auto' }}>
                    </Grid>
                    <TextField required id='areaName' label='Введите название площадки' onChange={this.onAreaNameChange} value={areaName} fullWidth />
                </Grid>
            </React.Fragment>
        );
    }
}

export default AreaNameForm;