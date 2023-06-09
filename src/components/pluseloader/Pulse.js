import React from 'react';
import {Animated, Dimensions, Easing, StyleSheet, View} from 'react-native';
import {HEIGHT_RATIO} from '../../utils/regex';

const { height, width } = Dimensions.get('window');

export default class Pulse extends React.Component {
	constructor(props) {
		super(props);

		this.anim = new Animated.Value(0);
	}

	componentDidMount() {
		Animated.timing(this.anim, {
			toValue: 1,
			duration: this.props.interval,
			easing: Easing.in,
		})
		.start();
	}

	render() {
		const { size, pulseMaxSize, borderColor, backgroundColor, getStyle, pulseStyle } = this.props;

		return (
			<View style={[styles.circleWrapper, pulseStyle, {
				width: pulseMaxSize,
				height: pulseMaxSize,
				marginLeft: -pulseMaxSize/2,
				marginTop: -pulseMaxSize/2,
			}]}>
				<Animated.View
					style={[styles.circle, {
						borderColor,
						backgroundColor,
						width: this.anim.interpolate({
							inputRange: [0, 1],
							outputRange: [size, pulseMaxSize]
						}),
						height: this.anim.interpolate({
							inputRange: [0, 1],
							outputRange: [size, pulseMaxSize]
						}),
						borderRadius: pulseMaxSize/2,
						opacity: this.anim.interpolate({
							inputRange: [0, 1],
							outputRange: [1, 0]
						})
					}, getStyle && getStyle(this.anim)]}
				/>
			</View>
		);
	}
}


const styles = StyleSheet.create({
	circleWrapper: {
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		left: width/2,
		top: HEIGHT_RATIO(.88)/2,
	},
	circle: {
		borderWidth: 4 * StyleSheet.hairlineWidth,
	},
});
