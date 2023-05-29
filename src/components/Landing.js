import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import Card from './custom/LandingCard';
import { useNavigation } from '@react-navigation/native';

const checkInIcon = require('../../assets/check-in.png');
const findIcon = require('../../assets/search-love.png');
const friendListIcon = require('../../assets/friends.png');
const informationIcon = require('../../assets/information.png');

const Landing = () => {//landing page that show when the app is opened and navigates in which card the user clicks
  const navigation=useNavigation()

  const handleCheckInPress = () => {
    navigation.navigate('Placelist');
  };
  const handleFriendListPress = () => {
    navigation.navigate('Friends');
  };

  const handleFindPress = () => {
    navigation.navigate('Search');
  };

  const handleInformationPress = () => {
    navigation.navigate('Information');
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card navigateScreen={handleCheckInPress} title="Check in" iconSource={checkInIcon}/>
      <Card navigateScreen={handleFriendListPress} title="Friend list" iconSource={friendListIcon} />
      <Card navigateScreen={handleFindPress} title="Find" iconSource={findIcon}/>
      <Card navigateScreen={handleInformationPress} title="Information" iconSource={informationIcon}/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow:1,
    backgroundColor: '#D6DCF2',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    height:'100%'
  },
});

export default Landing;
