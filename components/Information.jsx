import React, { useEffect, useRef, useState } from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Button } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-easy-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width * 12 / 16);
const imageWidth = dimensions.width;

const styles = StyleSheet.create({
  image: {
    width: imageWidth,
    height: imageHeight,
    marginRight: 10
  },
  title: {
    alignSelf: 'center',
    margin: 10,
    fontWeight: 'bold',
    fontSize: 20
  },
  description: {
    marginHorizontal: 10,
    padding: 10,
    /* borderWidth: 2,
    borderColor: 'darkred',
    borderRadius: 10,
    backgroundColor: '#f2ccc3' */
  }
})

export default function Information({ image, name, description }) {
  const toastRef = useRef() 
  const [isFav, setIsFav] = useState(false)
  const [charactersFav, setCharactersFav] = useState([])
  const [nameCharacter, setNameCharacter] = useState('')
  const [imgCharacter, setimgCharacter] = useState('')

  //console.log('los characters', charactersFav);


const addCharacter = (obj) => {
    //console.log(obj);
    const findCharacter = charactersFav.find(
      (item) => item.name === obj.name,
    );

    if(!findCharacter) {
      const sortedCharacters = [...charactersFav, obj].sort(
        function (a, b) {
          return a.name.localeCompare(b.name);
        },
      );
      setCharactersFav(sortedCharacters);
      //setCharactersFav([...charactersFav, obj])
      return sortedCharacters;
    };
    return charactersFav;
  }

  useEffect(() => {
    if( name && image) {
      setNameCharacter(name);
      setimgCharacter(image)
    }
  }, [])
  
  const addFavorite = async () => {
    
    console.log(imgCharacter);
    
    let characters = JSON.parse(AsyncStorage.getItem('@favorites_characters') || '[]')
    let obj = {
      name: nameCharacter,
      image: imgCharacter,
    }
    characters.push(obj)
    /* const findCharacter = charactersFav.find(
      (item) => item.name === obj.id,
    );

    let characters;

    if (!findCharacter) {
      characters = addCharacter(obj);
    } else {
      console.log('eliminar');
      //characters = removeCharacter(character.id);
    }
    const sortedCharacters = characters.sort(function (a, b) {
      return a.name.localeCompare(b.name);
    });
    console.log('los characters', characters);
   */
    
    //const jsonValue = JSON.stringify(characters)
    await AsyncStorage.setItem('@favorites_characters', JSON.stringify(characters))
    setIsFav(true)
  };

  const removeFavorite = async () => {
    //console.log('eliminado de fav');
    //await AsyncStorage.removeItem('@favorites_characters')
    setIsFav(false)
  }

  const deleteStorage = async () => {
    await AsyncStorage.removeItem('@favorites_characters')
  }

  const getFavorite = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@favorites_characters')
      console.log(JSON.parse(jsonValue));
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      console.log(e);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff9ec' }}>
      <Image 
        style={styles.image}
        source={{uri: image}}
      />
      <Text style={styles.title}>
        {name}
      </Text>
      <Text style={styles.description}>
        {description || 'No description available'}
      </Text>
      <Button onPress={ isFav ? removeFavorite : addFavorite }>
        <MaterialCommunityIcons 
          name={ isFav ? "star" : "star-outline"} 
          /* color={color} size={size} */ 
          /* onPress={ isFav ? removeFavorite : addFavorite } */
        />
        <Text> { isFav ? "Remove Favorites" : "Add Favorites" }</Text>
      </Button>
      <Button onPress={getFavorite}>
        traer los personajes fav
      </Button>
      <Button onPress={deleteStorage}>
        eliminar storage
      </Button>
 
    </View>
  )
}