import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export const localRestaurants = [
    {
      name: "Beachside Bar",
      image_url:
        "https://static.onecms.io/wp-content/uploads/sites/9/2020/04/24/ppp-why-wont-anyone-rescue-restaurants-FT-BLOG0420.jpg",
      categories: ["Cafe", "Bar"],
      price: "$$",
      review_count: 1244,
      rating: 4.5,
      location: {
        city: "San Francisco",
        country: "US",
        address2: "",
        address3: "",
        state: "CA",
        address1: "373 Columbus Ave",
        zip_code: "94133"
      },
    },
    {
      name: "Benihana",
      image_url:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmVzdGF1cmFudCUyMGludGVyaW9yfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
      categories: ["Cafe", "Bar"],
      price: "$$",
      review_count: 1244,
      rating: 3.7,
      location: {
        city: "San Francisco",
        country: "US",
        address2: "",
        address3: "",
        state: "CA",
        address1: "373 Columbus Ave",
        zip_code: "94133"
      },
    },
    {
      name: "India's Grill",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Restaurant_N%C3%A4sinneula.jpg/640px-Restaurant_N%C3%A4sinneula.jpg",
      categories: ["Indian", "Bar"],
      price: "$$",
      review_count: 700,
      rating: 4.9,
      location: {
        city: "San Francisco",
        country: "US",
        address2: "",
        address3: "",
        state: "CA",
        address1: "373 Columbus Ave",
        zip_code: "94133"
      },
    },
];

export default function RestaurantItems({ navigation, ...props }) {
  return (
    <>
      {props.restaurantData.map((restaurant, index) => (
        <TouchableOpacity
          key={index}
          activeOpacity={1}
          style={{ marginBottom: 30 }}
          onPress={() =>
            navigation.navigate("RestaurantDetail", {
              name: restaurant.name,
              image: restaurant.image_url,
              price: restaurant.price,
              reviews: restaurant.review_count,
              rating: restaurant.rating,
              categories: restaurant.categories,
              city: restaurant.location.city,
              state: restaurant.location.state,
              address: restaurant.location.address1,
              zipcode: restaurant.location.zip_code,
            })
          }
        >
          <View
            style={{ marginTop: 10, padding: 15, backgroundColor: "white" }}
          >
            <RestaurantImage image={restaurant.image_url} />
            <RestaurantInfo name={restaurant.name} rating={restaurant.rating} price={restaurant.price} review={restaurant.review_count} city={restaurant.location.city} 
            state={restaurant.location.state} address={restaurant.location.address1} zipcode={restaurant.location.zip_code}/>
          </View>
        </TouchableOpacity>
      ))}
    </>
  );
}

const RestaurantImage = (props) => (
    <>
   <Image
      source={{
        uri: props.image
      }}
      style={{ width: '100%', height: 180}}
    />
    <TouchableOpacity style={{ position: 'absolute', right: 20, top: 20 }}>
        <MaterialCommunityIcons name='heart-outline' size={25} color="#fff"/>
    </TouchableOpacity>
    </>
);

const RestaurantInfo = (props) => (
    <View 
        style={{
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginTop: 10,
        }}
    >
        <View>
            <Text style={{ fontSize: 15, fontWeight: 'bold'}}>
                {props.name}
            </Text>
            <View style={{flexDirection: "row"}}>
              <Text style={{ fontSize: 13, color: "gray"}}>30-45 • min</Text>
              <Text style={{ fontSize: 13, color: "gray", marginLeft: 5}}>| {props.price}</Text>
              <Text style={{ fontSize: 13, color: "gray", marginLeft: 5}}>| {props.review} Reviews</Text>
            </View>
            <Text style={{ fontSize: 13, color: "gray" }}>{props.address}, {props.city}, {props.state} {props.zipcode}</Text>
        </View>
        <View 
            style={{ 
                backgroundColor: "black", 
                height: 30, 
                width: 30, 
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 15,
            }}
        >
            <Text style={{color: "white"}}>{props.rating}</Text>
        </View>
    </View>
);