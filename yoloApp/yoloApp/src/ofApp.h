#pragma once

#include "ofMain.h"
#include "ofxDarknet.h"
#include "ofxOsc.h"

#define HOST "localhost"
#define PORT 3000

class ofApp : public ofBaseApp
{
public:

	void setup();
	void update();
	void draw();
	void keyPressed(int key);
	void osc_sendMsg(string object, float pos_x);
	void reset();

	ofxDarknet darknet;
	ofxDarknet custom_darknet;

	ofVideoGrabber video;
	ofImage image;
	float thresh;
	float maxOverlap;

	int stable_count;
	int lose_object_count;
	string current_frame_object;
	string last_frame_object;
	bool load_shader;

	ofxOscSender sender;
};
