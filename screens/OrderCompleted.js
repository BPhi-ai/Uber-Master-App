import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, {useState} from 'react'
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import { Divider } from 'react-native-elements/dist/divider/Divider';


export default function OrderCompleted(props) {
  const {image} = props.route.params;
  const { items, restaurantName } = useSelector((state) => state.cartReducer.selectedItems);
  const total = items.map(item => Number(item.price.replace('$', ''))).reduce((prev, curr) => prev + curr, 0);
  const totalUSD = total.toLocaleString('en', {
      style: 'currency',
      currency: 'USD',
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
     <Divider width={5} color='black' style={{bottom: -185}}/>
    {/* green checkmark */}
    <View
      style={{
        margin: 45,
        alignItems: "center",
        height: "100%",
        marginTop: 210,
      }}
    >
       <RestaurantImage image={image}/>
      <LottieView
        style={{ height: 100, alignSelf: "center", marginBottom:30, zIndex: 999}}
        source={require("../assets/animations/check-mark.json")}
        autoPlay
        speed={0.5}
        loop={false}
      />
      <Text style={{ fontSize: 20, fontWeight: "bold"}}>
        Your order at {restaurantName} has been placed for {totalUSD}.
      </Text>
      <LottieView
          style={{ height: 200, alignSelf: "center"}}
          source={require("../assets/animations/cooking.json")}
          autoPlay
          speed={0.5}
      />
      <TouchableOpacity style= {{
            marginTop: 70,
            backgroundColor: "black",
            flexDirection: "row",
            justifyContent: "flex-end",
            padding: 15,
            borderRadius: 30,
            width: 300,
            position: 'relative'
        }}
        onPress={() => props.navigation.navigate("FoodEats")}>
            <Text style={{ color: "white", fontSize: 20, marginRight: 105}}> Return </Text>
        </TouchableOpacity>
        <TouchableOpacity style= {{
            marginTop: 70,
            backgroundColor: "black",
            flexDirection: "row",
            justifyContent: "flex-end",
            padding: 15,
            borderRadius: 50,
            width: 90,
            height: 90,
            position: 'relative',
            top: -567,
        }}>
        </TouchableOpacity>
    </View>
  </SafeAreaView>
  )
}

const RestaurantImage = (props) => (
    <Image source={{ uri: "https://freepixel-prod.s3.amazonaws.com/thumb/free-photos-this-image-showcases-a-formal-christmas-dinner-setting-with-a-black-table-displaying-elegant-plates-th-10008092.jpg"}} style={{ width: "140%",  height: 230, marginTop: -260, marginBottom: -60}} />
);