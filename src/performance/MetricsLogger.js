const LOGGING_PREFIX = '[PERFORMANCE]';

class MetricsLogger {
    constructor(performance, marks) {
        this.performance = performance;
        this.marks = marks;
    }

    log(description, timestamp, startMark, endMark) {
        if ( !this.performance.hasMark(startMark) ) {
            console.log(LOGGING_PREFIX + ' : ' + timestamp + ' : ' + description + ' : ' + 'Mark ' + startMark + ' was not set');
        }
        else if ( !this.performance.hasMark(endMark) ) {
            console.log(LOGGING_PREFIX + ' : ' + timestamp + ' : ' + description + ' : ' + 'Mark ' + endMark + ' was not set');
        }
        else {
            console.log(LOGGING_PREFIX + ' : ' + timestamp + ' : ' + description + ' : ' + this.performance.measure(startMark, endMark) + ' millis');
        }
    }

    logAll() {
        let timestamp = new Date();

        let isEmeV3 = this.performance.hasMark(this.marks.EVENT_ENCRYPTED);

        if ( isEmeV3 ) {
            this.log('Start Player calls navigator.requestMediaKeySystemAccess -> End Call returns', timestamp, this.marks.START_REQUEST_MEDIA_KEY_ACCESS, this.marks.END_REQUEST_MEDIA_KEY_ACCESS);
            this.log('Start Player calls MediaKeySystemAccess.createMediaKeys  -> End Call returns', timestamp, this.marks.START_CREATE_MEDIA_KEYS, this.marks.END_CREATE_MEDIA_KEYS);
            this.log('Start Player calls MediaKeys.createSession               -> End Call returns', timestamp, this.marks.START_CREATE_SESSION, this.marks.END_CREATE_SESSION);
            this.log('Start Player calls MediaKeySession.generateRequest -> End Player receives license request from CDM', timestamp, this.marks.START_GENERATE_LICENSE_REQUEST, this.marks.END_GENERATE_LICENSE_REQUEST);
            this.log('Start Player sends license request -> End License response received', timestamp, this.marks.START_SEND_LICENSE_REQUEST, this.marks.END_SEND_LICENSE_REQUEST);

            this.log('Start Player calls navigator.requestMediaKeySystemAccess -> End Player receives license request from CDM', timestamp, this.marks.START_REQUEST_MEDIA_KEY_ACCESS, this.marks.END_GENERATE_LICENSE_REQUEST);
            this.log('Start Player receives license request from CDM -> End Player receives license response', timestamp, this.marks.END_GENERATE_LICENSE_REQUEST, this.marks.END_SEND_LICENSE_REQUEST);
            this.log('Start Initialize player -> End Initial canplay event', timestamp, this.marks.INITIALIZE_PLAYER, this.marks.EVENT_CAN_PLAY);
            this.log('Start Encrypt event -> End Initial canplay event', timestamp, this.marks.EVENT_ENCRYPTED, this.marks.EVENT_CAN_PLAY);
            this.log('Start Player receives license request from CDM -> End Initial canplay event', timestamp, this.marks.END_GENERATE_LICENSE_REQUEST, this.marks.EVENT_CAN_PLAY);
            this.log('Start Player provides license response to CDM  -> End Initial canplay event', timestamp, this.marks.UPDATE_MEDIA_KEY_SESSION, this.marks.EVENT_CAN_PLAY);
        }
        else { // EME V1
            this.log('Start Player calls generateKeyRequest -> End Player receives key request from CDM', timestamp, this.marks.START_GENERATE_KEY_REQUEST, this.marks.END_GENERATE_KEY_REQUEST);
            this.log('Start Player sends key request -> End key response received', timestamp, this.marks.START_SEND_LICENSE_REQUEST, this.marks.END_SEND_LICENSE_REQUEST);

            this.log('Start Player receives needkey event -> End Player receives key request from CDM', timestamp, this.marks.EVENT_NEEDKEY, this.marks.END_GENERATE_KEY_REQUEST);
            this.log('Start Player receives key request from CDM -> End Player receives key response', timestamp, this.marks.END_GENERATE_KEY_REQUEST, this.marks.END_SEND_LICENSE_REQUEST);
            this.log('Start Initialize player -> End Initial canplay event', timestamp, this.marks.INITIALIZE_PLAYER, this.marks.EVENT_CAN_PLAY);
            this.log('Start needkey event -> End initial canplay event', timestamp, this.marks.EVENT_NEEDKEY, this.marks.EVENT_CAN_PLAY);
            this.log('Start Player receives key request from CDM -> End Initial canplay event', timestamp, this.marks.END_GENERATE_KEY_REQUEST, this.marks.EVENT_CAN_PLAY);
            this.log('Start Player provides key response to CDM  -> End Initial canplay event', timestamp, this.marks.ADD_KEY, this.marks.EVENT_CAN_PLAY);
            this.log('Start Player receives addkey event -> End Initial canplay event', timestamp, this.marks.EVENT_ADDKEY, this.marks.EVENT_CAN_PLAY);
        }
    }
}

export default MetricsLogger;