import React from 'react';
import Album from '../album';
import './list-style.scss';

function AlbumList({ albumList = [],   bg = "#e2e2e2" }) {
  return (
    <div className="album_list" style={{ background:bg }}>
      {albumList.map((item) => (
        <div key={item.id}>
          <Album key={item.id} album={item} />
        </div>
      ))}
    </div>
  );
}


export default AlbumList;
