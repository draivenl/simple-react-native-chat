import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, FlatList} from 'react-native';
import io from "socket.io-client";

class App extends Component {
  //SOCKET_URL = "http://10.0.8.86:3000"
  SOCKET_URL = "http://192.168.0.9:3000"
  constructor(props) {
    super(props)
    this.state = {
      chatMessage: "",
      chatMessages: []
    }
  }

  componentDidMount(){
    this.socket = io(this.SOCKET_URL)
    this.socket.on('message', msg => {
      this.setState({
        chatMessages: [...this.state.chatMessages, msg]
      })
    })
  }

  handleChangeMessage = chatMessage => {
    this.setState({
      chatMessage
    })
  }
  submitChatMessage = () => {
    this.socket.emit("message", this.state.chatMessage)
    this.setState({
      chatMessage: ""
    })
  }

  renderEmpty = () => {
    return <Text>No Messages</Text>
  }
  renderItem = item => {
    return <Text>{item}</Text>
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput 
          autoCorrect={false}
          onSubmitEditing={this.submitChatMessage}
          onChangeText={ this.handleChangeMessage }
          style={styles.input_message}
          value={this.state.chatMessage}
        />
        <Text>Messages</Text>
        <FlatList 
              ListEmptyComponent={()=>this.renderEmpty()}
              data={this.state.chatMessages} 
              renderItem={({item})=>this.renderItem(item)}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15
  },
  input_message: {
    borderColor: 'black',
    borderWidth: 1,
    height: 40

  }

});

export default App