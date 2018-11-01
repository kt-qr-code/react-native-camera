# React Native Camera with Dynamsoft Barcode Reader

The project based on [react-native-camera](https://github.com/react-native-community/react-native-camera) supports [Dynamsoft Barcode Reader for Android](https://www.dynamsoft.com/Products/barcode-scanner-sdk-android.aspx). 


## Usage

Install `react-native-camera`:

```
npm install react-native-camera --save
react-native link react-native-camera
```

Overwrite `node_modules/react-native-camera` with the project.

Write the code in `App.js`:

```jsx
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions } from 'react-native';

import { RNCamera } from 'react-native-camera';

export default class App extends Component {
	constructor() {
		super();
		this.state = {
			barcodeResult: 'No barcode detected.'
		};
	}

	render() {
		return (
			<RNCamera
				ref={(ref) => {
					this.camera = ref;
				}}
				style={styles.preview}
				type={RNCamera.Constants.Type.back}
				flashMode={RNCamera.Constants.FlashMode.on}
				permissionDialogTitle={'Permission to use camera'}
        permissionDialogMessage={'We need your permission to use your camera phone'}
        onDynamsoftVisionBarcodesDetected={({ barcodes }) => {

				  if (barcodes) {
            if (barcodes.length == 0) {
              this.setState({barcodeResult: 'No barcode detected.'})
            }
            else {
              let text = '';
              for (let i in barcodes) {
                let type = barcodes[i]['type'];
                let data = barcodes[i]['data'];
                text += 'Type: ' + type + ', Value: ' + data;
              }
              this.setState({barcodeResult: text})
            }
				  }
				  else {
				    this.setState({barcodeResult: 'No barcode detected.'})
				  }

        }}
			>
				<View style={styles.textBg}>
					<Text style={styles.scanText}>{this.state.barcodeResult}</Text>
				</View>
			</RNCamera>
		);
	}
}

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
	textBg: {
		width: deviceWidth,
		height: 100,
		marginTop: deviceHeight - 100
	},
	preview: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	scanText: {
		color: 'white',
    textAlign: 'center',
    fontSize: 20
	}
});

```

![react native camera with Dynamsoft Barcode Reader](https://www.codepool.biz/wp-content/uploads/2018/11/react-native-camera-dbr.png)