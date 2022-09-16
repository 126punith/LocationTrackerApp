import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { getTimeHandler } from '../utitlity/commonFunction';
import GlobalStyles from '../constants/GlobalStyles';
import Colors from '../constants/Colors';

interface CurretLocationProps {
  address: string;
  // loaction: object;
  timestamp: number;
}

export const CurretLocation = (props: CurretLocationProps) => {
  const { address, timestamp } = props;
  console.log(timestamp, address);

  return (
    <View>
      <Text
        style={{
          fontSize: 16,
          lineHeight: 22,
          marginLeft: 20,
          fontWeight: '600',
          marginTop: 20,
          marginBottom: 10,
          paddingLeft: 10,
          color: Colors.silver,
        }}
      >
        Current Location
      </Text>
      <View
        style={{
          width: '80%',
          height: 50,
          flexDirection: 'row',
          // marginTop: 20,
          marginLeft: 20,
        }}
      >
        <Image
          source={{
            uri: 'https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png',
          }}
          style={{ width: 40, height: 40, borderRadius: 20 }}
        />
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
      </View>
    </View>
  );
};

export default CurretLocation;

const styles = StyleSheet.create({});
