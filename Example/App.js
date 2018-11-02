import React, { Component } from 'react';
import {StyleSheet, Text, View, Dimensions } from 'react-native';

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
