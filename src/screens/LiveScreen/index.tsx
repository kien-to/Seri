import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  View,
  Button,
  Platform,
  PermissionsAndroid,
} from "react-native";

const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.requestMultiple(
      [
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ],
      {
        title: "Camera And Microphone Permission",
        message: "Streaming App needs access to your camera ",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the camera");
    } else {
      console.log("Camera permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};

export default function LiveScreen (props: any) {
  const [playserver, setPlayserver] = useState("http://192.168.1.2/live/");
  const [pushserver, setPushserver] = useState("http://192.168.1.2/live/");
  const [stream, setStream] = useState("demo_295");

  useEffect(() => {
    if (Platform.OS === "android") {
      requestCameraPermission();
    }
  }, []);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        padding: 24,
        backgroundColor: "orange",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          color: "#fff",
          fontSize: 25,
          marginBottom: 150,
        }}
      >
        {"React Native\nLive Stream Video example"}
      </Text>
      <Text style={{ color: "#fff", fontSize: 18 }}>
        Please enter a stream name.
      </Text>
      <View
        style={{
          borderWidth: 1,
          borderColor: "blue",
          marginTop: 20,
          marginBottom: 100,
        }}
      >
        <TextInput
          style={{ color: "#fff", height: 40 }}
          placeholder="Write stream name here"
          placeholderTextColor="#555"
          value={stream}
          onChangeText={(stream) => setStream(stream)}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Button
          onPress={() =>
            props.navigation.navigate("Play", {
              playserver: playserver,
              stream: stream,
            })
          }
          title="Join Stream"
        />
        <Button
          onPress={() =>
            props.navigation.navigate("Push", {
              pushserver: pushserver,
              stream: stream,
            })
          }
          title="Stream a Video"
        />
      </View>
    </View>
  );
};

// export default function App() {
//   return <StackNavigation />;
// }