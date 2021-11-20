import React, { useState } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Text,
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
  render(){
//console.log("id=", this.state.id );
console.log(this.state.item );
    return (
      <KeyboardAvoidingView // (1)
        style={styles.container}
      >
        <Text>Welcome, Show</Text>
        <Text>id: {this.state.id}</Text>
        <Text>title: {this.state.item.title}</Text>
      </KeyboardAvoidingView>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

