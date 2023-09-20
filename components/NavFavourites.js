import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { useDispatch, useSelector } from "react-redux";
import { selectDestination, selectOrigin, setDestination, setOrigin } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';

const data = [
    {
        id: '123',
        icon: 'home',
        description: 'Home',
        location: 'La Puente, CA, USA',
    },
    {
        id: '456',
        icon: 'briefcase',
        description: 'Work',
        location: '5151 State University Dr, Los Angeles, CA 90032',
    },
    {
        id: '789',
        icon: 'heart',
        description: 'Amusement Park',
        location: '100 Universal City Plaza, Universal City, CA 91608',
    },
];

const NavFavourites = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);

    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => (
                <View
                    style={tw`bg-gray-200 h-0.5`}
                />
            )}
            renderItem={({item: { location, description, icon } }) => (
                <TouchableOpacity
                    style={tw`flex-row items-center p-5 mr-40`}
                    onPress={( item ) => {
                        if (!origin) {
                            dispatch(
                                setOrigin({
                                    location: location,
                                    description: description,
                                }),
                                
                                console.log(`Origin: ${location}`),
                            );
                            
                            navigation.navigate("MapScreen");
                        } else if (!destination) {
                            dispatch(
                                setDestination({
                                    location: location,
                                    description: description,
                                }),
        
                                console.log(`Destination: ${location} and ${description}`),
                            );
                            
                            navigation.navigate("RideOptionsCard");
                        }
                    }}
                >
                    <Icon
                        style={{
                            backgroundColor: "#dfdfdf",
                            padding: 6,
                            borderRadius: 100,
                            marginRight: 8,
                        }}
                        name={icon}
                        type="ionicon"
                        color="white"
                        size={18}
                    />
                    <View>
                        <Text style={tw`font-semibold text-lg`}>{description}</Text>
                        <Text className={tw`text-gray-500`}>{location}</Text>
                    </View>
                </TouchableOpacity>
            )}
        />
    )
}

export default NavFavourites