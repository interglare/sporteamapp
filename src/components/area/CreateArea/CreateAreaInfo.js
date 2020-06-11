import React from 'react'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

class CreateAreaInfo extends React.Component{
    render(){
        const {createAreaIsSuccess} = this.props;
        return <React.Fragment>
                <Typography variant="h5" gutterBottom>
                 { createAreaIsSuccess ? "Площадка добавлена" : "Не удалось добавить площадку" }
                </Typography>
                <Typography variant="subtitle1">
                { createAreaIsSuccess ? "Нажмите чтобы вернуться на главную" : "Произошла ошибка на сервере, попробуйте заново или нажмите чтобы вернуться на главную" }
                </Typography>
                <Button color='primary' href='/' style={{alignItems: 'center'}}>На главную</Button>
      </React.Fragment>
    }
}

export default CreateAreaInfo;