import React, { useState, useRef } from 'react';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

function CameraTake(props) {
    const [facingMode, setFacingMode] = useState(FACING_MODES.ENVIRONMENT);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null); // State to store the captured image
    const cameraRef = useRef(null);

    function handleTakePhoto(dataUri) {
        console.log('Photo taken:', dataUri);
        setCapturedImage(dataUri); // Store the captured image
    }

    function handleTakePhotoAnimationDone(dataUri) {
        console.log('Photo taken (animation done):', dataUri);
    }

    function handleCameraError(error) {
        console.error('Camera error:', error);
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
        if (!isFullscreen) {
            // Enter fullscreen mode
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) { /* Firefox */
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
                document.documentElement.webkitRequestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) { /* IE/Edge */
                document.documentElement.msRequestFullscreen();
            }
        } else {
            // Exit fullscreen mode
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) { /* Firefox */
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { /* IE/Edge */
                document.msExitFullscreen();
            }
        }
        setIsFullscreen((prevFullscreen) => !prevFullscreen);
    }

    function retakePhoto() {
        setCapturedImage(null); // Clear the captured image
    }

    return (
        <div>
            <div style={{ display: capturedImage ? 'block' : 'none' }}>
                <img src={capturedImage} alt="Captured" />
                <button onClick={retakePhoto}>Retake</button>
            </div>
            {!capturedImage && (
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
            )}
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
