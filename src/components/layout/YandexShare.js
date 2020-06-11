import React, { Component } from 'react';

class YandexShare extends Component {
  componentDidMount() {
    var yaShare = this.refs.yaShare
    var url = window.location.href;
    if (window.Ya != undefined){
        var share = window.Ya.share2(yaShare, {
            content: {
                url: url,
                title: `Sport Calendar`,
                description: `Спортивный календарь`,
                image: 'https://yastatic.net/morda-logo/i/logo.svg'
            },
            theme: {
                counter: false,
                size: 'm'
            }
        });
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <div className="ya-share2" data-counter='' ref='yaShare' data-services="vkontakte,facebook,whatsapp,telegram"></div>
  }
}

export default YandexShare;