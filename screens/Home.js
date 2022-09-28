import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Button, Block, Text, Input, theme } from 'galio-framework';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import _ from 'lodash';
import * as Location from 'expo-location';
import Icon from '../components/Icon';

import { Product } from '../components/';
const { width } = Dimensions.get('screen');

const openAPI = 'http://openapi.seoul.go.kr:8088';

export default Home = () => {
	const [facilitys, setFacilitys] = useState({});
	const [location, setLocation] = useState({
		latitude: '',
		longitude: '',
	});
	const [errorMsg, setErrorMsg] = useState();

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				setErrorMsg('Permission to access location was denied');
				return;
			}

			let location = await Location.getCurrentPositionAsync({});

			const { latitude, longitude } = location.coords;

			console.log('location', latitude, longitude);

			setLocation({
				latitude,
				longitude,
			});
		})();
	}, []);

	useEffect(() => {
		bicyclePlaceLists();
	}, []);

	const bicyclePlaceLists = async () => {
		const url = `${openAPI}/4152437650736f7336354770566f68/json/CrtfcUpsoInfo/1/10/%20/%20/%20/3240000/%20`;

		await axios
			.get(url)
			.then(resp => {
				const { row } = resp.data.CrtfcUpsoInfo;
				setFacilitys(row);
			})
			.catch(err => {
				console.log(`ERRor : ${err}`);
				setFacilitys({});
			});
	};

	const search = () => {
		bicyclePlaceLists();
	};

	renderSearch = () => {
		const { navigation } = this.props;
		const iconCamera = (
			<></>
			// <Icon
			// 	size={16}
			// 	color={theme.COLORS.MUTED}
			// 	name="zoom-in"
			// 	family="material"
			// />
		);

		return (
			<Input
				right
				color="black"
				style={styles.search}
				placeholder="What are you looking for?"
				onFocus={() => search()}
			/>
		);
	};

	renderTabs = () => {
		const { navigation } = this.props;

		return (
			<Block row style={styles.tabs}>
				<Button
					shadowless
					style={[styles.tab, styles.divider]}
					onPress={() => navigation.navigate('Pro')}
				>
					<Block row middle>
						<Ionicons name="pluscircleo" size={24} color="black" />
						<Text size={16} style={styles.tabTitle}>
							Categories
						</Text>
					</Block>
				</Button>
				<Button
					shadowless
					style={styles.tab}
					onPress={() => navigation.navigate('Pro')}
				>
					<Block row middle>
						<Icon
							size={16}
							name="camera-18"
							family="GalioExtra"
							style={{ paddingRight: 8 }}
						/>
						<Text size={16} style={styles.tabTitle}>
							Best Deals
						</Text>
					</Block>
				</Button>
			</Block>
		);
	};

	renderMap = (latitude, longitude) => {
		return (
			<Block center>
				<MapView
					style={styles.map}
					initialRegion={{
						latitude,
						longitude,
						latitudeDelta: 0.04,
						longitudeDelta: 0.04,
					}}
				>
					<Marker
						title={'내 위치'}
						coordinate={{
							latitude,
							longitude,
						}}
					/>
				</MapView>
			</Block>
		);
	};

	renderProducts = () => {
		return (
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.products}
			>
				<Block flex>
					{!_.isEmpty(facilitys) &&
						facilitys.map((item, index) => (
							<Product
								product={{
									title: `${item.UPSO_NM}`,
									image: 'https://source.unsplash.com/dS2hi__ZZMk/840x840',
									price: `${item.FOOD_MENU}`,
									COT_COORD_X: `${item.X_CNTS}`,
									COT_COORD_Y: `${item.Y_DNTS}`,
								}}
								style={{ marginRight: theme.SIZES.BASE }}
								key={index}
							/>
						))}

					{/* <Block flex row>
						<Product
							product={products[1]}
							style={{ marginRight: theme.SIZES.BASE }}
						/>
						<Product product={products[2]} />
					</Block> */}
					{/* <Product product={products[3]} horizontal /> */}
					{/* <Product product={products[4]} full /> */}
				</Block>
			</ScrollView>
		);
	};

	return (
		<Block flex center style={styles.home}>
			{location?.latitude &&
				renderMap(location.latitude, location.longitude)}
			{renderProducts()}
			{/* {this.renderMap()}
			{this.renderProducts()} */}
		</Block>
	);
};

const styles = StyleSheet.create({
	home: {
		width: width,
	},
	search: {
		height: 48,
		width: width - 32,
		marginHorizontal: 16,
		borderWidth: 1,
		borderRadius: 3,
	},
	header: {
		backgroundColor: theme.COLORS.WHITE,
		shadowColor: theme.COLORS.BLACK,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowRadius: 8,
		shadowOpacity: 0.2,
		elevation: 4,
		zIndex: 2,
	},
	tabs: {
		marginBottom: 24,
		marginTop: 10,
		elevation: 4,
	},
	tab: {
		backgroundColor: theme.COLORS.TRANSPARENT,
		width: width * 0.5,
		borderRadius: 0,
		borderWidth: 0,
		height: 24,
		elevation: 0,
	},
	tabTitle: {
		lineHeight: 19,
		fontWeight: '300',
	},
	divider: {
		borderRightWidth: 0.3,
		borderRightColor: theme.COLORS.MUTED,
	},
	products: {
		width: width - theme.SIZES.BASE * 2,
		paddingVertical: theme.SIZES.BASE * 2,
	},
	map: {
		width: Dimensions.get('window').width,
		height: 250,
	},
});
