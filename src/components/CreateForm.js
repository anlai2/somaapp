import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { LinearGradient } from 'expo';
import { emailChanged, passwordChanged, createUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

class CreateForm extends Component {
	onEmailChange(text) {
		this.props.emailChanged(text);
	}

	onPasswordChange(text){
		this.props.passwordChanged(text);
	}

	onButtonPress(){
		const { email, password } = this.props;

		this.props.createUser({ email, password });
	}

	renderError() {
		if (this.props.error) {
			return (
				<View style={{ backgroundColor: 'white'}}>
					<Text style={styles.errorTextStyle}>
					 	{this.props.error}
					</Text>
				</View>
			);
		}
	}

	renderButton() {
		if (this.props.loading) {
			return <Spinner size="large" />;
		}

		return (
			<Button onPress={this.onButtonPress.bind(this)}>
				Create Account
			</Button>
		);
	}

	render(){
		return (
			<LinearGradient colors={['#7834a8', '#4c0844']} style={styles.backgroundStyle}>
				<Card>
					<CardSection>
						<Input 
							label="Email"
							placeholder="email@gmail.com"
							onChangeText={this.onEmailChange.bind(this)}
							value={this.props.email}
						/>
					</CardSection>
					<CardSection>
						<Input
							secureTextEntry
							label="Password"
							placeholder="password"
							onChangeText={this.onPasswordChange.bind(this)}
							value={this.props.password}
						/>
					</CardSection>

					{this.renderError()}

					<CardSection>
						{this.renderButton()}
					</CardSection>
				</Card>
			</LinearGradient>
			);
	}
}

const styles = {
	errorTextStyle: {
		fontSize: 20,
		alignSelf: 'center',
		color: 'red'
	},
	backgroundStyle: {
		flex: 1,
		backgroundColor: '#7834a8'
	}
};

const mapStateToProps = ({auth}) => {
	const {email, password, error, loading} = auth;

	return {
	 	email,
		password,
		error,
	 	loading
	};
};
export default connect(mapStateToProps, { 
	emailChanged, passwordChanged, createUser 
})(CreateForm);