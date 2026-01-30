import React from 'react';
import AlbumList from './components/albumList';

AlbumFeature.propTypes = {

};

function AlbumFeature(props) {
    const albumList = [
        {
            id: 1,
            title: 'Nhạc Âu Mỹ Bất Hủ',
            img: 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/0/c/9/4/0c94ea68c20d5cc9f57eb9899ee2192f.jpg'
        },
        {
            id: 2,
            title: 'Chỉ Có Thể Là Mariah Carey',
            img: 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/7/5/3/f/753f0125c8b5c49e8c9f76e4713baff7.jpg'
        },
        {
            id: 3,
            title: 'Chỉ Có Thể Là Westlife',
            img: 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/4/2/e/c/42ec2cdc245e8b405317090fd5b7dd23.jpg'
        },
        {
            id: 4,
            title: 'Nhóm Nhạc Âu Mỹ Bất Hủ',
            img: 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/1/7/a/6/17a63fadf1c716685a6fba1ca9639914.jpg'
        },
    ]
    return (
        <div>
            <AlbumList albumList={albumList} />
        </div>
    );
}

export default AlbumFeature;