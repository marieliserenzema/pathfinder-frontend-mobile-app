import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useUserContext } from '../contexts/UserContext';
import client from '../client/client';
import { Alert } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import validateCredentials from '../utils/validate-credentials';

interface LoginScreenProps {
  navigation: NavigationProp<any>;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {

  const { setToken } = useUserContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [canLogin, setCanLogin] = useState(false);



  useEffect(() => {
    setEmailError(validateCredentials.validateEmail(email));
    setPasswordError(validateCredentials.validatePassword(password));
    setCanLogin(emailError && passwordError);
  }, [email, password]);


  const handleLogin = async () => {

    try {
      const response: any = await client.login(email, password);
      if (response.status === 200) {
        setToken(response.token);
        navigation.navigate('Home');
      } else {
        Alert.alert('Erreur', 'Adresse email ou mot de passe invalide.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignUp = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connectez-vous</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}

        value={email}
        keyboardType="email-address"
        autoCapitalize="none"

      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <TouchableOpacity onPress={handleLogin} style={canLogin ? styles.button : styles.disabledButton} disabled={!canLogin}>
        <Text style={styles.textButton}> Se connecter </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSignUp} style={styles.registerButton}>
        <Text style={styles.textButtonGreen}>Pas de compte ? </Text>
        <Text style={styles.textButtonGreenBold}>Créer un compte</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "green",
    width: "100%",
    borderRadius: 10,
    padding: "2%"
  },
  disabledButton: {
    backgroundColor: "green",
    width: "100%",
    borderRadius: 10,
    padding: "2%",
    opacity: 0.5,
  },
  textButton: {
    textAlign: "center",
    color: "white"
  },
  registerButton: {
    paddingTop: "2%",
    display: "flex",
    flexDirection: "row",
  },
  textButtonGreen: {
    color: "green"
  },
  textButtonGreenBold: {
    color: "green",
    fontWeight: "700"
  }
});

export default LoginScreen;
