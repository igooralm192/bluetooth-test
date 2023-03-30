import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef } from "react";
import { Button, StyleSheet, Text, View, PermissionsAndroid } from "react-native";
import { BleManager } from "react-native-ble-plx";
import { check, PERMISSIONS, RESULTS, requestMultiple  } from "react-native-permissions";


export default function App() {
  const managerRef = useRef<BleManager>();

  async function handleScan() {
    const response = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
    ]);

    console.log(response)

    managerRef.current?.startDeviceScan(null, null, (error, device) => {
      // console.log({ error, device: { id: device?.id, name: device?.name } });
      if (device?.id.startsWith("38:8")) {
        console.log('ACHOU')
      }
    });
  }

  useEffect(() => {
    managerRef.current = new BleManager();

    return () => managerRef.current?.destroy();
  }, []);

  useEffect(() => {
    const subscription = managerRef.current?.onStateChange((state) => {
      console.log({ state });
    }, true);

    return () => {
      subscription?.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
      <Button title="Escanear" onPress={handleScan} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
