import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { firestoreConnect } from 'react-redux-firebase';

const styles = theme =>({
    titleNews:{
        backgroundColor: '#0000',
        fontSize: 'larger',
    },
    [theme.breakpoints.down('sm')]: {
        imageNews: {
            height: '300px',
            objectFit: 'cover'
        }
    },
    [theme.breakpoints.up('md')]: {
        imageNews: {
            height: '400px',
            objectFit: 'cover'
        }
    },
})
class CarouselMain extends Component {
  render() {
      const {news, classes} = this.props;
    return (

      <div ><br />
        <h2 style={{ fontWeight: '400' }}>ПОСЛЕДНИЕ НОВОСТИ</h2>
        <Carousel showArrows={true} autoPlay={true} showThumbs={false} dynamicHeight={false} useKeyboardArrows={true} swipeable={true} emulateTouch={true} showStatus={false} infiniteLoop>
        {
            news && news.map(item =>{
                return <div key={item.id}>
                    <img src={item.images[0]} className={classes.imageNews} />
                    <p className='legend' style={{backgroundColor: '#0000', fontSize: 'larger'}}>{item.title}</p>
                </div>
            })
        }
        </Carousel>
      </div >
    );
  }
}

const mapStateToProps = (state) => {
    return {
        news: state.firestore.ordered.news,
    }
}

export default compose(
    withStyles(styles),
    connect(mapStateToProps),
    firestoreConnect([
        {
            collection: 'news',
            orderBy: [
                ['datepublish', 'desc']
            ],
            limit: 5
        },
    ])
)(CarouselMain);