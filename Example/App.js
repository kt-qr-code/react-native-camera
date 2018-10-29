/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions } from 'react-native';

import { RNCamera } from 'react-native-camera';

const instructions = Platform.select({
	ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
	android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu'
});

export default class App extends Component {
	constructor() {
		super();
		this.state = {
			myText: 'My Original Text'
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
				onGoogleVisionBarcodesDetected={({ barcodes }) => {

				  if (barcodes) {
				    this.setState({myText: JSON.stringify(barcodes)})
				  }
				  else {
				    this.setState({myText: 'No barcode detected.'})
				  }

				}}
				// onBarCodeRead={({ barcodes }) => {
				// 	if (barcodes) {
				// 		this.setState({ myText: JSON.stringify(barcodes) });
				// 	} else {
				// 		this.setState({ myText: 'No barcode detected.' });
				// 	}
				// }}
			>
				<View style={styles.textBg}>
					<Text style={styles.scanText}>{this.state.myText}</Text>
				</View>
			</RNCamera>
		);
	}

	takePicture = async function() {
		console.log('taking a picture');
		if (this.camera) {
			const options = { quality: 0.5, base64: true };
			const data = await this.camera.takePictureAsync(options);
			console.log(data.uri);
		}
	};
}

const deviceHeight = Dimensions.get('window').height;

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
	textBg: {
		width: deviceWidth,
		height: 50,
		justifyContent: 'center',
		backgroundColor: '#43474a',
		marginTop: 0
	},
	preview: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	scanText: {
		color: 'white',
		textAlign: 'center'
	}
});
