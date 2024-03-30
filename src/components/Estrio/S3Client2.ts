// "use strict";

// var React = require('react'),
//     ReactDOM = require('react-dom'),
//     PropTypes = require('prop-types'),
//     createReactClass = require('create-react-class'),
//     S3Upload = require('./s3upload.js'),
//     objectAssign = require('object-assign');

// var ReactS3Uploader = createReactClass({

//     propTypes: {
//         signingUrl: PropTypes.string,
//         getSignedUrl: PropTypes.func,
//         preprocess: PropTypes.func,
//         onSignedUrl: PropTypes.func,
//         onProgress: PropTypes.func,
//         onFinish: PropTypes.func,
//         onError: PropTypes.func,
//         signingUrlMethod: PropTypes.string,
//         signingUrlHeaders: PropTypes.oneOfType([
//           PropTypes.object,
//           PropTypes.func
//         ]),
//         signingUrlQueryParams: PropTypes.oneOfType([
//           PropTypes.object,
//           PropTypes.func
//         ]),
//         signingUrlWithCredentials: PropTypes.bool,
//         uploadRequestHeaders: PropTypes.object,
//         contentDisposition: PropTypes.string,
//         server: PropTypes.string,
//         scrubFilename: PropTypes.func,
//         s3path: PropTypes.string,
//         inputRef: PropTypes.oneOfType([
//           PropTypes.object,
//           PropTypes.func
//         ]),
//         autoUpload: PropTypes.bool
//     },

//     getDefaultProps: function() {
//         return {
//             preprocess: function(file, next) {
//                 console.log('Pre-process: ',file.name);
//                 next(file);
//             },
//             onSignedUrl: function( signingServerResponse ) {
//                 console.log('Signing server response: ', signingServerResponse);
//             },
//             onProgress: function(percent, message, file) {
//                 console.log('Upload progress: ',`${percent} % ${message}`);
//             },
//             onFinish: function(signResult) {
//                 console.log("Upload finished: ",signResult.publicUrl)
//             },
//             onError: function(message) {
//                 console.log("Upload error: ",message);
//             },
//             server: '',
//             signingUrlMethod: 'GET',
//             scrubFilename: function(filename) {
//                 return filename.replace(/[^\w\d_\-\.]+/ig, '');
//             },
//             s3path: '',
//             autoUpload: true
//         };
//     },

//     uploadFile: function() {
//         this.myUploader = new S3Upload({
//             fileElement: ReactDOM.findDOMNode(this),
//             signingUrl: this.props.signingUrl,
//             getSignedUrl: this.props.getSignedUrl,
//             preprocess: this.props.preprocess,
//             onSignedUrl: this.props.onSignedUrl,
//             onProgress: this.props.onProgress,
//             onFinishS3Put: this.props.onFinish,
//             onError: this.props.onError,
//             signingUrlMethod: this.props.signingUrlMethod,
//             signingUrlHeaders: this.props.signingUrlHeaders,
//             signingUrlQueryParams: this.props.signingUrlQueryParams,
//             signingUrlWithCredentials: this.props.signingUrlWithCredentials,
//             uploadRequestHeaders: this.props.uploadRequestHeaders,
//             contentDisposition: this.props.contentDisposition,
//             server: this.props.server,
//             scrubFilename: this.props.scrubFilename,
//             s3path: this.props.s3path
//         });
//     },

//     abort: function() {
//         this.myUploader && this.myUploader.abortUpload();
//     },

//     clear: function() {
//         clearInputFile(ReactDOM.findDOMNode(this));
//     },

//     render: function() {
//         return React.createElement('input', this.getInputProps());
//     },

//     getInputProps: function() {
//         // declare ref beforehand and filter out
//         // `inputRef` by `ReactS3Uploader.propTypes`
//         var additional = {
//             type: 'file',
//             ref: this.props.inputRef
//         };

//         if ( this.props.autoUpload ) {
//             additional.onChange = this.uploadFile;
//         }
        
//         var temporaryProps = objectAssign({}, this.props, additional);
//         var inputProps = {};

//         var invalidProps = Object.keys(ReactS3Uploader.propTypes);

//         for(var key in temporaryProps) {
//             if(temporaryProps.hasOwnProperty(key) && invalidProps.indexOf(key) === -1) {
//                 inputProps[key] = temporaryProps[key];
//             }
//         }

//         return inputProps;
//     }

// });

// // http://stackoverflow.com/a/24608023/194065
// function clearInputFile(f){
//     if(f.value){
//         try{
//             f.value = ''; //for IE11, latest Chrome/Firefox/Opera...
//         }catch(err){ }
//         if(f.value){ //for IE5 ~ IE10
//             var form = document.createElement('form'),
//                 parentNode = f.parentNode, ref = f.nextSibling;
//             form.appendChild(f);
//             form.reset();
//             parentNode.insertBefore(f,ref);
//         }
//     }
// }


// module.exports = ReactS3Uploader;


// var uuidv4 = require('uuid/v4'),
// aws = require('aws-sdk'),
// express = require('express');


// function checkTrailingSlash(path) {
// if (path && path[path.length-1] != '/') {
//    path += '/';
// }
// return path;
// }

// function S3Router(options, middleware) {

// if (!middleware) {
//    middleware = [];
// }

// var S3_BUCKET = options.bucket,
//    getFileKeyDir = options.getFileKeyDir || function() { return ""; };

// if (!S3_BUCKET) {
//    throw new Error("S3_BUCKET is required.");
// }

// var getS3 = options.getS3;
// if (!getS3) {
//  var s3Options = {};
//  if (options.region) {
//    s3Options.region = options.region;
//  }
//  if (options.signatureVersion) {
//    s3Options.signatureVersion = options.signatureVersion;
//  }

//  getS3 = function() {
//    return new aws.S3(s3Options);
//  };
// }

// if (options.uniquePrefix === undefined) {
//    options.uniquePrefix = true;
// }

// var router = express.Router();

// /**
// * Redirects image requests with a temporary signed URL, giving access
// * to GET an upload.
// */
// function tempRedirect(req, res) {
//    var params = {
//        Bucket: S3_BUCKET,
//        Key: checkTrailingSlash(getFileKeyDir(req)) + req.params[0]
//    };
//    var s3 = getS3();
//    s3.getSignedUrl('getObject', params, function(err, url) {
//        res.redirect(url);
//    });
// };

// /**
// * Image specific route.
// */
// router.get(/\/img\/(.*)/, middleware, function(req, res) {
//    return tempRedirect(req, res);
// });

// /**
// * Other file type(s) route.
// */
// router.get(/\/uploads\/(.*)/, middleware, function(req, res) {
//    return tempRedirect(req, res);
// });

// /**
// * Returns an object with `signedUrl` and `publicUrl` properties that
// * give temporary access to PUT an object in an S3 bucket.
// */
// router.get('/sign', middleware, function(req, res) {
//    var filename = (req.query.path || '') + (options.uniquePrefix ? uuidv4() + "_" : "") + req.query.objectName;
//    var mimeType = req.query.contentType;
//    var fileKey = checkTrailingSlash(getFileKeyDir(req)) + filename;
//    // Set any custom headers
//    if (options.headers) {
//      res.set(options.headers);
//    }

//    var s3 = getS3();
//    var params = {
//        Bucket: S3_BUCKET,
//        Key: fileKey,
//        Expires: options.signatureExpires || 60,
//        ContentType: mimeType,
//        ACL: options.ACL || 'private'
//    };
//    s3.getSignedUrl('putObject', params, function(err, data) {
//        if (err) {
//            console.log(err);
//            return res.send(500, "Cannot create S3 signed URL");
//        }
//        res.json({
//            signedUrl: data,
//            publicUrl: '/s3/uploads/' + filename,
//            filename: filename,
//            fileKey: fileKey,
//        });
//    });
// });

// return router;
// }

// module.exports = S3Router;


// /**
//  * Taken, CommonJS-ified, and heavily modified from:
//  * https://github.com/flyingsparx/NodeDirectUploader
//  */

// var mime = require('mime-types');

// S3Upload.prototype.server = '';
// S3Upload.prototype.signingUrl = '/sign-s3';
// S3Upload.prototype.signingUrlMethod = 'GET';
// S3Upload.prototype.successResponses = [200, 201];
// S3Upload.prototype.fileElement = null;
// S3Upload.prototype.files = null;

// S3Upload.prototype.onFinishS3Put = function(signResult, file) {
//     return console.log('base.onFinishS3Put()', signResult.publicUrl);
// };

// S3Upload.prototype.preprocess = function(file, next) {
//     console.log('base.preprocess()', file);
//     return next(file);
// };

// S3Upload.prototype.onProgress = function(percent, status, file) {
//     return console.log('base.onProgress()', percent, status);
// };

// S3Upload.prototype.onError = function(status, file) {
//     return console.log('base.onError()', status);
// };

// S3Upload.prototype.onSignedUrl = function(result) {};

// S3Upload.prototype.scrubFilename = function(filename) {
//     return filename.replace(/[^\w\d_\-\.]+/ig, '');
// };

// function S3Upload(options) {
//     if (options == null) {
//         options = {};
//     }
//     for (var option in options) {
//         if (options.hasOwnProperty(option)) {
//             this[option] = options[option];
//         }
//     }
//     var files = this.fileElement ? this.fileElement.files : this.files || [];
//     this.handleFileSelect(files);
// }

// function getFileMimeType(file) {
//     return file.type || mime.lookup(file.name);
// }

// S3Upload.prototype.handleFileSelect = function(files) {
//     var result = [];
//     for (var i=0; i < files.length; i++) {
//         var file = files[i];
//         this.preprocess(file, function(processedFile){
//             this.onProgress(0, 'Waiting', processedFile);
//             result.push(this.uploadFile(processedFile));
//             return result;
//         }.bind(this));
//     }
// };

// S3Upload.prototype.createCORSRequest = function(method, url, opts) {
//     var opts = opts || {};
//     var xhr = new XMLHttpRequest();

//     if (xhr.withCredentials != null) {
//         xhr.open(method, url, true);
//         if (opts.withCredentials != null) {
//             xhr.withCredentials = opts.withCredentials;
//         }
//     }
//     else if (typeof XDomainRequest !== "undefined") {
//         xhr = new XDomainRequest();
//         xhr.open(method, url);
//     }
//     else {
//         xhr = null;
//     }
//     return xhr;
// };

// S3Upload.prototype._getErrorRequestContext = function (xhr) {
//     return {
//         response: xhr.responseText,
//         status: xhr.status,
//         statusText: xhr.statusText,
//         readyState: xhr.readyState
//     };
// }

// S3Upload.prototype.executeOnSignedUrl = function(file, callback) {
//     var fileName = this.scrubFilename(file.name);
//     var queryString = '?objectName=' + fileName + '&contentType=' + encodeURIComponent(getFileMimeType(file));
//     if (this.s3path) {
//         queryString += '&path=' + encodeURIComponent(this.s3path);
//     }
//     if (this.signingUrlQueryParams) {
//         var signingUrlQueryParams = typeof this.signingUrlQueryParams === 'function' ? this.signingUrlQueryParams() : this.signingUrlQueryParams;
//         Object.keys(signingUrlQueryParams).forEach(function(key) {
//             var val = signingUrlQueryParams[key];
//             queryString += '&' + key + '=' + val;
//         });
//     }
//     var xhr = this.createCORSRequest(this.signingUrlMethod,
//       this.server + this.signingUrl + queryString, { withCredentials: this.signingUrlWithCredentials });
//     if (this.signingUrlHeaders) {
//         var signingUrlHeaders = typeof this.signingUrlHeaders === 'function' ? this.signingUrlHeaders() : this.signingUrlHeaders;
//         Object.keys(signingUrlHeaders).forEach(function(key) {
//             var val = signingUrlHeaders[key];
//             xhr.setRequestHeader(key, val);
//         });
//     }
//     xhr.overrideMimeType && xhr.overrideMimeType('text/plain; charset=x-user-defined');
//     xhr.onreadystatechange = function() {
//         if (xhr.readyState === 4 && this.successResponses.indexOf(xhr.status) >= 0) {
//             var result;
//             try {
//                 result = JSON.parse(xhr.responseText);
//                 this.onSignedUrl( result );
//             } catch (error) {
//                 this.onError(
//                   'Invalid response from server',
//                   file,
//                   this._getErrorRequestContext(xhr)
//                 );
//                 return false;
//             }
//             return callback(result);
//         } else if (xhr.readyState === 4 && this.successResponses.indexOf(xhr.status) < 0) {
//             return this.onError(
//               'Could not contact request signing server. Status = ' + xhr.status,
//               file,
//               this._getErrorRequestContext(xhr)
//             );
//         }
//     }.bind(this);
//     return xhr.send();
// };

// S3Upload.prototype.uploadToS3 = function(file, signResult) {
//     var xhr = this.createCORSRequest('PUT', signResult.signedUrl);
//     if (!xhr) {
//         this.onError('CORS not supported', file, {});
//     } else {
//         xhr.onload = function() {
//             if (this.successResponses.indexOf(xhr.status) >= 0) {
//                 this.onProgress(100, 'Upload completed', file);
//                 return this.onFinishS3Put(signResult, file);
//             } else {
//                 return this.onError(
//                   'Upload error: ' + xhr.status,
//                   file,
//                   this._getErrorRequestContext(xhr)
//                 );
//             }
//         }.bind(this);
//         xhr.onerror = function() {
//             return this.onError(
//               'XHR error',
//               file,
//               this._getErrorRequestContext(xhr)
//             );
//         }.bind(this);
//         xhr.upload.onprogress = function(e) {
//             var percentLoaded;
//             if (e.lengthComputable) {
//                 percentLoaded = Math.round((e.loaded / e.total) * 100);
//                 return this.onProgress(percentLoaded, percentLoaded === 100 ? 'Finalizing' : 'Uploading', file);
//             }
//         }.bind(this);
//     }

//     var fileType = getFileMimeType(file);
//     var headers = {
//       'content-type': fileType
//     };

//     if (this.contentDisposition) {
//         var disposition = this.contentDisposition;
//         if (disposition === 'auto') {
//             if (fileType.substr(0, 6) === 'image/') {
//                 disposition = 'inline';
//             } else {
//                 disposition = 'attachment';
//             }
//         }

//         var fileName = this.scrubFilename(file.name)
//         headers['content-disposition'] = disposition + '; filename="' + fileName + '"';
//     }
//     if (!this.uploadRequestHeaders) {
//         xhr.setRequestHeader('x-amz-acl', 'public-read');
//     }
//     [signResult.headers, this.uploadRequestHeaders].filter(Boolean).forEach(function (hdrs) {
//         Object.entries(hdrs).forEach(function(pair) {
//             headers[pair[0].toLowerCase()] = pair[1];
//         })
//     });
//     Object.entries(headers).forEach(function (pair) {
//         xhr.setRequestHeader(pair[0], pair[1]);
//     })
//     this.httprequest = xhr;
//     return xhr.send(file);
// };

// S3Upload.prototype.uploadFile = function(file) {
//     var uploadToS3Callback = this.uploadToS3.bind(this, file);

//     if(this.getSignedUrl) return this.getSignedUrl(file, uploadToS3Callback);
//     return this.executeOnSignedUrl(file, uploadToS3Callback);
// };

// S3Upload.prototype.abortUpload = function() {
//     this.httprequest && this.httprequest.abort();
// };


// module.exports = S3Upload;
