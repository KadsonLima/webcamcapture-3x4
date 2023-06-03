import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import html2canvas from 'html2canvas';

const App = () => {
  const webcamRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);

  const capturePhoto = async () => {
    const webcamElement = webcamRef.current.video;

    // Obter o quadro atual da webcam usando html2canvas
    const canvas = await html2canvas(webcamElement);

    // Redimensionar a imagem para a proporção desejada
    const croppedCanvas = document.createElement('canvas');
    const croppedContext = croppedCanvas.getContext('2d');
    const aspectRatio = 3 / 4; // Proporção desejada (3:4)
    const canvasWidth = canvas.width;
    const canvasHeight = canvasWidth * aspectRatio;
    const startY = (canvas.height - canvasHeight) / 2;

    croppedCanvas.width = canvasWidth;
    croppedCanvas.height = canvasHeight;
    croppedContext.drawImage(canvas, 0, startY, canvasWidth, canvasHeight, 0, 0, canvasWidth, canvasHeight);

    // Obter a imagem no formato base64
    const imageSrc = croppedCanvas.toDataURL('image/jpeg');
    setPreviewImage(imageSrc);
  };

  const downloadPhoto = () => {
    const link = document.createElement('a');
    link.href = previewImage;
    link.download = 'photo.jpg';
    link.click();
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: '300px', height: '400px' }}>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{ width: 300, height: 400 }} // Define as dimensões do vídeo
          style={{ objectFit: 'cover', width: '100%', height: '100%' }} // Redimensiona o preview para preencher o elemento pai
        />
        <button onClick={capturePhoto}>Tirar Foto</button>
        {previewImage && (
          <>
            <img
              src={previewImage}
              alt="Preview"
              style={{ width: '100%', height: 'auto', marginTop: '10px', maxWidth: '300px', maxHeight: '400px' }}
            />
            <button onClick={downloadPhoto}>Baixar Foto</button>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
