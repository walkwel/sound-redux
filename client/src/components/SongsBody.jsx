/* global window */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Loader from '../components/Loader';
import SongsBodyRendered from '../components/SongsBodyRendered';
import scrollState from '../utils/ScrollUtils';

const defaultProps = {
  playingSongId: null,
};

const propTypes = {
  authed: PropTypes.shape({}).isRequired,
  height: PropTypes.number.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  likes: PropTypes.shape({}).isRequired,
  navigateTo: PropTypes.func.isRequired,
  playingSongId: PropTypes.number,
  playlist: PropTypes.string.isRequired,
  playSong: PropTypes.func.isRequired,
  songs: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

class SongBody extends Component {
  constructor(props) {
    super(props);
    this.onScroll = this.onScroll.bind(this);

    this.state = scrollState(props.height, props.songs.length);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll, false);
  }

  componentWillReceiveProps(nextProps) {
    const { height, songs } = this.props;
    if (height !== nextProps.height || songs.length !== nextProps.songs.length) {
      this.setState(scrollState(nextProps.height, nextProps.songs.length));
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll() {
    const { height, songs } = this.props;
    this.setState(scrollState(height, songs.length));
  }

  render() {
    const {
      authed,
      isFetching,
      isPlaying,
      likes,
      navigateTo,
      playingSongId,
      playlist,
      playSong,
      songs,
    } = this.props;
    const { end, paddingBottom, paddingTop, start } = this.state;

    return (
      <div className="songs-body">
        <div className="songs-body__padder" style={{ height: `${paddingTop}px` }} />
        <SongsBodyRendered
          authed={authed}
          end={end}
          isPlaying={isPlaying}
          likes={likes}
          navigateTo={navigateTo}
          playingSongId={playingSongId}
          playlist={playlist}
          playSong={playSong}
          songs={songs}
          start={start}
        />
        <div className="songs-body__padder" style={{ height: `${paddingBottom}px` }} />
        <Loader className="loader--full" isLoading={isFetching} />
      </div>
    );
  }
}

SongBody.defaultProps = defaultProps;
SongBody.propTypes = propTypes;

export default SongBody;