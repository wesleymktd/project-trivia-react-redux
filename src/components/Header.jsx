import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { actionPictureGravatar } from '../redux/actions';

class Header extends Component {
  hashGravatar = () => {
    const { email, dispatch } = this.props;
    const hash = md5(email).toString();
    const url = `https://www.gravatar.com/avatar/${hash}`;
    dispatch(actionPictureGravatar(url));
    return url;
  };

  render() {
    const { name, score } = this.props;
    return (
      <div>
        <img
          data-testid="header-profile-picture"
          alt="gravatar"
          src={ this.hashGravatar() }
        />
        <h3 data-testid="header-player-name">{ name }</h3>
        <h3 data-testid="header-score">{ score }</h3>

      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Header);
