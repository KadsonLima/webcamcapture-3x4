import React, { useRef } from 'react';
import Webcam from 'react-webcam';
import html2canvas from 'html2canvas';

const App = () => {
  const webcamRef = useRef(null);

  const capturePhoto = async () => {
    const webcamElement = webcamRef.current.video;

    // Obter o quadro atual da webcam usando html2canvas
    const canvas = await html2canvas(webcamElement);

    // Redimensionar a imagem para o formato 3x4
    const resizedCanvas = document.createElement('canvas');
    const resizedContext = resizedCanvas.getContext('2d');
    resizedCanvas.width = 3 * canvas.height / 4;
    resizedCanvas.height = canvas.height;
    resizedContext.drawImage(
      canvas,
      (canvas.width - resizedCanvas.width) / 2,
      0,
      resizedCanvas.width,
      resizedCanvas.height,
      0,
      0,
      resizedCanvas.width,
      resizedCanvas.height
    );

    // Obter a imagem no formato base64
    const imageSrc = resizedCanvas.toDataURL('image/jpeg');

    // Abrir a imagem em uma nova guia para download
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = 'photo.jpg';
    link.click();
  };

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <div style={{ width: '300px', height: '400px' }}>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{ width: 300, height: 400 }} // Define as dimensões do vídeo
        style={{ objectFit: 'cover', width: '100%', height: '100%' }} // Redimensiona o preview para preencher o elemento pai
    
      />
      <button onClick={capturePhoto}>Tirar Foto</button>
    </div>
    </div>
  );
};

export default App;
