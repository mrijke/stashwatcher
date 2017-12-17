declare module "react-native-camera" {
  import * as React from "react";

  interface Props {
      /**
       * "fill" (default) 
       * 
       * The aspect property allows you to define how your viewfinder renders the camera's view. For instance, 
       * if you have a square viewfinder and you want to fill the it entirely, 
       * you have two options: "fill", 
       * 
       * where the aspect ratio of the camera's view is preserved by cropping the view or "stretch",
       * where the aspect ratio is skewed in order to fit the entire image inside the viewfinder. 
       * 
       * The other option is "fit", 
       * which ensures the camera's entire view fits inside your viewfinder without altering the aspect ratio.
       */
      aspect?: "Camera.constants.Aspect.fit" | "fit" | "Camera.constants.Aspect.fill" | "fill"/** (default) */ | "Camera.constants.Aspect.stretch" | "stretch";
      /**
       * iOS captureAudio
       * 
       *  Values: true (Boolean), false (default)
       * 
       * Applies to video capture mode only. Specifies whether or not audio should be captured with the video.
       */
      captureAudio?: boolean;
      /**
       * captureMode
       * 
       * Values: 
       * 
       * Camera.constants.CaptureMode.still (default), 
       * 
       * Camera.constants.CaptureMode.video
       * 
       * The type of capture that will be performed by the camera - either a still image or video.
       */
      captureMode?: "Camera.constants.CaptureMode.still" | "Camera.constants.CaptureMode.video" ;
      /**
       * captureTarget
       * 
       * Values: 
       * 
       * Camera.constants.CaptureTarget.cameraRoll (default), 
       * 
       * Camera.constants.CaptureTarget.disk, 
       * 
       * Camera.constants.CaptureTarget.temp, 
       * 
       * Camera.constants.CaptureTarget.memory (deprecated),
       * 
       * This property allows you to specify the target output of the captured image data. 
       * 
       * The disk output has been shown to improve capture response time, 
       * so that is the recommended value. When using the deprecated memory output, 
       * the image binary is sent back as a base64-encoded string.
       */
      captureTarget?: "Camera.constants.CaptureTarget.cameraRoll" | "Camera.constants.CaptureTarget.disk"| "Camera.constants.CaptureTarget.temp" | "Camera.constants.CaptureTarget.memory" ;
      /**
       * captureQuality
       * 
       * Values:
       * 
       *  Camera.constants.CaptureQuality.high or "high" (default),
       * 
       *  Camera.constants.CaptureQuality.medium or "medium", 
       * 
       * Camera.constants.CaptureQuality.low or "low", 
       * 
       * Camera.constants.CaptureQuality.photo or "photo", 
       * 
       * Camera.constants.CaptureQuality["1080p"] or "1080p", 
       * 
       * Camera.constants.CaptureQuality["720p"] or "720p", 
       * 
       * Camera.constants.CaptureQuality["480p"] or "480p".
       * 
       * Android also supports Camera.constants.CaptureQuality.preview or "preview" which matches the output image to the same one used in the preview
       * 
       * This property allows you to specify the quality output of the captured image or video. By default the quality is set to high.
       * 
       * When choosing more-specific quality settings (1080p, 720p, 480p), note that each platform and device supports different valid picture/video sizes,
       * and actual resolution within each of these quality settings might differ. 
       * 
       * There should not be too much variance (if any) for iOS; 
       * 1080p should give 1920x1080, 720p should give 1280x720, 
       * and 480p should give 640x480 (note that iOS 480p therefore is NOT the typical 16:9 HD aspect ratio, 
       * and the typically-HD camera preview screen may differ greatly in aspect from what you actually record!!).
       * 
       *  For Android, expect more variance: on most Androids, 1080p should give 1920x1080 and 720p should give 1280x720; however, 
       * 480p will at "best" be 853x480 (16:9 HD aspect ratio), 
       * but falls back/down to 800x480, 720x480, or "worse", 
       * depending on what is closest-but-less-than 853x480 and available on the actual device. 
       * 
       * If your application requires knowledge of the precise resolution of the output image/video,
       *  you might consider manually determine the actual resolution itself after capture has completed (particularly for 480p on Android).
       * 
       */
      captureQuality?: "low" | "medium" | "high" | 'photo' | "1080p" | "720p" | "480p" | "preview";
      /**
       * type
       * 
       * Values: 
       * 
       * Camera.constants.Type.front or "front", 
       * 
       * Camera.constants.Type.back or "back" (default)
       * 
       * Use the type property to specify which camera to use.
       */
      type?: "back" | "front";
      /**
       * orientation
       * 
       * Values: 
       * Camera.constants.Orientation.auto or "auto" (default), 
       * 
       * Camera.constants.Orientation.landscapeLeft or "landscapeLeft", 
       * 
       * Camera.constants.Orientation.landscapeRight or "landscapeRight", 
       * 
       * Camera.constants.Orientation.portrait or "portrait", 
       * 
       * Camera.constants.Orientation.portraitUpsideDown or "portraitUpsideDown"
       * 
       * The orientation property allows you to specify the current orientation of the phone to ensure the viewfinder is "the right way up."
       */
      orientation?: "auto" | "landscapeLeft" | "landscapeRight" | "portrait" | "portraitUpsideDown";
      /**
       * Android playSoundOnCapture
       * 
       * Values: true (default) or false
       * This property allows you to specify whether a shutter sound is played on capture. 
       * 
       * It is currently android only, pending a reasonable mute implementation in iOS.
       */
      playSoundOnCapture?: boolean;
      /**
       * onBarCodeRead
       * 
       * Will call the specified method when a barcode is detected in the camera's view.
       * 
       * Event contains data (the data in the barcode) and bounds (the rectangle which outlines the barcode.)
       * The following barcode types can be recognised:
       * 
       * aztec
       * code128
       * code39
       * code39mod43
       * code93
       * ean13
       * ean8
       * pdf417
       * qr
       * upce
       * interleaved2of5 (when available)
       * itf14 (when available)
       * datamatrix (when available)
       * 
       * The barcode type is provided in the data object.
       */
      onBarCodeRead?: (e: any) => any;
      /**
       * barCodeTypes
       * 
       * An array of barcode types to search for. 
       * 
       * aztec
       * code128
       * code39
       * code39mod43
       * code93
       * ean13
       * ean8
       * pdf417
       * qr
       * upce
       * interleaved2of5 (when available)
       * itf14 (when available)
       * datamatrix (when available)
       * 
       * Defaults to all types listed above. No effect if onBarCodeRead is undefined.
       */
      barCodeTypes?: string[];
      /**
       * flashMode
       * 
       * Values: 
       * 
       * Camera.constants.FlashMode.on, 
       * 
       * Camera.constants.FlashMode.off, 
       * 
       * Camera.constants.FlashMode.auto
       * 
       * Use the flashMode property to specify the camera flash mode.
       */
      flashMode?: any;
      /**
       * torchMode
       * 
       * Values:
       * 
       * Camera.constants.TorchMode.on, 
       * 
       * Camera.constants.TorchMode.off, 
       * 
       * Camera.constants.TorchMode.auto
       * 
       * Use the torchMode property to specify the camera torch mode.
       */
      torchMode?: any;
      /**
       * onFocusChanged: Event { nativeEvent: { touchPoint: { x, y } }
       * 
       * Called when a touch focus gesture has been made. By default, onFocusChanged is not defined and tap-to-focus is disabled.
       */
      onFocusChanged?: () => any;
      /**
       * defaultOnFocusComponent
       * 
       * Values: true (default) false
       * 
       * If defaultOnFocusComponent set to false, 
       * default internal implementation of visual feedback for tap-to-focus gesture will be disabled.
       */
      defaultOnFocusComponent?: boolean;
      /**
       * onZoomChanged: Event { nativeEvent: { velocity, zoomFactor } }
       * 
       * Called when focus has changed. 
       * 
       * By default, onZoomChanged is not defined and pinch-to-zoom is disabled.
       */
      onZoomChanged?: () => any;
      /**
       * iOS keepAwake
       * 
       * If set to true, the device will not sleep while the camera preview is visible.
       * 
       * This mimics the behavior of the default camera app, which keeps the device awake while open.
       */
      keepAwake?: boolean;
      /**
       * mirrorImage
       * 
       * If set to true, the image returned will be mirrored.
       */
      mirrorImage?: boolean;
      defaultTouchToFocus?: boolean;
      style?: any;
  }


  /**
   * audio (See captureAudio under Properties)
   * 
   * mode (See captureMode under Properties)
   * 
   * target (See captureTarget under Properties)
   *
   * metadata This is metadata to be added to the captured image.
   *
   * location This is the object returned from navigator.geolocation.getCurrentPosition() (React Native's geolocation polyfill). 
   * It will add GPS metadata to the image.
   *
   * rotation This will rotate the image by the number of degrees specified.
   */
  interface captureOptions {

  }
  /**
   * The promise will be fulfilled with an object with some of the following properties:
   * 
   * data: Returns a base64-encoded string with the capture data (only returned with the deprecated Camera.constants.CaptureTarget.memory)
   * 
   * path: Returns the path of the captured image or video file on disk
   * 
   * width: (currently iOS video only) returns the video file's frame width
   * 
   * height: (currently iOS video only) returns the video file's frame height
   * 
   * duration: (currently iOS video only) video file duration
   * 
   * size: (currently iOS video only) video file size (in bytes)
   * 
   */

   interface CaptureReturned {
       data?:string;
       path?:any;
       width?:number;
       height?:number;
       duration?:number;
       size?:any;
   }


  /**
   * You can access component methods by adding a ref (ie. ref="camera") prop to your <Camera> element, 
   * then you can use this.refs.camera.capture(cb), etc. inside your component.
   */
  export default class Camera extends React.Component<Props, any> {
      static constants:any;
      /**
       * capture([options]): Promise
       * 
       * Captures data from the camera. 
       * What is captured is based on the captureMode and captureTarget props. 
       * captureMode tells the camera whether you want a still image or video. 
       * captureTarget allows you to specify how you want the data to be captured and sent back to you. 
       * See captureTarget under Properties to see the available values.
       */
      capture([]: captureOptions): Promise<CaptureReturned>
      /**
       * iOS getFOV(): Promise
       * 
       * Returns the camera's current field of view.
       */
      getFOV(): Promise<any>
      /**
       * hasFlash(): Promise
       * 
       * Returns whether or not the camera has flash capabilities.
       */
      hasFlash(): Promise<any>;
      /**
       * stopCapture()
       * 
       * Ends the current capture session for video captures. Only applies when the current captureMode is video.
       */
      stopCapture(): void;
      /**
       * iOS Camera.checkDeviceAuthorizationStatus(): Promise
       * 
       * Exposes the native API for checking if the device has authorized access to the camera (camera and microphone permissions). 
       * Can be used to call before loading the Camera component to ensure proper UX.
       * 
       * The promise will be fulfilled with true or false depending on whether the device is authorized.
       */
      static checkDeviceAuthorizationStatus(): Promise<boolean>;
      /**
       * iOS Camera.checkVideoAuthorizationStatus(): Promise
       * 
       * The same as Camera.checkDeviceAuthorizationStatus() but only checks the camera permission.
       */
      static checkVideoAuthorizationStatus(): Promise<boolean>
      /**
       * iOS Camera.checkAudioAuthorizationStatus(): Promise
       * 
       * The same as Camera.checkDeviceAuthorizationStatus() but only checks the microphone permission.
       */
      static checkAudioAuthorizationStatus(): Promise<boolean>

  }
}