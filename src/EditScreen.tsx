import React, { useState } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { TextInput} from 'react-native';
import { Button } from 'react-native-paper';
//import { useNavigation } from '@react-navigation/native';
import { gql } from "@apollo/client";
import client from '../apollo-client'


interface IProps {
  navigation: any,
  route: any,
}
interface IState {
  id: string,
  title: string,
  item: any,
}

export class EditScreen extends React.Component<IProps, IState>{
  constructor(props: any) {
    super(props)
    this.state = {
      title: "", id: props.route.params.id, item: {} 
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
      const task = data.data.task;
console.log(task);
      //      this.setState({ item: data.data.task });
      this.setState({
        item: data.data.task, title: task.title
      });
    } catch (e) {
      console.error(e);
    }    
  }  
  async onPressSave(){
    try{
      const result = await client.mutate({
        mutation: gql`   
        mutation {
          updateTask(id: "${this.state.id}", title: "${this.state.title}"){
            id
          }
        }                 
        `,
      })
console.log(result);
      this.props.navigation.goBack();
    } catch (e) {
      console.error(e);
      throw new Error('Error , delete_movie');
    }
  }
  inputValueUpdate = (val :any, prop: any) => {
//console.log(prop);
    if(prop === 'title'){
      this.setState({ title: val });
    }
  }
  render(){
console.log(this.state);
    return (
      <KeyboardAvoidingView
        style={styles.container}
      >
        <TextInput
          style={{ marginBottom: 16 }}
          placeholder="文字を入力してください"
          value={this.state.title}
          onChangeText={(val) => this.inputValueUpdate(val, 'title')}
        />
        <Button
          mode="contained"
          onPress={() => this.onPressSave()}
        >保存
        </Button>
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

