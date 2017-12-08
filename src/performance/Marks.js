class Marks {
    constructor () {
        //
        // Common Marks
        //

        // MediaPlayer initialize is called
        this.INITIALIZE_PLAYER = 'initializePlayer';
        // Before license request received from CDM is sent to license server
        this.START_SEND_LICENSE_REQUEST = 'startSendLicenseRequest';
        // After license response is received from license server
        this.END_SEND_LICENSE_REQUEST = 'endSendLicenseRequest';
        // 'canplay' event is received from HtmlMediaElement
        this.EVENT_CAN_PLAY = 'eventCanPlay';


        //
        // Sec Client API Marks
        //

        this.START_SEC_CLIENT_ACQUIRE_LICENSE = 'startSecClientAcquireLicense';
        this.END_SEC_CLIENT_ACQUIRE_LICENSE = 'endSecClientAcquireLicense';
        this.START_SEC_CLIENT_SEND_TO_MDS = 'startSecClientSendToMds';
        this.END_SEC_CLIENT_SEND_TO_MDS = 'endSecClientSendToMds';


        //
        // EME v1 Marks
        //

        // 'needkey' event is received
        this.EVENT_NEEDKEY = 'eventNeedKey';
        // Before generateKeyRequest is called
        this.START_GENERATE_KEY_REQUEST = 'startGenerateKeyRequest';
        // 'keymessage' event containing key request received
        this.END_GENERATE_KEY_REQUEST = 'endGenerateKeyRequest';
        // Before addKey is called
        this.ADD_KEY = 'addKey';
        // 'addkey' event is received
        this.EVENT_ADDKEY = 'eventAddKey';


        //
        // EME v3+ Marks
        //

        // 'encrypted' event is received from HtmlMediaElement
        this.EVENT_ENCRYPTED = 'eventEncrypted';
        // Before navigator.requestMediaKeySystemAccess is called
        this.START_REQUEST_MEDIA_KEY_ACCESS = 'startRequestMediaKeyAccess';
        // navigator.requestMediaKeySystemAccess promise resolved
        this.END_REQUEST_MEDIA_KEY_ACCESS = 'endRequestMediaKeyAccess';
        // Before MediaKeySystemAccess.createMediaKeys is called
        this.START_CREATE_MEDIA_KEYS = 'startCreateMediaKeys';
        // After call to MediaKeySystemAccess.createMediaKeys returns
        this.END_CREATE_MEDIA_KEYS = 'endCreateMediaKeys';
        // Before MediaKeys.createSession is called
        this.START_CREATE_SESSION = 'startCreateSession';
        // After call to MediaKeys.createSession returns
        this.END_CREATE_SESSION = 'endCreateSession';
        // Before MediaKeySession.generateRequest is called
        this.START_GENERATE_LICENSE_REQUEST = 'startGenerateLicenseRequest';
        // Message event containing license request received
        this.END_GENERATE_LICENSE_REQUEST = 'endGenerateLicenseRequest';
        // Before MediaKeySession.update is called
        this.UPDATE_MEDIA_KEY_SESSION = 'updateMediaKeySession';
    }
}

export default Marks;