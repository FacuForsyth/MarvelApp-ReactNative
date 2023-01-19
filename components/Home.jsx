import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import apiParams from '../config';
import CharacterCard from './CharacterCard';

export default function Home() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [moreCharacters, setmoreCharacters] = useState(20)
  const { ts, apikey, hash, baseURL } = apiParams;

  useEffect(() => {
    //axios.get(`${baseURL}/v1/public/characters?ts=${ts}&apikey=${apikey}&hash=${hash}`)
    axios.get(`${baseURL}/v1/public/characters`, {
      params: {
        ts,
        apikey,
        hash,
        offset: 0,
        limit: moreCharacters, //sumar 10
      }
    })
    .then(response => setData(response.data.data.results))
    //.then(response => setData([...data, ...response.data.data.results]))
    .catch(error => console.error(error))
    .finally(() => setLoading(false));
  }, [moreCharacters]);
//console.log(moreCharacters);
  function searchCharacter() {
    if(search) {
      setLoading(true);
      axios.get(`${baseURL}/v1/public/characters`, {
        params: {
          ts,
          apikey,
          hash,
          limit: 10,
          offset: 0,
          nameStartsWith: search
        }
      })
        .then(response => setData(response.data.data.results))
        .catch(error => console.error(error))
        .finally(() => setLoading(false));
    }
  }

  const renderLoader = () => {
    return (
      <View style={{ marginVertical: 50, alignItems: 'center' }}>
        <ActivityIndicator size='large' color='#aaa' />
      </View>
    )
  };

  const loadMoreItem = () => {
    console.log('cargar mas personajes');
    setmoreCharacters(moreCharacters + 10);
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff9ec' }}>
      {isLoading
        ? <ActivityIndicator size="large" color="#880018" />
        : (
          <View>
          <Searchbar
            placeholder="Search for character..."
            onChangeText={value => setSearch(value)}
            value={search}
            onIconPress={searchCharacter}
            onSubmitEditing={searchCharacter}
          />
          <FlatList 
            data={data}
            keyExtractor={({ id }) => id.toString()}
            renderItem={({ item }) => (
              <CharacterCard 
                id={item.id}
                image={`${item?.thumbnail?.path}.${item?.thumbnail.extension}`} 
                name={item.name}
                description={item.description}
                comics={item.comics.available}
              />
            )}
            ListFooterComponent={renderLoader}
            onEndReached={loadMoreItem}
            onEndReachedThreshold={0}
          />
          </View>
        )
      }
      </View>
  );
}