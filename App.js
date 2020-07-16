/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  ScrollView,
  View,Image,BackHandler,
  Text, ImageBackground, ProgressBarAndroid, ProgressViewIOS, ActivityIndicator, Alert,StatusBar
} from 'react-native';
import NetInfo from "@react-native-community/netinfo";
 import { WebView } from 'react-native-webview';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
// import webscreen from './webscreen';
import {CountDown} from 'react-native-countdown-component';
export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      connection_Status : null,
      image: true, 
      web:false,
      Progress_Value:0.00,
      timepass:false,
     timer:3,
     i1:1,
     canGoBack: false
    }
  }


 startTimer = ()=> {
  console.log("buttonclcik")
     this.clockCall = setInterval(() => {
      this.decrementClock();
     }, 1000);
  
    }
    
    decrementClock = () => {  
     if(this.state.timer === 0){
       console.log("finish")
       clearInterval(this.clockCall)
       this.setState({image:false})
      this.setState({web:true})
      
       
     } 
  
     this.setState((prevstate) => ({ timer: prevstate.timer-1 }));
     this.setState({Progress_Value:this.state.Progress_Value+0.33});
  console.log("decrement clock")
    };
    handleBackPress = () => {
      if (this.state.canGoBack) {
         this.refWeb.goBack();
       }
     else{
      //  this.props.navigation.goBack(null)
      BackHandler.exitApp();
       }
     return true;
   }
   onNavigationStateChange(navState) {
    this.setState({
    canGoBack: navState.canGoBack
 });
}
    componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
     clearInterval(this.clockCall);
    }
  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  NetInfo.fetch().then(state => {
    console.log("status:",state.isConnected)
    if(!state.isConnected){
 
  // this.setState({web:false,image:true})
  Alert.alert(
    "No Internet Connection" ,
    "Sorry, this app require internet connection. try again later" ,
    [
      {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
      {text: 'OK', onPress: () =>{
        console.log('clicked');
        return BackHandler.exitApp();
        }},
    ],
    { cancelable: false }
  )
  }
    else{
      console.log("timer")
      this.startTimer(); 
    }
    console.log("Connection type", state.type);
    console.log("Is connected?", state.isConnected);
  });}

  
  render() {
    
 /*if(this.state.i1==0){
this.setState({web:true})
console.log("webview")
 }else{
this.setState({image:true})
console.log("image")
 }*/
   return (
    <View style={styles.container}  >
       <StatusBar  
                    backgroundColor = "#b3e6ff"  
                    barStyle = "dark-content"   
                    hidden = {true}    
                    translucent = {true}  
                />  
       {this.state.image ?  <View style={{ alignItems: "center" }} >
          <ImageBackground source={require('C:/Users/pc/MyPapion/Image2/splash1.jpg')} style={{ width: "100%", height: "100%", }} visible={this.state.image}>
          {/* <Image  source={require('/Users/imac/Documents/Web2/Image2/BogusEmptyBrontosaurus-max-1mb.gif')} resizeMode="contain" style={{width: 60, height: 60 ,marginTop:400,marginStart:180}}></Image> */}
          <ProgressBarAndroid styleAttr="Horizontal" indeterminate={false}
          progress={this.state.Progress_Value} style={styles.progressbar}
        /> 
         </ImageBackground>
        </View>:null}
       {this.state.web ? <WebView 
        ref={(myWeb) => this.refWeb = myWeb}
        
        onNavigationStateChange={this.onNavigationStateChange.bind(this)} 
       source={{ uri: " https://mypapion.com/WSITE/service/" }} 
        onLoadStart={(e)=>{
         console.log("start")}}   onLoadEnd={()=>{this.setState({ image: false,/* webview: true*/})
        }}
          
        ></WebView> :null}
        
       
     </View>);
    
 }}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  progressbar: {
    position: 'absolute',
    bottom: 0,
    width: "100%"
  }
});

