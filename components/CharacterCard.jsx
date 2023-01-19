import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, Image, TouchableOpacity, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd'
  },
  image: {
    paddingRight: 10,
    width: 70,
    height: 70,
    borderRadius: 50,
    borderColor: '#000',
    borderWidth: 2
  },
  containerText: {
    paddingLeft: 15,
    justifyContent: 'space-around'
  },
  name: {
    fontWeight: 'bold',
  },
  description: {
    color: '#777',
    fontSize: 12
  }
})

export default function CharacterCard({ id, image, name, description, comics /* navigation */}) {
  const navigation = useNavigation();
 //console.log(id);
  return (
    <TouchableOpacity 
			style={styles.container}
			onPress={() => navigation.navigate('Detail', { id: id})}
	  >
			<Image 
				style={styles.image}
				source={{ uri: image}}
			/>
      <View style={styles.containerText}>
        <Text style={styles.name}>{name}</Text>
        
        {!!description && (
          <Text style={styles.description}>
            Description available
          </Text>
        )}
        {!description && (
          <Text style={styles.description}>
            Description not available
          </Text>
        )}
        <Text style={styles.description}>
          {`Comics: ${comics}`}
        </Text>
      </View>
    </TouchableOpacity>
  );
}