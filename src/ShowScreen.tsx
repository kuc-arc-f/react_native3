import React, { useState } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Text,
  View,
  Platform
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { gql } from "@apollo/client";
import client from '../apollo-client'

interface IProps {
  navigation: any,
  route: any,
}
interface IState {
  id: string,
  item: any,
}

export  class ShowScreen  extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props)
//console.log("id=", props.route.params.id);
    this.state = {
      id: props.route.params.id, item: {} 
    };
  }
  async componentDidMount(){
    console.log("#ShowScreen");
    try{
      const data = await client.query({
        query: gql`    
        query {
          task(id: "${this.state.id}") {
            id
            title
            created_at
          }
        }                
        `,
        fetchPolicy: "network-only"
      });
console.log(data.data.task);
      this.setState({ item: data.data.task });
    } catch (e) {
      console.error(e);
    }    
  }
  async onPressDelete(){
    try{
//console.log("#onPressDelete");
      const result = await client.mutate({
        mutation: gql`   
        mutation {
          deleteTask(id: "${this.state.id}"){
            id
          }
        }                 
        `,
      })
console.log(result);
      this.props.navigation.goBack();
    } catch (e) {
      console.error(e);
    }
  }  
  render(){
//console.log("id=", this.state.id );
console.log(this.state.item );
    return (
      <View style={styles.container}>
        <Text>Welcome, Show</Text>
        <Text>id: {this.state.id}</Text>
        <Text style={{ marginBottom: 16 }}
        >title: {this.state.item.title}</Text>
        <Button
        mode="contained"
        style={{ marginBottom: 16 }}
        onPress={() => {
          this.props.navigation.navigate('EditScreen', {
            id: this.state.id
          });
        }}        
        >Edit
        </Button>
        <Button
        mode="contained"
        onPress={() => this.onPressDelete()}
        >削除
        </Button>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

