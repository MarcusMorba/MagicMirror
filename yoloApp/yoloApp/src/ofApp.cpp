#include "ofApp.h"

using namespace std;

void ofApp::setup()
{
	/***** 9000 objects ******/
	//string cfgfile1 = ofToDataPath("cfg/yolo9000.cfg");
	//string weightfile1 = ofToDataPath("yolo9000.weights");
	//string namesfile1 = ofToDataPath("cfg/9k.names");
	//darknet.init(cfgfile1, weightfile1, namesfile1);

	/***** 4 custom objects*****/
	string cfgfile2 = ofToDataPath("4_obj/custom_obj.cfg");
	string weightfile2 = ofToDataPath("4_obj/custom_obj.weights");
	string namesfile2 = ofToDataPath("4_obj/custom_obj.names");
	darknet.init(cfgfile2, weightfile2, namesfile2);

	/***** 23 objects ******/
	/*string cfgfile1 = ofToDataPath("cfg/yolo-voc.2.0-custom.cfg");
	string weightfile1 = ofToDataPath("yolo-voc_3000.weights");
	string namesfile1 = ofToDataPath("cfg/voc.names");
	darknet.init(cfgfile1, weightfile1, namesfile1);*/


	video.setDeviceID(0);
	video.setDesiredFrameRate(30);
	video.initGrabber(640, 480);

	thresh = 0.3;
	maxOverlap = 0.25; 	// if a detected object overlaps >maxOverlap with another detected
						// object with a higher confidence, it gets omitted

	load_shader = false;
	stable_count = 0;
	lose_object_count = 0;

	sender.setup(HOST, PORT);
	ofSetFrameRate(10);
}

void ofApp::update()
{

	video.update();

	// detected objects with confidence < threshold are omitted
	//thresh = ofMap(ofGetMouseX(), 0, ofGetWidth(), 0, 1);
}

void ofApp::draw()
{
	
	ofSetColor(255);
	video.draw(0, 0);

	if (video.isFrameNew()) {
		vector< detected_object > detections = darknet.yolo(video.getPixels(), thresh, maxOverlap);
		ofPoint rect_center; 

		for (detected_object d : detections) {
			ofSetColor(d.color);
			glLineWidth(ofMap(d.probability, 0, 1, 0, 8));
			ofNoFill();
			ofDrawRectangle(d.rect);
			ofDrawBitmapStringHighlight(d.label + ": " + ofToString(d.probability), d.rect.x, d.rect.y + 20);

			rect_center = d.rect.getCenter();
			//ofFill();
			//ofCircle(rect_center, 8);
		}

		if (detections.size() == 1) {
			lose_object_count = 0;
			current_frame_object = detections[0].label;

			if (current_frame_object == last_frame_object) stable_count++;
			else {
				// at the very beginning last_frame_object is empty
				// or when the object has changed
				stable_count = 0;
				last_frame_object = current_frame_object;
			}
			if (stable_count == 10)	osc_sendMsg(current_frame_object, rect_center.x);

		}
		else {
			//the camera might lose the object for a few frame and than catch it up again
			//better to rule out that kind of glitch
			lose_object_count++;

			//if the camera loses the object for more than 10 frames, than we're sure it's not there
			if (lose_object_count == 15) {
				osc_sendMsg("stop", 0.);
				stable_count = 0;
				last_frame_object = "";
			}
		}
	}
	ofDrawBitmapStringHighlight("stable_count: " + ofToString(stable_count), 660, 20);
	ofDrawBitmapStringHighlight("lose_object_count: " + ofToString(lose_object_count), 660, 50);
	ofDrawBitmapStringHighlight("last_frame_object: " + last_frame_object, 660, 80);
	ofDrawBitmapStringHighlight("detect_threshold: " + ofToString(thresh), 660, 100);
	ofDrawBitmapStringHighlight("fps: " + ofToString(ofGetFrameRate()), 900, 700);
}

void ofApp::osc_sendMsg(string object, float pos_x) {
	ofxOscMessage m;
	if (object == "stop") {
		m.setAddress("/stop_animation");
		load_shader = false;
		cout << "stop animation\t" + ofToString(ofGetFrameNum()) << endl;

	}
	else {
		m.setAddress("/start_animation");
		m.addStringArg(object);
		m.addFloatArg(pos_x);
		load_shader = true;
		cout << "start animation: " << object << "\t" + ofToString(ofGetFrameNum()) << endl;
	}
	sender.sendMessage(m);

}

void ofApp :: reset() {
	stable_count = 0;
	lose_object_count = 0;
	current_frame_object = "";
	last_frame_object = "";
}

// For Debugging
void ofApp::keyPressed(int key){
	if (key == 'r') {
		reset();
	}
	if (key == 's') {
		ofxOscMessage m;
		m.setAddress("/stop_animation");
		sender.sendMessage(m);
		cout << "stop animation\t" + ofToString(ofGetFrameNum()) << endl;
	}
}