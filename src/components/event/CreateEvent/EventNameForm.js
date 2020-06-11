import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';

class EventNameForm extends React.Component {
    onEventNameChange = e =>{
        const eventName = e.currentTarget.value;
        this.props.eventNameChange(eventName);
    }
    render(){
        const {categorySports, categorySportId, eventName} = this.props;
        const categorySport = categorySports && categorySports.find((item) => {return item.id === categorySportId})
        return (
            <React.Fragment>
            <Typography variant="h6" align='center' gutterBottom>
                Название
            </Typography>
                
            <Grid>
                <Grid style={{margin: 'auto'}}>
                        <Avatar align='center' style={{margin: 'auto'}} src={categorySport.iconUrl}>
                            
                        </Avatar>
                        <Typography align='center' variant="subheading">
                            {categorySport.name}
                        </Typography>
                        <Typography align='center' variant="caption">
                            Придумайте Вашему событию имя, чтобы облегчить его поиск и выделить из списка
                        </Typography>
                    </Grid>
                <TextField required id='eventName' label='Введите название события' onChange={this.onEventNameChange} value={eventName} fullWidth/>
                </Grid>
            </React.Fragment>
        );
    }
}

export default EventNameForm;