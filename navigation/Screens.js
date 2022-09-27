import { Animated, Dimensions, Easing } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import OnboardingScreen from '../screens/Onboarding';
import { Header, Icon } from '../components';
import { Images, materialTheme } from '../constants/';

import HomeScreen from '../screens/Home';
import ProScreen from '../screens/Pro';
import ProfileScreen from '../screens/Profile';
import SettingsScreen from '../screens/Settings';
import ComponentsScreen from '../screens/Components';

import CustomDrawerContent from './Menu';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const { width } = Dimensions.get('screen');

const profile = {
	avatar: Images.Profile,
	name: 'Rachel Brown',
	type: 'Seller',
	plan: 'Pro',
	rating: 4.8
};

function ComponentsStack(props) {
	return (
		<Stack.Navigator
			screenOptions={{
				mode: 'card',
				headerShown: 'screen'
			}}
		>
			<Stack.Screen
				name="Components"
				component={ComponentsScreen}
				options={{
					header: ({ navigation, scene }) => (
						<Header title="Components" scene={scene} navigation={navigation} />
					)
				}}
			/>
		</Stack.Navigator>
	);
}

function SettingsStack(props) {
	return (
		<Stack.Navigator
			initialRouteName="Settings"
			screenOptions={{
				mode: 'card',
				headerShown: 'screen'
			}}
		>
			<Stack.Screen
				name="Settings"
				component={SettingsScreen}
				options={{
					header: ({ navigation, scene }) => (
						<Header title="Settings" scene={scene} navigation={navigation} />
					)
				}}
			/>
		</Stack.Navigator>
	);
}

function ProfileStack(props) {
	return (
		<Stack.Navigator
			initialRouteName="Profile"
			screenOptions={{
				mode: 'card',
				headerShown: 'screen'
			}}
		>
			<Stack.Screen
				name="Profile"
				component={ProfileScreen}
				options={{
					header: ({ navigation, scene }) => (
						<Header white transparent title="Profile" scene={scene} navigation={navigation} />
					),
					headerTransparent: true
				}}
			/>
		</Stack.Navigator>
	);
}

function HomeStack(props) {
	return (
		<Stack.Navigator
			screenOptions={{
				mode: 'card',
				headerShown: 'screen'
			}}
		>
			<Stack.Screen
				name="Home"
				component={HomeScreen}
				options={{
					header: ({ navigation, scene }) => (
						<Header search tabs title="Home" navigation={navigation} scene={scene} />
					)
				}}
			/>
			<Stack.Screen
				name="Pro"
				component={ProScreen}
				options={{
					header: ({ navigation, scene }) => (
						<Header back white transparent title="" navigation={navigation} scene={scene} />
					),
					headerTransparent: true
				}}
			/>
		</Stack.Navigator>
	);
}

function AppStack(props) {
	return (
		<Drawer.Navigator
			drawerContent={(props) => <CustomDrawerContent {...props} profile={profile} />}
			drawerStyle={{
				backgroundColor: 'white',
				width: width * 0.8
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
					overflow: 'hidden'
				},
				labelStyle: {
					fontSize: 18,
					fontWeight: 'normal'
				}
			}}
			initialRouteName="Home"
			style={{ flex: 1 }}
		>
			<Drawer.Screen
				name="Home"
				component={HomeStack}
				options={{
					drawerIcon: ({ focused }) => (
						<Icon
							size={16}
							name="shop"
							family="GalioExtra"
							color={focused ? 'white' : materialTheme.COLORS.MUTED}
						/>
					)
				}}
			/>
			<Drawer.Screen
				name="Woman"
				component={ProScreen}
				options={{
					drawerIcon: ({ focused }) => (
						<Icon
							size={16}
							name="md-woman"
							family="ionicon"
							color={focused ? 'white' : materialTheme.COLORS.MUTED}
							style={{ marginLeft: 4, marginRight: 4 }}
						/>
					)
				}}
			/>
			<Drawer.Screen
				name="Profile"
				component={ProfileStack}
				options={{
					drawerIcon: ({ focused }) => (
						<Icon
							size={16}
							name="circle-10"
							family="GalioExtra"
							color={focused ? 'white' : materialTheme.COLORS.MUTED}
						/>
					)
				}}
			/>
			<Drawer.Screen
				name="Settings"
				component={SettingsStack}
				options={{
					drawerIcon: ({ focused }) => (
						<Icon
							size={16}
							name="gears"
							family="font-awesome"
							color={focused ? 'white' : materialTheme.COLORS.MUTED}
							style={{ marginRight: -3 }}
						/>
					)
				}}
			/>
			<Drawer.Screen
				name="Components"
				component={ComponentsStack}
				options={{
					drawerIcon: ({ focused }) => (
						<Icon
							size={16}
							name="md-switch"
							family="ionicon"
							color={focused ? 'white' : materialTheme.COLORS.MUTED}
							style={{ marginRight: 2, marginLeft: 2 }}
						/>
					)
				}}
			/>
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
					headerTransparent: true
				}}
			/>
			<Stack.Screen name="App" component={AppStack} />
		</Stack.Navigator>
	);
}
