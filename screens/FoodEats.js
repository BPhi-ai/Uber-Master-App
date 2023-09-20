import { View, ScrollView, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderTabs from '../components/foodComponents/home/HeaderTabs'
import SearchBar from '../components/foodComponents/home/SearchBar';
import Categories from '../components/foodComponents/home/Categories';
import RestaurantItems, { localRestaurants } from '../components/foodComponents/home/RestaurantItems';
import {YELP_APIKEY} from "@env";
import { Divider } from 'react-native-elements/dist/divider/Divider';
import BottomTabs from '../components/foodComponents/home/BottomTabs';

const YELP_API_KEY = YELP_APIKEY;

export default function FoodEats({navigation}) {
    const [restaurantData, setRestaurantData] = useState(localRestaurants);
    const [city, setCity] = useState('Los Angeles');
    const [activeTab, setActiveTab] = useState("Delivery");
  
    const getRestaurantsFromYelp = () => {
      const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}`;
  
      const apiOptions = {
        headers: {
          Authorization: `Bearer ${YELP_API_KEY}`,
        },
      };
  
      return fetch(yelpUrl, apiOptions)
          .then((res) => res.json())
          .then((json) => 
            setRestaurantData(
              json.businesses.filter((business) => 
                business.transactions.includes(activeTab.toLowerCase())
              )
            )
          );
    };
  
    useEffect(() => {
      getRestaurantsFromYelp();
    }, [city, activeTab])
  
    return (
      <SafeAreaView style={{ backgroundColor: "#eee", flex: 1}}>
        <View style={{ backgroundColor: "#E5E5E5", padding: 15}}>
          <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab}/>
          <SearchBar cityHandler={setCity} />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Categories />
          <RestaurantItems restaurantData={restaurantData} navigation={navigation}/>
        </ScrollView>
        <Divider width={1}/>
        <BottomTabs />
      </SafeAreaView>
    );
}