import ImageHolder from './components/ImageHolder.js'

function App() {
  return (
    <div>
        <h1 style={{'text-align':'center'}}>Image Tracer</h1>
        <p>This is just a simple tool to put points on an image and get their pixel coordinates. It also tells you the image dimensions. This can be useful for tracing images or performing mathematical analysis.</p>
        <p>Controls:</p>
        <ul>
            <li>Left click: add a point to the trace</li>
            <li>Right click: remove the clicked point from the trace</li>
            </ul>
        <ImageHolder/>
    </div>
  );
}

export default App;
