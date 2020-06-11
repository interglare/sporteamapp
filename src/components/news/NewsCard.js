import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import 'moment/locale/ru';
import history from '../layout/history';

const styles = {
    card: {
        position: 'relative',
    },
    overlay: {
        position: 'absolute',
        top: '100px',
        left: '20px',
        color: 'white',
        textShadow: "1px 1px 1px black",
        fontSize: 18,

    }
}
class NewsCard extends React.Component {
    handleCardClick = (e) => {
        history.push('/news/' + e.currentTarget.id);
    }
    render() {
        const { news } = this.props;
        const loaderPic = "https://thumbs.gfycat.com/ArcticWarmBettong-max-1mb.gif";

        return ( 
            <Card style={styles.card}>
                <CardActionArea id={news && news.id} onClick={this.handleCardClick}>
                    <div style={{
                        height: '200px',
                        overflow: 'hidden',
                    }}>
                        <CardMedia
                            style={styles.media}
                            image={news == null ? loaderPic : news.images[0]}
                            component="img"
                            alt="Sport Calendar Image"
                        />
                    </div>
                    <CardContent>
                        <Typography variant="inherit" noWrap>
                            <b>{news && news.title}</b>
                        </Typography>
                        <Typography variant="inherit" noWrap>
                            { news && moment(news.datepublish.toDate()).locale('ru').format('MMM Do, h:mm')}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        );
    }
}

export default withStyles(styles)(NewsCard)