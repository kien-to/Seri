
import React, { useState, useEffect } from "react";
import { View, Button, StyleSheet } from "react-native";
import NodeCameraView  from "react-native-nodemediaclient";

const PlayScreen = (props) => {
  const [playerRef, setPlayerRef] = useState(null);

  useEffect(() => {
    return () => {
      if (playerRef) playerRef.stop();
    };
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#333" }}>
      <NodeCameraView
        style={{ flex: 1 }}
        ref={(vb) => {
          setPlayerRef(vb);
        }}
        outputUrl={props.route.params.pushserver + props.route.params.stream}
        camera={{ cameraId: 1, cameraFrontMirror: true }}
        audio={{ bitrate: 32000, profile: 1, samplerate: 44100 }}
        video={{
          preset: 1,
          bitrate: 500000,
          profile: 1,
          fps: 15,
          videoFrontMirror: false,
        }}
        smoothSkinLevel={3}
        autopreview={true}
        onStatus={(code, msg) => {
          console.log("onStatus=" + code + " msg=" + msg);
        }}
      />
      <View>
        <Button
          onPress={() => {
            playerRef.switchCamera();
          }}
          color="red"
          title="Reverse Camera"
        />
        <Button
          onPress={() => {
            playerRef.start();
          }}
          color="green"
          title="Publish"
        />
        <Button
          onPress={() => {
            props.navigation.goBack();
          }}
          title="Back"
        />
      </View>
    </View>
  );
};

export default PlayScreen;