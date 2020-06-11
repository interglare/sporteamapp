import React from 'react'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

class CreateEventInfo extends React.Component{
    render(){
        const {createEventIsSuccess} = this.props;
        return <React.Fragment>
                <Typography variant="h5" gutterBottom>
                 { createEventIsSuccess ? "Событие успешно создано" : "Создать событие не удалось" }
                </Typography>
                <Typography variant="subtitle1">
                { createEventIsSuccess ? "Нажмите чтобы вернуться на главную" : "Произошла ошибка на сервере, попробуйте заново или нажмите чтобы вернуться на главную" }
                </Typography>
                <Button color='primary' href='/' style={{alignItems: 'center'}}>На главную</Button>
      </React.Fragment>
    }
}

export default CreateEventInfo;