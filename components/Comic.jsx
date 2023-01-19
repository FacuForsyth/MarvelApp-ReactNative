import * as React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  outer: {
    width,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    width: 360,
    /* backgroundColor: 'rgb(223, 184, 184)',
    borderWidth: 2,
		borderColor: 'darkred',
    borderRadius: 10, */
		alignItems: 'center',
		justifyContent: 'center',
		margin: 20
  },
  image: {
    resizeMode: 'stretch',
    marginTop: 10,
    height: 530,
    width: 354
  },
  font: {
    padding: 10,
    fontWeight: 'bold',
    textAlign: 'center'
  }
})

export default function Comic({ name, image }) {
  return (
    <View style={styles.outer}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{uri: image}}
        />
        <Text style={styles.font}>{name}</Text>
      </View>
    </View>
  )
};