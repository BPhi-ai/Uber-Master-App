import { View, Text, Image, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import { Divider } from 'react-native-elements/dist/divider/Divider'
import { useDispatch, useSelector } from 'react-redux'
import BouncyCheckbox from 'react-native-bouncy-checkbox'

export default function MenuItems({restaurantName, foods, hideCheckbox, marginLeft}) {
  const dispatch = useDispatch();

  const selectItem = (item, checkboxValue) => 
  dispatch({
    type: 'ADD_TO_CART',
    payload: {...item, restaurantName: restaurantName, checkboxValue: checkboxValue}, 
  });

  const cartItems = useSelector(state => state.cartReducer.selectedItems.items);

  const isFoodInCart = (food, cartItems) => (
    Boolean(cartItems.find((item) => item.title == food.title)));

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    {foods.map((food, index) => (
      <View key={index}>
        <View style={styles.menuItemStyle}>
          {hideCheckbox ? (<></>) : (<BouncyCheckbox onPress={(checkboxValue) => selectItem(food, checkboxValue)}
          isChecked={isFoodInCart(food, cartItems)}/>)}
          <FoodInfo food={food}/>
          <FoodImage food={food} marginLeft={marginLeft ? marginLeft : 0}/>
        </View>
        <Divider 
          width={.5} 
          orientation='vertical' 
          style={{ marginHorizontal: 20}}
        />
      </View>
    ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    menuItemStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20,
    },
    titleStyle: {
      fontSize: 19,
      fontWeight: '600',
    }
});

const FoodInfo = (props) => (
    <View style={{ width: 240, justifyContent: "space-evenly" }}>
        <Text style={styles.titleStyle}>{props.food.title}</Text>
        <Text>{props.food.description}</Text>
        <Text>{props.food.price}</Text>
    </View>
)

const FoodImage = ({marginLeft, ...props}) => (
  <View>
    <Image 
      source={{uri: props.food.image}}
      style={{ width: 100, height: 100, borderRadius: 8, marginLeft: marginLeft }}
    />
  </View>
)