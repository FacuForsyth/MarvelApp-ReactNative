import React, { useState, useEffect } from 'react';
import axios from 'axios';
import apiParams from '../config.js';
import { Text, View, Image, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import Comic from './Comic';

export default function Comics ({ listComics }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const { ts, apikey, hash } = apiParams;
  //console.log(data);
  useEffect(() => {
    const promisesArray = listComics.map(comic => (
      //console.log(comic.resourceURI)
      //http://gateway.marvel.com/v1/public/comics/10225
      axios.get(`${comic.resourceURI}?ts=${ts}&apikey=${apikey}&hash=${hash}`)
    ));

    Promise.all(promisesArray)
      .then(response => setData(response.map(resp => (
        resp?.data?.data?.results[0]
      ))))
      .catch(error => console.log(error))
      .finally(() => setLoading(false));

  }, []);


  return (
    <View style={{ flex: 1, backgroundColor: '#fff9ec' }}>
      {
        isLoading 
          ? <ActivityIndicator size="large" color="#880018" /> 
          : <FlatList
              contentContainerStyle={{alignItems: 'center'}}
              data={data}
              keyExtractor={({ id }) => id.toString()}
              horizontal
              pagingEnabled
              renderItem={({ item }) => (
                <Comic 
                  key={item.id}
                  name={item.title} 
                  image={`${item?.thumbnail?.path}.${item.thumbnail.extension}`}  
                />
          )}
        />
      }
    </View>
  )
}