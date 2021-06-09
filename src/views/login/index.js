import React,{ useState } from 'react';
import {View, Text} from 'react-native';
import {TextInput, Button, Title, Surface, Snackbar,HelperText} from 'react-native-paper';
import { useUser } from '../../store/UserProvider';
import axios from 'axios';

const Login = ({navigation}) => {
  const { dispatch } = useUser();
  const [estadoUsuario, setEstadoUsuario] = useState(false);
  const [estadoContra, setEstadoContra] = useState(false);
  const [visible, setVisible] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [mensajeUsuario, setMensajeUsuario] = useState('');
  const [mensajeContrasenia, setMensajeContrasenia] = useState('');
  const [usuario, setUsuario] = useState("");
  const [contrasenia, setContrasenia] = useState("");

  const login = () => {
    setEstadoUsuario(false);
    setMensaje("");
    setEstadoContra(false);
    setMensajeUsuario("");
    setMensajeContrasenia("");
    setVisible(false);
    var estado = true;

    if(usuario === ""){
      setEstadoUsuario(true)
      setMensajeUsuario("El usuario es requerido");
      estado = false;
      console.log(usuario)
    }
    if(contrasenia === ""){
      setEstadoContra(true);
      setMensajeContrasenia("La contrasenia es requerida");
      estado = false;
        console.log("entro en contra")
    }
      var token = {
          username: usuario,
          password:contrasenia
        }
        if(estado){
          console.log("entro")
          axios.get("http://192.168.1.16:8080/usuario/all",{ auth:token }).then(function (response){
                 if(response.status === 200){
                   dispatch({type:"UPDATE_USER",item:token});
                   navigation.navigate('Proyectos');
                   setUsuario('');
                   setContrasenia('');
                   console.log("hola")
                 }else{
                    setMensaje("Ocurrio un error");
                    setVisible(true);
                 }
              }).catch(error => {
                setMensaje("Usuario no encontrado. !Ocurrio un error: " + error);
                setVisible(true);
              })
        }


  };
  const hasErrors = () => {
    return usuario.includes('');
  };
  return (
    <View
      style={{
        height: '100%',
        padding: 20,
      }}>
      <View style={{marginTop: 100}}>
        <Title
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 30,
            marginBottom: 20,
          }}>
          App constructora
        </Title>
        <TextInput
          error={estadoUsuario}
          text={mensajeUsuario}
          value={usuario}
          onChangeText={text => setUsuario(text)}
          label="Usuario"
          style={{marginBottom: 20, backgroundColor: null}}
        />
        <HelperText type="error" visible={hasErrors()}>
          {mensajeUsuario}
        </HelperText>
        <TextInput
          error={estadoContra}
          text={mensajeContrasenia}
          value={contrasenia}
          label="Clave"
          secureTextEntry
          onChangeText={text => setContrasenia(text)}
          style={{backgroundColor: null}}
          right={<TextInput.Icon name="eye" />}
        />
        <HelperText type="error" visible={hasErrors()}>
        {mensajeContrasenia}
      </HelperText>
        <Button
          style={{
            marginTop: 20,
            height: 50,
            borderRadius: 25,
            padding: 2,
          }}
          mode="contained"
          duration
          onPress={login}>
          Log in
        </Button>
        <Snackbar visible={visible} onDismiss={()=>  setVisible(false)}  action={{
          label: 'Undo',
          onPress: () => {
            setVisible(false)
          },
        }}>{mensaje}</Snackbar>
      </View>
    </View>
  );
};

export default Login;
