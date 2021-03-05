import React from "react";
import {View, Text, StyleSheet, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, ToastAndroid, Alert, FlatList} from "react-native";
import db from '../Config';
import firebase from 'firebase';

export default class LoginScreen extends React.Component{
    constructor(){
        super();

        this.state = {
            emailID : "",
            password : ""
        }

    }
    login = async(emailID, password)=>{
        if(emailID && password){
            try{
                var response = await firebase.auth().signInWithEmailAndPassword(emailID, password);
                if(response){
                    this.props.navigation.navigate("Transaction");
                }
            }
            catch(error){
                //Alert.alert(error.code);
                switch(error.code){
                    case "auth/user-not-found":
                        Alert.alert('User does not exist');
                        break;

                        case "auth/invalid-email":
                            Alert.alert('Incorrect email and password');
                            break;

                }
                                
            }
        }
        else {
            Alert.alert('Enter emailID and password');
        }
    }
render(){
    return(
        <KeyboardAvoidingView style = {{alignItems : "center", marginTop : 20}}>
             <View>
                    <Image source={require("../assets/booklogo.jpg")} style={{width : 200, height : 200}}></Image>
                    <Text style={{textAlign : "center", fontSize : 30}}>Wily</Text>
            </View>

            <View>
                <TextInput style = {styles.loginBox} placeholder = "abc@example.com" keyboardType = "email-address" onChangeText = {(text)=>{
                    this.setState({
                        emailID : text
                    });
                }}></TextInput>
                <TextInput style = {styles.loginBox} placeholder = "password" secureTextEntry = {true} onChangeText = {(text)=>{
                    this.setState({
                        password : text
                    });
                }}></TextInput>
            </View>

            <View>
                <TouchableOpacity style = {{height : 30, width : 90, borderWidth : 1, marginTop : 20, paddingTop : 5, borderRadius : 7}} onPress={()=>{
                    this.login(this.state.emailID, this.state.password);
                }}><Text style = {{textAlign : 'center'}}>Login</Text></TouchableOpacity>
            </View>
        </KeyboardAvoidingView>

    )
}    
}

const styles = StyleSheet.create({
    loginBox : {
        width : 300,
        height : 40, 
        borderWidth : 1.5,
        fontSize : 20,
        margin : 10,
        paddingLeft : 10
    }
})

