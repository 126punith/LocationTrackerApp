import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { getTimeHandler } from '../utitlity/commonFunction';
import GlobalStyles from '../constants/GlobalStyles';
import Colors from '../constants/Colors';

interface PrevlocationProps {
  address: string;
  id: string;
  timestamp: number;
  onRemove: (key: string) => void;
}

export const PrevLocations = (props: PrevlocationProps) => {
  const { address, timestamp, id, onRemove } = props;
  console.log(timestamp, address);
  const removeHandler = () => {
    onRemove(id);
  };
  return (
    <View key={id}>
      <View
        style={{
          width: '70%',
          height: 50,
          flexDirection: 'row',
          marginTop: 20,
          marginLeft: 20,
        }}
      >
        <View>
          <Text style={GlobalStyles.title} numberOfLines={1}>
            {address ? address : ''}
          </Text>

          <Text
            style={[
              GlobalStyles.title,
              {
                color: Colors.silver,
              },
            ]}
            numberOfLines={1}
          >
            {timestamp && getTimeHandler(timestamp)}
          </Text>
        </View>
        <TouchableOpacity
          onPress={removeHandler}
          activeOpacity={0.6}
          style={{
            backgroundColor: Colors.silver,
            borderRadius: 2,
            height: '50%',
            marginLeft: 10,
          }}
        >
          <Text
            style={{
              padding: 5,
              fontSize: 12,
              lineHeight: 16,

              color: Colors.white,
            }}
          >
            Remove
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PrevLocations;

const styles = StyleSheet.create({});
