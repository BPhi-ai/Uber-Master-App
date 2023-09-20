import { View, Text, Image } from 'react-native'
import React from 'react'

export default function About(props) {
    const { name, image, price, reviews, rating, categories, city, state, address, zipcode } =
      props.route.params;
  
    const formattedCategories = categories.map((cat) => cat.title).join(" • ");
  
    const description = `${formattedCategories} ${
      price ? " • " + price : ""
    } • 🎫 • ${rating} ⭐ (${reviews}+ Reviews)`;
    return (
      <>
        <View>
          <RestaurantImage image={image} />
          <RestaurantName name={name} />
          <RestaurantDescription description={description} />
        </View>
        <View>
          <Text style={{fontWeight: "600", fontSize: 15, marginLeft: 15, marginTop: 5}}>
            {address}, {city}, {state} {zipcode}
          </Text>
        </View>
      </>
    );
  }
  
  const RestaurantImage = (props) => (
    <Image source={{ uri: props.image }} style={{ width: "100%", height: 180 }} />
  );
  
  const RestaurantName = (props) => (
    <Text
      style={{
        fontSize: 29,
        fontWeight: "600",
        marginTop: 10,
        marginHorizontal: 15,
      }}
    >
      {props.name}
    </Text>
  );
  
  const RestaurantDescription = (props) => (
    <Text
      style={{
        marginTop: 10,
        marginHorizontal: 15,
        fontWeight: "400",
        fontSize: 15.5,
      }}
    >
      {props.description}
    </Text>
  );