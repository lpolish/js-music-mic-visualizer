document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const startButton = document.getElementById('startButton');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  let visualizationType = 0;
  let isOnFullScreenState = false;

  const selectorDiv = document.getElementById('selector');
  const selector = document.createElement('select');
  for (let i = 0; i < 12; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.text = `Visualization ${i + 1}`;
    selector.appendChild(option);
  }
  selector.style.position = 'absolute';
  selector.style.right = '10px';
  selector.style.bottom = '10px';
  selector.style.backgroundColor = '#fff';
  selector.style.border = '1px solid #000';
  selectorDiv.appendChild(selector);

  selector.addEventListener('change', (e) => {
    visualizationType = parseInt(e.target.value);
  });

  // Read the cookie for the last selected visualization type
  const savedVisualizationType = getCookie('visualizationType');
  if (savedVisualizationType) {
    visualizationType = parseInt(savedVisualizationType);
    selector.value = savedVisualizationType; // Set the selector to the saved value
  }

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  window.addEventListener('dblclick', () =>{
    // Double click to skip to next visualization (commented lines)
    // visualizationType == 11 ? (visualizationType = 0) : visualizationType++;
    // selector.value = visualizationType;

    // Double click to toggle full screen (comment them if you want above otherwise)
    let documentElement = document.documentElement;

    if(documentElement.requestFullscreen){
      isOnFullScreenState ? document.exitFullscreen() : documentElement.requestFullscreen();
      isOnFullScreenState = !isOnFullScreenState;
    }
    else if (documentElement.msRequestFullscreen){
      isOnFullScreenState ? document.msExitFullscreen() : documentElement.msRequestFullscreen();
      isOnFullScreenState = !isOnFullScreenState;
    }
    else if(documentElement.mozRequestFullscreen){
      isOnFullScreenState ? document.mozExitFullscreen() : documentElement.mozRequestFullscreen();
      isOnFullScreenState = !isOnFullScreenState;
    }
    else if(documentElement.webkitRequestFullscreen){
      isOnFullScreenState ? document.webkitExitFullscreen() : documentElement.webkitRequestFullscreen();
      isOnFullScreenState = !isOnFullScreenState;
    }

  })

  startButton.addEventListener('click', () => {
    startButton.style.display = 'none';
    const audioContext = new AudioContext();
    let audioAnalyser;

    function requestMicAccess() {
      navigator.mediaDevices.getUserMedia({ audio: true, video: false })
        .then(stream => {
          const source = audioContext.createMediaStreamSource(stream);
          audioAnalyser = audioContext.createAnalyser();
          audioAnalyser.fftSize = 512;
          source.connect(audioAnalyser);
          visualize();
        })
        .catch(err => console.log('Microphone access denied:', err));
    }

    function visualize() {
      const bufferLength = audioAnalyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      function draw() {
        requestAnimationFrame(draw);
        audioAnalyser.getByteFrequencyData(dataArray);
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        switch (visualizationType) {
          case 0:
            visualization0(ctx, dataArray, bufferLength, canvas);
            break;
          case 1:
            visualization1(ctx, dataArray, bufferLength, canvas);
            break;
          case 2:
            visualization2(ctx, dataArray, bufferLength, canvas);
            break;
          case 3:
            visualization3(ctx, dataArray, bufferLength, canvas);
            break;
          case 4:
            visualization4(ctx, dataArray, bufferLength, canvas);
            break;
          case 5:
            visualization5(ctx, dataArray, bufferLength, canvas);
            break;
          case 6:
            visualization6(ctx, dataArray, bufferLength, canvas);
            break;
          case 7:
            visualization7(ctx, dataArray, bufferLength, canvas);
            break;
          case 8:
            visualization8(ctx, dataArray, bufferLength, canvas);
            break;
          case 9:
            visualization9(ctx, dataArray, bufferLength, canvas);
            break;
          case 10:
            visualization10(ctx, dataArray, bufferLength, canvas);
            break;
          case 11:
            visualization11(ctx, dataArray, bufferLength, canvas);
            break;
        }
      }
      draw();
    }

    requestMicAccess();
  });

  // Visualization functions

  function visualization0(ctx, dataArray, bufferLength, canvas) {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Clear previous drawing to avoid artifacts in the animation
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Use a changing radius to create more dynamic movement
    const radius = dataArray[0] + 20 * Math.sin(dataArray[0] / 10);

    // Create a gradient that will change with the data to add a psychedelic effect
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
    gradient.addColorStop(0, `hsl(${dataArray[2]}, 100%, 50%)`);
    gradient.addColorStop(0.5, `hsl(${(dataArray[2] + 180) % 360}, 100%, 50%)`);
    gradient.addColorStop(1, `hsl(${dataArray[2]}, 100%, 50%)`);

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = gradient;
    ctx.fill();
  }

  function visualization1(ctx, dataArray, bufferLength, canvas) {
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);

    // Control variables for added creativity
    const frequency = 0.1;
    const amplitude = 50;

    for (let i = 0; i < bufferLength; i++) {
      // Add a wave effect to the y-value
      const y = Math.sin(i * frequency + dataArray[i]) * amplitude * Math.sin(i / 10) + canvas.height / 2;
      ctx.lineTo(i * (canvas.width / bufferLength), y);
    }

    // Create a gradient that shifts with the data for a dynamic effect
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, `hsl(${dataArray[0] % 360}, 100%, 50%)`);
    gradient.addColorStop(0.5, `hsl(${(dataArray[0] + 120) % 360}, 100%, 50%)`);
    gradient.addColorStop(1, `hsl(${(dataArray[0] + 240) % 360}, 100%, 50%)`);

    ctx.strokeStyle = gradient;
    ctx.lineWidth = 2; // Increase line width for more visible effect
    ctx.stroke();
  }

  function visualization2(ctx, dataArray, bufferLength, canvas) {
    ctx.beginPath();

    const spirals = 10;
    const frequency = 0.12;
    const amplitude = 7;

    for (let i = 0; i < 360 * spirals; i++) {
      const angle = 0.1 * i;
      const waveEffect = amplitude * Math.sin(angle * frequency);
      const r = angle + waveEffect;
      const x = r * Math.cos(angle + dataArray[0]) + canvas.width / 2;
      const y = r * Math.sin(angle + dataArray[0]) + canvas.height / 2;

      ctx.lineTo(x, y);
    }

    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, `hsl(${dataArray[3] % 360}, 100%, 50%)`);
    gradient.addColorStop(0.5, `hsl(${(dataArray[3] + 180) % 360}, 100%, 50%)`);
    gradient.addColorStop(1, `hsl(${(dataArray[3] + 360) % 360}, 100%, 50%)`);

    ctx.strokeStyle = gradient;
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  function visualization3(ctx, dataArray, bufferLength, canvas) {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Parameters for the lines
    const lines = 33;
    const segments = 100;
    const frequency = 0.1;

    // Iterate through the lines
    for (let i = 0; i < lines; i++) {
      ctx.beginPath();

      // Dynamic amplitude based on audio data
      const amplitude = 30 + dataArray[i % bufferLength] / 2;

      // Iterate through the segments of each line
      for (let j = 0; j < segments; j++) {
        const x = (canvas.width / segments) * j;
        const y = canvas.height / 2 + amplitude * Math.sin(j * frequency + i + dataArray[i % bufferLength] / 5);

        if (j === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      // Apply dynamic gradient based on audio data
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop(0, `hsl(${i * 10 + dataArray[3] % 360}, 100%, 50%)`);
      gradient.addColorStop(1, `hsl(${(i * 10 + 180 + dataArray[3]) % 360}, 100%, 50%)`);

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }

  function visualization4(ctx, dataArray, bufferLength, canvas) {
    // Clear the canvas with a black background
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Define the center of the canvas
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Create a series of overlapping shapes based on audio data
    for (let i = 0; i < bufferLength; i++) {
      const angle = (2 * Math.PI / bufferLength) * i;
      const radius = 20 + dataArray[i];
      const x = centerX + radius * Math.sin(angle * 3 + dataArray[i] / 50);
      const y = centerY + radius * Math.cos(angle * 3 + dataArray[i] / 50);

      // Define the gradient based on the current angle and audio data
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, `hsl(${angle * 180 / Math.PI + dataArray[i]}, 100%, 50%)`);
      gradient.addColorStop(1, `hsl(${(angle * 180 / Math.PI + dataArray[i] + 180) % 360}, 100%, 25%)`);

      // Draw a shape using a combination of arcs and lines
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.arc(x, y, radius, angle, angle + Math.PI / 3);
      ctx.lineTo(x, y);
      ctx.closePath();

      ctx.fillStyle = gradient;
      ctx.fill();
    }
  }

  function visualization5(ctx, dataArray, bufferLength, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const frequency = 0.05;
    const amplitude = 20;

    for (let i = 0; i < bufferLength; i++) {
      const x = (canvas.width / bufferLength) * i;
      const y = canvas.height - dataArray[i];
      const offset = Math.sin((i * frequency) + (dataArray[5] || 0)) * amplitude;
      const hue = (i * 10 + dataArray[5] * 5) % 360;

      ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
      ctx.fillRect(x, y + offset, canvas.width / bufferLength, dataArray[i]);
    }
  }

  function visualization6(ctx, dataArray, bufferLength, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const x = canvas.width / 2;
    const y = canvas.height / 2;
    const frequency = 0.02;
    const amplitude = 20;
    const spiralRate = 0.05;

    for (let i = 0; i < bufferLength; i++) {
      ctx.beginPath();
      ctx.moveTo(x, y);

      const angle = (2 * Math.PI / bufferLength) * i + Math.sin(i * frequency + (dataArray[6] || 0)) * amplitude;
      const length = dataArray[i] * 2 * (1 + Math.sin(i * spiralRate + (dataArray[6] || 0)) * 0.5);

      ctx.lineTo(x + length * Math.cos(angle), y + length * Math.sin(angle));

      const hue = (i * 20 + dataArray[6] * 10) % 360;

      ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }

  function visualization7(ctx, dataArray, bufferLength, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const frequency = 0.03;
    const amplitude = 10;
    const rotations = 5;

    ctx.beginPath();

    for (let i = 0; i < 360 * rotations; i++) {
      const angle = 2 * Math.PI * i / 360;
      const r = dataArray[i % bufferLength] + amplitude * Math.sin(i * frequency);
      const x = centerX + r * Math.cos(angle);
      const y = centerY + r * Math.sin(angle);

      ctx.lineTo(x, y);

      const hue = (i * 20 + dataArray[7] * 10) % 360;
      ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y);
    }

    ctx.closePath();
  }

  function visualization8(ctx, dataArray, bufferLength, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const rotations = 4;
    const spirals = 8;
    const frequency = [0.01, 0.02, 0.03, 0.04];
    const amplitude = [10, 20, 30, 40];
    const phaseShift = dataArray[8] || 0;

    for (let i = 0; i < 360 * rotations; i++) {
      ctx.beginPath();

      const angle = (2 * Math.PI * i) / 360;

      for (let j = 0; j < spirals; j++) {
        const r = dataArray[i % bufferLength]
          + amplitude[j] * Math.sin(i * frequency[j] + phaseShift)
          + amplitude[(j + 1) % 4] * Math.cos(i * frequency[(j + 1) % 4] + phaseShift);

        const x = centerX + r * Math.cos(angle * (j + 1));
        const y = centerY + r * Math.sin(angle * (j + 1));

        ctx.lineTo(x, y);

        const hue = (i * 20 + dataArray[j + 1] * 10) % 360;
        ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      ctx.closePath();
    }

    drawPsychedelicCircles(ctx, dataArray, bufferLength, canvas);
  }

  function drawPsychedelicCircles(ctx, dataArray, bufferLength, canvas) {
    const numberOfCircles = 10;
    const frequency = 0.02;
    const amplitude = 30;

    for (let i = 0; i < numberOfCircles; i++) {
      ctx.beginPath();

      const radius = dataArray[i % bufferLength] + amplitude * Math.sin(i * frequency);
      const x = canvas.width / 2 + dataArray[i] * Math.cos(i);
      const y = canvas.height / 2 + dataArray[i] * Math.sin(i);

      ctx.arc(x, y, radius, 0, 2 * Math.PI);

      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, `hsl(${i * 40}, 100%, 75%)`);
      gradient.addColorStop(0.5, `hsl(${(i * 40 + 120) % 360}, 100%, 50%)`);
      gradient.addColorStop(1, 'black');

      ctx.fillStyle = gradient;
      ctx.fill();
      ctx.closePath();
    }
  }

  function visualization9(ctx, dataArray, bufferLength, canvas) {
    // Clear the canvas with a black background
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Parameters for the pattern
    const rows = 20;
    const cols = 20;
    const cellWidth = canvas.width / cols;
    const cellHeight = canvas.height / rows;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const index = row * cols + col;
        const value = dataArray[index] / 2;

        const x = col * cellWidth;
        const y = row * cellHeight;

        const hue = (index * 10 + value * 2) % 360;
        ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;

        ctx.fillRect(x, y, cellWidth, cellHeight);
      }
    }
  }

  function visualization10(ctx, dataArray, bufferLength, canvas) {
    // Clear the canvas with a black background
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Parameters for the pattern
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const maxRadius = Math.min(centerX, centerY);
    const step = Math.PI / 20;

    ctx.beginPath();

    for (let angle = 0; angle < Math.PI * 2; angle += step) {
      const radius = maxRadius + dataArray[0] * Math.sin(angle * 10);

      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      const hue = (angle * 50 + dataArray[0] * 5) % 360;
      ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;

      ctx.fillRect(x, y, 5, 5);
    }

    ctx.closePath();
  }

  function visualization11(ctx, dataArray, bufferLength, canvas) {
    // Clear the canvas with a black background
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Parameters for the pattern
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 20;
    const numCircles = 10;

    for (let i = 0; i < numCircles; i++) {
      const angle = (2 * Math.PI / numCircles) * i;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      const hue = (angle * 180 / Math.PI) % 360;
      const radiusOffset = dataArray[i] / 10;

      ctx.beginPath();
      ctx.arc(x, y, radius + radiusOffset, 0, 2 * Math.PI);
      ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }



  function getCookie(name) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
});
