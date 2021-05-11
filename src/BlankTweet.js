import React from 'react';

// Composant permettant d'ajouter des tweets
class BlankTweet extends React.Component {

  state = {
    user: '',
    text: ''
  };

  handleChangeUser = (event) => this.setState({user: event.target.value});

  handleChangeText = (event) => this.setState({text: event.target.value});

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.postTweet(this.state.user, this.state.text);
    this.setState({user: '', text: ''});
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input placeholder="Qui êtes-vous ?" value={this.state.user}
          onChange={this.handleChangeUser}
        />
        <input placeholder="Quoi de neuf ?" value={this.state.text}
          onChange={this.handleChangeText}
        />
        <button type="submit">Publier</button>
      </form>
    );
  }

}

export default BlankTweet;
