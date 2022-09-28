import { Animated, Dimensions, Easing } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from '@expo/vector-icons/Ionicons';
import OnboardingScreen from '../screens/Onboarding';
import { Header } from '../components';
import { Images, materialTheme } from '../constants/';

import HomeScreen from '../screens/Home';
import ProScreen from '../screens/Pro';

import CustomDrawerContent from './Menu';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const { width } = Dimensions.get('screen');

const profile = {
	avatar: Images.Profile,
	name: 'Rachel Brown',
	type: 'Seller',
	plan: 'Pro',
	rating: 4.8,
};

function HomeStack(props) {
	return (
		<Stack.Navigator
			screenOptions={{
				mode: 'card',
				headerShown: 'screen',
			}}
		>
			<Stack.Screen
				name="Home"
				component={HomeScreen}
				options={{
					header: ({ navigation, scene }) => (
						<Header
							search
							tabs
							title="Home"
							navigation={navigation}
							scene={scene}
						/>
					),
				}}
			/>
			{/* <Stack.Screen
				name="Pro"
				component={ProScreen}
				options={{
					header: ({ navigation, scene }) => (
						<Header
							back
							white
							transparent
							title=""
							navigation={navigation}
							scene={scene}
						/>
					),
					headerTransparent: true,
				}}
			/> */}
		</Stack.Navigator>
	);
}

function AppStack(props) {
	return (
		<Drawer.Navigator
			style={{ flex: 1 }}
			// drawerContent={props => (
			// 	<CustomDrawerContent {...props} profile={profile} />
			// )}
			drawerStyle={{
				backgroundColor: 'white',
				width: width * 0.8,
			}}
			drawerContentOptions={{
				activeTintColor: 'white',
				inactiveTintColor: '#000',
				activeBackgroundColor: materialTheme.COLORS.ACTIVE,
				inactiveBackgroundColor: 'transparent',
				itemStyle: {
					width: width * 0.74,
					paddingHorizontal: 12,
					// paddingVertical: 4,
					justifyContent: 'center',
					alignContent: 'center',
					// alignItems: 'center',
					overflow: 'hidden',
				},
				labelStyle: {
					fontSize: 18,
					fontWeight: 'normal',
				},
			}}
			initialRouteName="Home"
		>
			<Drawer.Screen name="Home" component={HomeStack} />
		</Drawer.Navigator>
	);
}

export default function OnboardingStack(props) {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Onboarding"
				component={OnboardingScreen}
				option={{
					headerTransparent: true,
				}}
			/>
			<Stack.Screen name="App" component={AppStack} />
		</Stack.Navigator>
	);
}
