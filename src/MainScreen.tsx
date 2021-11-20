import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { List, FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import format from 'date-fns/format'; // (1)
import { ComposeScreen } from './ComposeScreen';
import { gql } from "@apollo/client";
import client from '../apollo-client'

interface IProps {
  navigation: any,
  route: any,
}
interface IState {
  items: any[],
}

//export function MainScreen({ route, navigation }) {
export class MainScreen extends React.Component<IProps, IState>{
  constructor(props: any) {
    super(props)
    this.state = {
      items: []
    };
  }
  async componentDidMount(){
    try{
console.log("#componentDidMount");
      const data = await client.query({
        query: gql`    
        query {
          tasks {
            id
            title
            created_at
          }
        }       
        `,
        fetchPolicy: "network-only"
      });
console.log(data.data.tasks);
      this.setState({ items: data.data.tasks,});      
    } catch (e) {
      console.error(e);
    }
  }
  render(){
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          data={this.state.items}
          keyExtractor={item => `${item.id}`}
          renderItem={({ item }) => (
            <List.Item
            title={item.title}
            description={
              `作成日時: ${item.created_at}`
            }
            descriptionStyle={{ textAlign: 'right' }}
            onPress={() => {
              this.props.navigation.navigate('ShowScreen', {
                id: item.id
              });
            }}
            />
          )}
        />
        <FAB
          style={{
            position: 'absolute',
            right: 16,
            bottom: 16,
          }}
          icon="plus"
          onPress={() =>
            this.props.navigation.navigate('ComposeScreen', {
              itemId: 81,
              otherParam: 'anything you want here',
            })
          }
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
});