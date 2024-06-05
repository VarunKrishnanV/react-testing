import React, { useState } from 'react';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

function CameraTake(props) {
    const [facingMode, setFacingMode] = useState(FACING_MODES.ENVIRONMENT);

    function handleTakePhoto(dataUri) {
        // Process the photo data URI
        console.log('Photo taken:', dataUri);
    }

    function handleTakePhotoAnimationDone(dataUri) {
        // Process the photo data URI after the animation
        console.log('Photo taken (animation done):', dataUri);
    }

    function handleCameraError(error) {
        console.error('Camera error:', error);
    }

    function handleCameraStart(stream) {
        console.log('Camera started');
    }

    function handleCameraStop() {
        console.log('Camera stopped');
    }

    function toggleFacingMode() {
        setFacingMode((prevMode) =>
            prevMode === FACING_MODES.ENVIRONMENT ? FACING_MODES.USER : FACING_MODES.ENVIRONMENT
        );
    }

    return (
        <div>
            <Camera
                onTakePhoto={(dataUri) => { handleTakePhoto(dataUri); }}
                onTakePhotoAnimationDone={(dataUri) => { handleTakePhotoAnimationDone(dataUri); }}
                onCameraError={(error) => { handleCameraError(error); }}
                idealFacingMode={facingMode}
                idealResolution={{ width: 640, height: 480 }}
                imageType={IMAGE_TYPES.JPG}
                imageCompression={0.97}
                isMaxResolution={true}
                isImageMirror={false}
                isSilentMode={false}
                isDisplayStartCameraError={true}
                isFullscreen={false}
                sizeFactor={1}
                onCameraStart={(stream) => { handleCameraStart(stream); }}
                onCameraStop={() => { handleCameraStop(); }}
            />
            <button onClick={toggleFacingMode}>
                Switch Camera
            </button>
        </div>
    );
}

export default CameraTake;
