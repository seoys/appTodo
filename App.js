import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { Text, View, Image } from 'react-native';
import AppLoading from 'expo-app-loading';
import { Images, products, materialTheme } from './constants'
import { Block, GalioProvider } from 'galio-framework';
import { NavigationContainer } from '@react-navigation/native';
import Screens from './navigation/Screens'


// cache app images
const assetImages = [
  Images.Pro,
  Images.Profile,
  Images.Avatar,
  Images.Onboarding,
];

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default class App extends React.Component {

  state = {
    isLodingComplete : false,
  }

  render() {

    return (
        <NavigationContainer>
          <GalioProvider theme={materialTheme}>
            <Block flex>
              {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
              <Screens/>
            </Block>
           </GalioProvider>
        </NavigationContainer>
      )
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      ...cacheImages(assetImages),
    ]);
  };


  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    console.log('aaaaa')
    this.setState({ isLoadingComplete: true });
  };
}

