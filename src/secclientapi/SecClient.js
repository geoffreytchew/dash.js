//import "./authService.js";
import generateMoneyTrace from './moneytrace.js';
import { fromByteArray, toByteArray } from 'base64-js';
//var Performance = require("sc-performance").SecClientPerformance;
//import verifyDigest from "./crypto_util.js";

const KEYSYSTEM_MAP = {
    'com.microsoft.playready': 'playReady',
    'com.widevine.alpha': 'widevine'
};

/*
function provisionKeys(
    serviceHostUrl,
    requestMetadata,
    deviceAttributes,
    keyProvisionResult,
    deviceAuthenticationResult) {}

function resolve(arg) { console.log(arg + ' resolved'); }
function reject(arg) { console.log(arg + ' rejected'); }
*/

export function acquireLicense(args) {
    args.context.performance.markOnce(args.context.marks.START_SEC_CLIENT_ACQUIRE_LICENSE);

    // TODO Is this needed? var anon = true;
    const urlPost = '/license';

    return new Promise(function (resolve, reject) {
        // Generate request body
        var lrBody = {};

        if (args.keySystem) {
            lrBody.keySystem = KEYSYSTEM_MAP[args.keySystem];
            //console.log(' Adding keySystem');
        }
        if (args.licenseRequest) {
            lrBody.licenseRequest = fromByteArray(new Uint8Array(args.licenseRequest));
            //console.log(' Adding License Request Body');
        }
        if (args.contentMetadata) {
            lrBody.contentMetadata = args.contentMetadata;
            //console.log(' Adding contentMetadata');
        }
        if (args.mediaUsage) {
            lrBody.mediaUsage = args.mediaUsage;
            //console.log(' Adding mediaUsage');
        }
        if (args.accessToken) {
            lrBody.accessToken = args.accessToken;
            //console.log(' Adding accessToken');
        }
        if (args.accessAttributes) {
            //console.log(' Adding accessAttributes');
            lrBody.accessAttributes = Object.create(null);
            for (let entry of Object.keys(args.accessAttributes)) {
                //console.log(': ' + entry + ', ' + args.accessAttributes[entry]);
                lrBody.accessAttributes[entry[0]] = entry[1];
            }
        }

        var jsonizedLR = JSON.stringify(lrBody);

        var xhr = new XMLHttpRequest();

        xhr.open('POST' , args.serviceHostUrl + urlPost, true);
        xhr.responseType = 'json';
        // Does this need to be supported??? --> xhr.withCredentials = true;

        var headerInfo = args.requestMetadata;
        if (headerInfo === undefined) {
            headerInfo = {};
        }

        headerInfo.Accept = 'application/vnd.xcal.mds.licenseResponse+json; version=1';
        headerInfo['Content-Type'] = 'application/vnd.xcal.mds.licenseRequest+json; version=1';
        if (headerInfo['X-MoneyTrace'] === undefined) {
            headerInfo['X-MoneyTrace'] = generateMoneyTrace();
        }

        if (headerInfo) {
            Object.keys(headerInfo).forEach(function (key) {
                //console.log('Add Header: ' + key + ' = ' + headerInfo[key]);
                xhr.setRequestHeader(key, headerInfo[key]);
            });
        }

        xhr.onload = function () {
            args.context.performance.markOnce(args.context.marks.END_SEC_CLIENT_SEND_TO_MDS);
            var licenseResult = {};
            //console.log("ONLOAD Response received with status " + xhr.status + ".");
            // console.log(xhr.getAllResponseHeaders());
            // var digestHeader = xhr.getResponseHeader("Digest");
            // console.log("Digest header: " + digestHeader);
            // var digest = digestHeader.slice("SHA-256=".length);
            // if (verifyDigest(xhr.response, digest)) {
            if (xhr.status == 200) {
                licenseResult = xhr.response;
                //console.log('License Result:');
                //console.log(licenseResult);
                resolve(licenseResult);
            } else {
                console.log('*** License Result bad status: ' + xhr.status + ' ' + xhr.statusText);
                reject(xhr.status + ' ' + xhr.statusText);
            }
            // } else {
            //   console.log('Bad response digest ' + digest);
            //   reject(xhr.response);
            // }
        };

        xhr.onerror = function () {
            //console.log("ONERROR Response received with status " + xhr.status + ".");
            args.context.performance.markOnce(args.context.marks.END_SEC_CLIENT_SEND_TO_MDS);
            reject(xhr.statusText);
        };
        //console.log('Sending license request ');
        //console.log('JSON Request Body: ' + jsonizedLR);
        args.context.performance.markOnce(args.context.marks.START_SEC_CLIENT_SEND_TO_MDS);
        xhr.send(jsonizedLR);
        //console.log('Send completed.');
    }).then(response => {
        console.log('[COMCAST] DEBUG License Response = ' + response.license);
        var licObj = {
            license: toByteArray(response.license).buffer,
            accessAttributesStatus: response.accessAttributesStatus
        };
        args.context.performance.markOnce(args.context.marks.END_SEC_CLIENT_ACQUIRE_LICENSE);
        return licObj;
    })
    .catch(function (err) {
        args.context.performance.markOnce(args.context.marks.END_SEC_CLIENT_ACQUIRE_LICENSE);
        console.error(err.message);
        console.log('CATCH with result of :\n' + err.stack);
    });
}