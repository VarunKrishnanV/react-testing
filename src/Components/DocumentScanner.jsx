import React, { useState } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const DocumentScanner = ({ src }) => {
    const [crop, setCrop] = useState({ aspect: 16 / 9 });

    return (
        <div>
            <ReactCrop
                src={src}
                crop={crop}
                onChange={newCrop => setCrop(newCrop)}
            />
            {/* Add a button to get the cropped image */}
        </div>
    );
};

export default DocumentScanner;
