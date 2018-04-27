# MagicMirror

Magic Mirror uses Yolo real-time object detection, web animation and transparent LCD. When you put an object under the camera, Yolo detects it and start to pull images real-time from Google based on the era of that object and show them on the screen.

## Video


## How to use
* Go to yoloApp folder and compile the project.
* Go to web_interface folder and start server.py
* In browser, go to 127.0.0.1:5000. Toggle fullscreen.

## Object Detection
### Yolo App
I'm doing this on Windows and would recommend Visual Studio 2015 because ofxDarknet is using CUDA 8.0 and there's no official announce that it supports VS 2017.

### Dependencies
* ofxDarknet
* ofxOpenCV
* ofxOsc

### How to configure Yolo on Windows and Visual Studio
* Requires nVidia GPU and CUDA.
* I used openFramework and [ofxDarknet](https://github.com/mrzl/ofxDarknet). Refer to the repo on setup.

### How to train your own model for custom objects
* I was mostly following [this tutorial](https://timebutt.github.io/static/how-to-train-yolov2-to-detect-custom-objects/) on how to prepare my own dataset, and also read a lot on the original [darknet repo](https://github.com/AlexeyAB/darknet) on training, when to stop training and how to make sense of all the parameters. I was doing Yolo2 but things are moving pretty fast.
* I trained 5 custom objects on my own. Weights file of my custom model are too big for github but can be downloaded [here](https://drive.google.com/open?id=1GfJvZICA189mMn_870l5hiDociMFAJrq). Put them under yoloApp/yoloApp/bin/data/final_obj.


## Web & Animation

### Python Server
A python server is set up to listen to OSC message sent from Yolo app (on the main thread). Upon getting a message, a different thread would starts to pull 100 images from the Internet based on the keyword using asyncio, and then tells the front-end to trigger the animation using SocketIO.

### Front-end Animation
Javascript motion graphics. I'm mostly using [mo.js](http://mojs.io/) and [GreenSock](https://greensock.com/) as my animation libraries.


