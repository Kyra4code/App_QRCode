import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Linking, Button } from 'react-native';
import { CameraView, Camera } from 'expo-camera';
import {MaterialCommunityIcons} from "@expo/vector-icons"

export default function App() {

  const [permissao, setPermissao] = useState(null);
  const [digitalizado, setDigitalizado] = useState(false)
  const [dados, setDados] = useState(null)

  useEffect(()=>{
    async function CheckPermissão(){
      const { status } = await Camera.getCameraPermissionsAsync();
      setPermissao(status === 'granted')      
    };
    CheckPermissão();
  }, []);

  function digitalizar({type, data}){
    setDigitalizado(true);
    setDados(data)
    alert("Código do tipo " + type + " e link é " + data)
  }

  function abrirLink(){
    Linking.openURL(dados)
  }

      if(permissao === null){
        return <Text>Solicitando a permissão para camera</Text>
      }
      if(permissao === false){
        return <Text>Sem acesso a camera</Text>
      } 

    return(
      <View style={styles.container}>

        <CameraView 
        onBarcodeScanned={digitalizado ? undefined: digitalizar}
        barcodeScannerSettings={{barcodeTypes:['qr', 'pdf417']}}
        style={StyleSheet.absoluteFillObject}
        />
        <MaterialCommunityIcons
          name='qrcode-scan'
          size={100}
          color='orange'
          style={styles.icon}
        />
        <Text style={styles.titulo}>Leitor de QR Code</Text>
        {digitalizado && (
          <Button color='orange' title='Digitalizar novamnte' onPress={()=> setDigitalizado(false)}/>
        )}
        {digitalizado && (
          <View style={styles.segBotao}><Button color='orange' title={`Abrir link ${dados}`} onPress={abrirLink}/></View>
        )}
      </View>
    )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon:{
    margin:20
  },
  titulo:{
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 26,
    color: 'darkorange'
  },
  segBotao:{
    marginTop: 25
  }
});
