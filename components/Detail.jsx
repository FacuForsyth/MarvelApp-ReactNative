import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/Ionicons';
import Information from './Information';
import Comics from './Comics';
import apiParams from '../config';
import { View, ActivityIndicator } from 'react-native';

const Tab = createBottomTabNavigator();

export default function Detail({ route }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const { ts, apikey, hash, baseURL } = apiParams;
  //console.log(route.params.id);

  useEffect(() => {
    axios.get(`${baseURL}/v1/public/characters/${route.params.id}?ts=${ts}&apikey=${apikey}&hash=${hash}`)
      //.then(response => console.log(response.data.data.results[0]))
      .then(response => setData(response.data.data.results[0]))
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    
    <Tab.Navigator
      //initialRouteName="Information"
      
      tabBarOptions={{
        //tabBarActiveTintColor: 'white',
        activeTintColor: 'white',
        inactiveTintColor: '#ced4da',
        activeBackgroundColor: '#880018',
        inactiveBackgroundColor: '#880018',
      }}
    >
      <Tab.Screen 
        name="Information" 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons 
              name="person" 
              color={color} 
              size={size}
            />
          )
        }}
      >
        {() => 
          (isLoading
            ? <View style={{ flex: 1, backgroundColor: '#fff9ec' }}>
                <ActivityIndicator size="large" color="#880018" />
              </View> 
            : <Information 
              image={`${data?.thumbnail?.path}.${data.thumbnail.extension}`}
              name={data?.name}
              description={data?.description} 
            />
          )
        }
      </Tab.Screen>
      <Tab.Screen 
        name="Comics" 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="book" color={color} size={size} />
          )
        }}
      >
        {() => 
          (isLoading
            ? <View style={{ flex: 1, backgroundColor: '#fff9ec' }}>
                <ActivityIndicator size="large" color="#880018" />
              </View> 
            : <Comics
                listComics={data?.comics?.items} 
              />
          )
        }
      </Tab.Screen>
    </Tab.Navigator>
  );
};