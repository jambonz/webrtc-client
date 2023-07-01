# Build Project
```sh
npm i
npm run build
```

After successfully build, there is generated file dist/webrtc-widget.js
Copy this file to your project and use as normal HTML tag

```html
import './webrtc-widget/webrtc-widget'

 <div className="App">
    <webrtc-widget></webrtc-widget>
  </div>
```