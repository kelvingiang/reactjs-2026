import React from 'react';
import PropTypes from 'prop-types';

Album.propTypes = {
  album: PropTypes.object.isRequired,
};

function Album({ album }) {
  return (
    <div className="album_item">
      <div className="album_img">
        <img src={album.img} alt={album.title} />
      </div>
      <div className="album_title">
        <label className="txt_title">{album.title}</label>
        <div className="album_guide">
          <label>gioi thieu</label>
          <label>thoi gian phat hanh</label>
        </div>
      </div>
    </div>
  );
}

export default Album;
