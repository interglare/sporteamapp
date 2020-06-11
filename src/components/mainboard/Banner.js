import React from 'react';
import { Parallax } from 'react-parallax';
import Grid from '@material-ui/core/Grid';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

const styles = {
  textAlign: "center",
  color: '#fff'

};
const insideStyles = {
  padding: 20,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  width: "100%",


};
const image1 = "https://www.socialseo.com/wp-content/uploads/2018/10/iStock-826240410.jpg";

class Banner extends React.Component {
  render() {
      const{areas, sporttypes, events, users} = this.props;
    return <React.Fragment>
        <Parallax bgImage={image1} strength={100} style={styles}>
          <div style={{ height: 600 }}>
            <div style={insideStyles}>
            <h1 >УВЛЕКАЕМ СПОРТОМ</h1>
            <h3 style={{fontWeight: "normal"}}>Найди команду, общайся с единомышленниками, участвуй, наслаждайся...</h3>
            <Grid container spacing={16} alignItems="center"  style={{ marginTop: '20%' }}>
                <Grid item xs={6} sm={6} md={6} lg={3}>
                  {sporttypes && sporttypes.length} ВИДОВ СПОРТА
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={3}>
                  {users && users.length} УЧАСТНИКОВ
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={3}>
                  {areas && areas.length} ПЛОШАДОК
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={3}>
                  {events && events.length} МЕРОПРИЯТИЙ
                </Grid>
              </Grid>
            </div>
          </div>
        </Parallax>
    </React.Fragment>
  }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        events: state.firestore.ordered.events,
        areas: state.firestore.ordered.sportgrounds,
        sporttypes: state.firestore.ordered.categorySports,
        users: state.firestore.ordered.users,
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {
            collection: 'events',
        },
        {
            collection: 'sportgrounds',
        },
        {
            collection: 'categorySports',
        },
        {
            collection: 'users',
        },
    ])
)(Banner);