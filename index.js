
import { PsychoJS } from './lib/core/PsychoJS.js';
import { Window } from './lib/core/Window.js';
import { Keyboard } from './lib/core/Keyboard.js';
import { TrialHandler } from './lib/data/TrialHandler.js';
import { Scheduler } from './lib/util/Scheduler.js';
// import * as util from './lib/util/';
// import * as visual from './lib/visual/';

const psychoJS = new PsychoJS({
    debug: true
});

psychoJS.openWindow({
    fullscr: true,
    color: new util.Color('black'),
    units: 'height',
    waitBlanking: true
});

let expName = 'MDS'
let expInfo = {'session': '', 'participant': ''};

// schedule the experiment:
psychoJS.schedule(psychoJS.gui.DlgFromDict({
	dictionary: expInfo,
	title: expName
}));

const flowScheduler = new Scheduler(psychoJS);
const dialogCancelScheduler = new Scheduler(psychoJS);
psychoJS.scheduleCondition(function () { return (psychoJS.gui.dialogComponent.button === 'OK'); }, flowScheduler, dialogCancelScheduler);

// flowScheduler gets run if the participants presses OK
flowScheduler.add(updateInfo); // add timeStamp
flowScheduler.add(experimentInit);
flowScheduler.add(instructRoutineBegin());
flowScheduler.add(instructRoutineEachFrame());
flowScheduler.add(instructRoutineEnd());
const trialsLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(trialsLoopBegin, trialsLoopScheduler);
flowScheduler.add(trialsLoopScheduler);
flowScheduler.add(trialsLoopEnd);
flowScheduler.add(thanksRoutineBegin());
flowScheduler.add(thanksRoutineEachFrame());
flowScheduler.add(thanksRoutineEnd());
flowScheduler.add(quitPsychoJS, '', true);

// quit if user presses Cancel in dialog box:
dialogCancelScheduler.add(quitPsychoJS, '', false);

// psychoJS.start({expName, expInfo});
psychoJS.start({
	expName,
	expInfo,
	resources: [
		{ name: 'trialTypes.xls', path: 'resources/trialTypes.xls' }
	]
});

var frameDur;
function updateInfo() {
	expInfo['date'] = util.MonotonicClock.getDateStr();  // add a simple timestamp
	expInfo['expName'] = expName;
	expInfo['psychopyVersion'] = '3.2.5';
	expInfo['OS'] = window.navigator.platform;

	// store frame rate of monitor if we can measure it successfully
	expInfo['frameRate'] = psychoJS.window.getActualFrameRate();
	if (typeof expInfo['frameRate'] !== 'undefined')
		frameDur = 1.0 / Math.round(expInfo['frameRate']);
	else
		frameDur = 1.0 / 60.0; // couldn't get a reliable measure so guess

	// add info from the URL:
	util.addInfoFromUrl(expInfo);

	return Scheduler.Event.NEXT;
}

var instructClock;
var instrText;
var ready;
var trialClock;
var color;
var resp;
var thanksClock;
var thanksText;
var globalClock;
var routineTimer;

// function generatePairs() {
//
// }
//
// const preExperimentData = {
//     hues: 20,
//     contrastLevels: 1,
//     greys: 0,
//
//     pairs: generatePairs() // TODO: finish logic for generating random pairs
// }

function experimentInit() {
	// Initialize components for Routine "instruct"
	instructClock = new util.Clock();
	instrText = new visual.TextStim({
		win: psychoJS.window,
		name: 'instrText',
		text: 'MDS Instructions.\n\nIn this task, you will be presented with pairs of colors.\n\nYour task is to rate the difference between each pair on a scale of 0 to 6. Press the corresponding keys on your number pad to rate each pair\n(Esc will abort the experiment)\n\nPress any key to start...',
		font: 'Arial',
		units: 'height',
		pos: [0, 0], height: 0.05, wrapWidth: undefined, ori: 0,
		color: new util.Color('white'), opacity: 1,
		depth: 0.0
	});

	ready = new Keyboard({ psychoJS, clock: new util.Clock(), waitForStart: true });

	// Initialize components for Routine "trial"
	trialClock = new util.Clock();

	leftColor = new visual.Rect({
        win: psychoJS.window,

	})

    rightColor = new visual.Rect({
        win: psychoJS.window,

    })

	resp = new Keyboard({ psychoJS, clock: new util.Clock(), waitForStart: true });

	// Initialize components for Routine "thanks"
	thanksClock = new util.Clock();
	thanksText = new visual.TextStim({
		win: psychoJS.window,
		name: 'thanksText',
		text: 'This is the end of the experiment.\n\nThanks!',
		font: 'Arial',
		units: 'height',
		pos: [0, 0], height: 0.05, wrapWidth: undefined, ori: 0,
        color: new util.Color('white'), opacity: 1,
        depth: 0.0
    });

    // Create some handy timers
    globalClock = new util.Clock();  // to track the time since experiment started
    routineTimer = new util.CountdownTimer();  // to track time remaining of each (non-slip) routine

    return Scheduler.Event.NEXT;
}
