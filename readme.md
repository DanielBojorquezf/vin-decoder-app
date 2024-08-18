# VIN Decoder App

This is a mobile application built with Ionic and React that allows users to decode Vehicle Identification Numbers (VINs). Users can either enter the VIN manually or scan a VIN barcode using their device's camera. The application then retrieves detailed vehicle information via a REST API.

## Features

**VIN Input**: Enter the VIN manually using a text input field.
**Barcode Scanning**: Scan VIN barcodes directly using the device's camera.
**VIN Validation**: Ensures the VIN is valid before submitting.
**Vehicle Information Display**: Displays detailed vehicle information including manufacturer, model year, vehicle type, and more.
**Loading Indicator**: Shows a loading spinner while the VIN is being decoded.

## Installation

#### Clone the Repository:

``` git clone https://github.com/DanielBojorquezf/vin-decoder-app.git``` 
``` cd vin-decoder-app``` 

#### Install Dependencies:

Make sure you have Node.js and npm installed, then run:

``` npm install``` 

#### Set Up Environment Variables:

Create a .env file in the root of the project and add your API URL:

``` VITE_DECODER_API_URL=https://your-api-url.com/scrape``` 

#### Build and Serve:

To serve the app locally:

``` npm start``` 

#### To build the app for production:

npm run build

#### Running on a Device:

If you want to run the app on a physical device, ensure you have Ionic CLI installed and run:

``` ionic capacitor run android``` 

or

``` ionic capacitor run ios``` 

## Usage
**Enter VIN**: Users can manually enter a 17-character VIN in the input field.
**Scan VIN Barcode**: Tap on the "Scan VIN Barcode" button to open the camera and scan a VIN barcode.
**Decode**: Tap "Decode" to submit the VIN and view the vehicle details.
Dependencies