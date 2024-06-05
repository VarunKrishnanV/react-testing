import React, { useState, useRef } from 'react';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

function CameraTake(props) {
    const [facingMode, setFacingMode] = useState(FACING_MODES.ENVIRONMENT);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const cameraRef = useRef(null);

    function handleTakePhoto(dataUri) {
        console.log('Photo taken:', dataUri);
    }

    function handleTakePhotoAnimationDone(dataUri) {
        console.log('Photo taken (animation done):', dataUri);
    }

    function handleCameraError(error) {
        console.error('Camera error:', error);
        // Handle specific errors that might occur on Android devices
        if (error.name === 'NotAllowedError') {
            alert('Camera access was denied. Please allow camera access.');
        } else if (error.name === 'NotReadableError') {
            alert('Could not access the camera. It might be in use by another application.');
        } else {
            alert(`Camera error: ${error.message}`);
        }
    }

    function handleCameraStart(stream) {
        console.log('Camera started');
    }

    function handleCameraStop() {
        console.log('Camera stopped');
    }

    function toggleFacingMode() {
        if (cameraRef.current) {
            cameraRef.current.stopCamera();
        }

        setFacingMode((prevMode) =>
            prevMode === FACING_MODES.ENVIRONMENT ? FACING_MODES.USER : FACING_MODES.ENVIRONMENT
        );
    }

    function toggleFullscreen() {
        setIsFullscreen((prevFullscreen) => !prevFullscreen);
    }

    return (
        <div>
            <Camera
                ref={cameraRef}
                onTakePhoto={handleTakePhoto}
                onTakePhotoAnimationDone={handleTakePhotoAnimationDone}
                onCameraError={handleCameraError}
                idealFacingMode={facingMode}
                idealResolution={{ width: 640, height: 480 }}
                imageType={IMAGE_TYPES.JPG}
                imageCompression={0.97}
                isMaxResolution={true}
                isImageMirror={false}
                isSilentMode={false}
                isDisplayStartCameraError={true}
                isFullscreen={isFullscreen}
                sizeFactor={1}
                onCameraStart={handleCameraStart}
                onCameraStop={handleCameraStop}
            />
            <button onClick={toggleFacingMode}>
                Switch Camera
            </button>
            <button onClick={toggleFullscreen}>
                {isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            </button>
        </div>
    );
}

export default CameraTake;
