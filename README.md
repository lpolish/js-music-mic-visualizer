# 🎨🌀 Psychedelic Canvas Visualizations 🌀🎨

Embark on a transcendental journey through the cosmos with these mind-bending visualizations!

## 🌟 Visualizations Descriptions

### Visualization0
A dynamic and radiant circle that pulsates at the center of the canvas. Utilizing audio data, the circle's radius changes while producing a psychedelic gradient effect. The hues of the gradient shift with the data, creating a visually entrancing and colorful sphere.

### Visualization1
A flowing wave of color that dances across the canvas. The y-values of the wave respond to both frequency and amplitude, creating a sinuous pattern that resonates with the underlying data. A shifting gradient applied to the line's stroke enhances the wave's dynamism, resulting in a visualization that ebbs and flows with the rhythm.

### Visualization2
A complex and hypnotic spiral that spins through multiple revolutions. Control variables define the number, frequency, and amplitude of the spirals, which twist and turn in response to the audio data. The gradient effect, shifting dynamically with the data, further accentuates the spiral's mesmerizing form, making it a captivating visual journey.

### Visualization3
A mesmerizing starfield animation, with stars propelled by audio data, creating an immersive, space-like journey.

### Visualization4
A vibrant radial visualization pulsating to the rhythm. The circular pattern adapts to audio frequencies, showcasing a dazzling gradient of hues.

### Visualization5
An entrancing wave of color, moving in harmony with the sound. The abstract waves undulate with varying hues, resonating with the music's flow.

### Visualization6
A hypnotic spiral filled with color, motion, and geometric beauty. The intricate waves and spirals dance to the beat, forming an ever-changing visual spectacle.

### Visualization7
An abstract masterpiece, connecting the realms of imagination and design. Utilizing unique mathematical transformations, this visualization echoes the pulse and beat in artistic forms.

### Visualization8
A complex and extraordinary visualization, four times more intricate. With layered patterns, varied geometry, and whimsical effects, it is a visual feast promising to be as enigmatic as it is beautiful.

## 🚀 Getting Started

### Prerequisites
- Node.js v14 or higher
- Docker
- Docker Compose

### Running the Project

1. **Clone the Repository**

```bash
git clone https://github.com/your-username/psychedelic-visualizations.git
cd psychedelic-visualizations
```

2. **Build and Run the Docker Container**

```bash
docker-compose up --build
```

3. **Access the Application**
Open your browser and navigate to \`http://localhost:8000\`.

### Creating and Extending Visualizations

1. **Understand the Visualization Function**
   A visualization function follows the below signature:

```javascript
function visualizationX(ctx, dataArray, bufferLength, canvas) {
  // Your code here...
}
```
   - `ctx`: The 2D rendering context for drawing on the canvas.
   - `dataArray`: An array containing audio or visual data to be utilized in the visualization.
   - `bufferLength`: Length of the data buffer.
   - `canvas`: The canvas element, allowing access to properties like `width` and `height`.

2. **Create a New Visualization File**
   Create a new `.js` file inside the `visualizations` folder with the structure above.

3. **Implement Your Visualization Function**
   Utilize the parameters to create a unique visual effect. You can draw shapes, create gradients, manipulate paths, and more, using the canvas context (`ctx`).

4. **Include Your Function in the Main Script**
   Import and add your function to the main rendering loop.

5. **Style and Customize**
   Experiment with colors, shapes, and dynamics to make your visualization unique. Play with the values in `dataArray` to see how they affect the output.

### 🛠️ More on Extending Visualizations

Interested in creating your own visualizations? Check out the detailed guide in [EXTENDVISUALIZATIONS.md](EXTENDVISUALIZATIONS.md) to learn how to create and add new visualizations to the project. Dive into code examples and technical insights to unleash your creativity!

## 📜 License
Copyright (c) 2023 Luis Pulido Diaz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## ✌️ Acknowledgements
### Luis Pulido Diaz <hello@luispulido.com>
### ChatGPT v4 <privacy@openai.com>

## Singleton Pattern for Visualizations

In this version of the project, all visualizations are consolidated into a Singleton class within the `main.js` file. This pattern ensures that there is only one instance of the visualizations class, providing a global point of access.

To extend or modify visualizations, refer to the `main.js` file and follow the guidelines in the `EXTENDING_VISUALIZATIONS.md` file.
