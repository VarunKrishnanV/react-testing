import React, { useState, useRef } from 'react';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import './cameratake.css'

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
            const element = document.documentElement;
            const requestMethod = element.requestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen || element.msRequestFullscreen;
            if (requestMethod) {
                requestMethod.call(element);
                setIsFullscreen(true);
            } else {
                alert('Fullscreen is not supported in this browser.');
            }
        } else {
            // Exit fullscreen mode
            const exitMethod = document.exitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen || document.msExitFullscreen;
            if (exitMethod) {
                exitMethod.call(document);
                setIsFullscreen(false);
            } else {
                alert('Fullscreen exit is not supported in this browser.');
            }
        }
    }

    function retakePhoto() {
        setCapturedImage(null); // Clear the captured image
    }

    return (
        <div className="camera-container">
            <div className="camera-preview">
                {capturedImage ? (
                    <div className="captured-image">
                        <img src={capturedImage} alt="Captured" />
                        <button onClick={retakePhoto}>Retake</button>
                    </div>
                ) : (
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
            </div>
            <div className="controls">
                <button className="control-button" onClick={toggleFacingMode}>
                    Switch Camera
                </button>
                <button className="control-button" onClick={toggleFullscreen}>
                    {isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
                </button>
            </div>
        </div>
    );
}

export default CameraTake;
