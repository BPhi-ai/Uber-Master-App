import { View, Text, SafeAreaView, TouchableOpacity, FlatList, Image } from 'react-native';
import React, { useState } from 'react';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectTravelTimeInformation } from '../slices/navSlice';
import tw from 'tailwind-react-native-classnames';

const data = [
    {
        id: "Uber-X-123",
        title: "Uber X",
        multiplier: 1,
        image: "https://links.papareact.com/3pn",
    },
    {
        id: "Uber-Comfort",
        title: "Uber Comfort",
        multiplier: 1.1,
        image: "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/package_UberComfort_new_2022.png",
    },
    {
        id: "Uber-XL-456",
        title: "Uber XL",
        multiplier: 1.2,
        image: "https://links.papareact.com/5w8",
    },
    {
        id: "Uber-LUX-789",
        title: "Uber LUX",
        multiplier: 1.75,
        image: "https://links.papareact.com/7pf",
    },
];

const SURGE_CHARGE_PRICE = 1.5;

const RideOptionsCard = () => {
    const navigation = useNavigation();
    const [selected, setSelected] = useState(null);
    const travelTimeInformation = useSelector(selectTravelTimeInformation);

    return (
        <SafeAreaView style={tw`bg-white flex-grow`}>
            <View>
                <TouchableOpacity onPress={() => {navigation.navigate("NavigateCard");}} style={tw`absolute p-3 rounded-full top-3 left-5 z-50`} >
                    <Icon name="chevron-left" type="font-awesome" size={14} />
                </TouchableOpacity>
                <Text style={tw`text-center text-xl py-5`}>
                    Select a Ride — {travelTimeInformation?.distance?.text}
                </Text>
            </View>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={() => (
                    <View style={tw`bg-gray-200 h-0.5`} />
                )}
                renderItem={({ item: { id, title, multiplier, image }, item }) => (
                    <TouchableOpacity
                        style={tw`flex-row justify-between items-center px-3 ${id === selected?.id && "bg-gray-200"}`}
                        onPress={() => {
                            if (!selected) {
                                setSelected(item);
                            } else {
                                setSelected(null);
                            }
                        }}
                    >
                        <Image
                            style={{
                                width: 100,
                                height: 100,
                                resizeMode: 'contain',
                            }}
                            source={{ uri: image }}
                        />
                        <View style="-ml-6">
                            <Text style={tw`text-xl font-semibold`}>{title}</Text>
                            <Text>{travelTimeInformation?.duration?.text} Travel Time</Text>
                        </View>
                        <Text style={tw`text-xl`}>
                            {new Intl.NumberFormat('en-usd', {
                                style: 'currency',
                                currency: 'USD'
                            }).format(
                                (travelTimeInformation?.duration?.value * SURGE_CHARGE_PRICE * multiplier) / 100,
                            )}
                        </Text>
                    </TouchableOpacity>
                )}
            />

            <View style={tw`mt-auto border-t border-gray-200`}>
                <TouchableOpacity disabled={!selected} style={tw`bg-black py-3 m-3`}>
                    <Text style={tw`text-center text-white text-xl`}>Choose {selected?.title}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
        // style={ !selected ? { backgroundColor: '#cacaca' } : null }
    )
}

export default RideOptionsCard