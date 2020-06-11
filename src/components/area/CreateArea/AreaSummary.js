import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Info from '@material-ui/icons/InfoOutlined';
import Phone from '@material-ui/icons/LocalPhoneOutlined';
import QueryBuilder from '@material-ui/icons/QueryBuilderOutlined';
import Monetization from '@material-ui/icons/MonetizationOnOutlined';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ImageGrid from './ImageGrid';
import ImageUpload from './ImageUpload';
import ErrorSnackbar from './ErrorSnackbar';
import FileUpload from './FileUpload';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
    icon: {
        margin: theme.spacing.unit * 2,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
    chip: {
        margin: theme.spacing.unit,
    }
});

class AreaSummary extends React.Component {
    onAreaDescChange = e => {
        const areaDesc = e.currentTarget.value;
        this.props.areaDescChange(areaDesc);
    }
    onAreaPriceChange = e => {
        const areaPrice = e.currentTarget.value;
        this.props.areaPriceChange(areaPrice);
    }
    onAreaContactsChange = e => {
        const areaContacts = e.currentTarget.value;
        this.props.areaContactsChange(areaContacts);
    }
    onAreaWorktimeChange = e => {
        const areaWorktime = e.currentTarget.value;
        this.props.areaWorktimeChange(areaWorktime);
    }

    render() {
        const { classes, area, sportTypes, areaTypes, validateMsg } = this.props;
        const sports = sportTypes && sportTypes.filter((sportType) => area.areaSportTypes.find((item) => item.id == sportType.id) != undefined);
        const areaType = areaTypes && areaTypes.find((item) => item.id == area.areaTypeId);

        return (
            <div>
                <Typography variant="h5" align='center' gutterBottom>
                    Основная информация
            </Typography>

                <Typography variant="subtitle1" component="h3">
                    Виды спорта:
            </Typography>

                <Typography variant="subtitle1" style={{ fontWeight: '700', }}>
                    {
                        sports && sports.map((item) => {
                            return <Chip key={item.id} avatar={<Avatar src={item.iconUrl} />} label={item.name} className={classes.chip} />
                        })
                    }
                </Typography>

                <Typography variant="subtitle1" component="h3">
                    Название:
            </Typography>

                <Typography variant="subtitle1" style={{ fontWeight: '700', }}>
                    {area.name}
                </Typography>

                <Typography variant="subtitle1" component="h3">
                    Адрес площадки:
            </Typography>

                <Typography variant="subtitle1" style={{ fontWeight: '700', }}>
                    {area.location.address}
                </Typography>

                <Typography variant="subtitle1" component="h3">
                    Характеристики:
            </Typography>

                <Typography variant="subtitle1" style={{ fontWeight: '700', }}>
                    Тип площадки: {areaType && areaType.name}
                </Typography>
                <Typography variant="h6" align='center' gutterBottom>
                    Дополнительная информация
            </Typography>
                <Grid container spacing={8} alignItems="flex-end">
                    <Grid item>
                        <QueryBuilder />
                    </Grid>
                    <Grid item xs>
                        <TextField id="input-with-icon-grid" label="Режим работы (пн-пт 08:00-21:00)" onChange={this.onAreaWorktimeChange} value={area.worktime} fullWidth />
                    </Grid>
                </Grid>
                <Grid container spacing={8} alignItems="flex-end">
                    <Grid item>
                        <Phone />
                    </Grid>
                    <Grid item xs>
                        <TextField id="input-with-icon-grid" label="Контакты" onChange={this.onAreaContactsChange} value={area.contacts} fullWidth />
                    </Grid>
                </Grid>
                <Grid container spacing={8} alignItems="flex-end">
                    <Grid item>
                        <Monetization />
                    </Grid>
                    <Grid item xs>
                        <TextField id="input-with-icon-grid" label="Стоимость" onChange={this.onAreaPriceChange} value={area.price} fullWidth />
                    </Grid>
                </Grid>
                <Grid container spacing={8} alignItems="flex-end">
                    <Grid item>
                        <Info />
                    </Grid>
                    <Grid item xs>
                        <TextField id="input-with-icon-grid" label="Доп.информация" onChange={this.onAreaDescChange} value={area.description} fullWidth />
                    </Grid>
                </Grid>
                <Typography variant="h6" align='center' gutterBottom>
                    Прикрепленные файлы
                </Typography>
                <Grid container spacing={8} alignItems="flex-end">
                    <FileUpload />
                </Grid>
                <Typography variant="h6" align='center' gutterBottom>
                    Загрузите фотографии
                </Typography>
                <Grid container spacing={8} alignItems="flex-end">
                    <ImageUpload />
                </Grid>
                <Grid container spacing={8} alignItems="flex-end">
                    { validateMsg != '' ? <ErrorSnackbar msg={validateMsg} /> : ''}
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(AreaSummary);