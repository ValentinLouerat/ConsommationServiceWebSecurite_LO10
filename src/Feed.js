// on importe React
import React from 'react';
// import bibliothèque Moment > horodatage
import moment from 'moment';
import 'moment/locale/fr';
// import BlankTweet
import BlankTweet from './BlankTweet.js';
// import uuid > universal unique identifier
import {v4 as uuid} from 'uuid';

// lien vers notre API
const API = 'http://cuicui.local:5984/';

// après erreur : 'Feed' is not defined, on définit Feed
class Feed extends React.Component {

  state = {
    tweets: []
  };

  render() {
    let tweets = this.state.tweets.map(x =>
      <Tweet key={x._id} data={x} />
    );
    return (
      <main>
        {tweets}
        <BlankTweet postTweet={this.postTweet} />
      </main>
    );
  }

  // on récup les tweets
  fetchTweets = () => fetch(API)
    .then(x => x.json())
    .then(x => x.rows.map(y => y.doc))
    .then(x => this.setState({tweets: x}));

  componentDidMount() {
    this.fetchTweets();
  }

  // création d'un tweet
  postTweet = (user, text) => {
    let newTweet = {user, text};
    fetch(API + uuid(), {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newTweet)
    })
    .then(this.fetchTweets)
    .catch(this.fetchTweets)
    /* le setState par rapport au then : Montrer l'effet de l'action avant
    d'avoir reçu la réponse de la requête donne l'impression d'une application
    plus réactive. */
    this.setState({tweets: [newTweet].concat(this.state.tweets)});
  }

}

function Tweet(props) {
  let {user, text, created_at} = props.data;
  // pour reformer l'horodatage
  created_at = moment(created_at).fromNow();
  return (
    <article className="tweet">
      <div className="user"> {user} </div>
      <div className="timestamp"> {created_at} </div>
      <div className="text"> {text} </div>
    </article>
  );
}

//  exporter pour pouvoir être importé depuis App.js
export default Feed;
