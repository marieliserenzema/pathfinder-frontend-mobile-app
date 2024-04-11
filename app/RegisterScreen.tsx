import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useUserContext } from '../contexts/UserContext';
import client from '../client/client';
import { NavigationProp } from '@react-navigation/native';
import validateCredentials from '../utils/validate-credentials';
import { Alert } from 'react-native';

interface RegisterScreenProps {
    navigation: NavigationProp<any>;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {

    const { setToken, createUser } = useUserContext();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [canRegister, setCanRegister] = useState(false);

    useEffect(() => {
        setEmailError(validateCredentials.validateEmail(email));
        setPasswordError(validateCredentials.validatePassword(password));
        setUsernameError(validateCredentials.validateUsername(username));
        setCanRegister(emailError && passwordError && usernameError);
    }, [email, password, username]);

    const handleRegister = async () => {
        try {
            const response: any = await client.register(email, password, username);
            console.log(response.status);
            if (response.status === 200) {
                setToken(response.token);
                createUser(username, email, password);
                navigation.navigate('Home');
            } else {
                Alert.alert('Erreur', 'Il y a eu un problème avec votre création de compte. Veuillez réesayer.');

            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleLogin = () => {
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Créez un compte</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                onChangeText={(text) => setUsername(text)}
                value={username}
                autoCapitalize="none"
            />
            {usernameError ?
                <Text style={styles.validText}>Username valide</Text> :
                <Text style={styles.errorText}>Username invalide</Text>
            }
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={(text) => setEmail(text)}
                value={email}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            {emailError ?
                <Text style={styles.validText}>Adresse e-mail valide</Text> :
                <Text style={styles.errorText}>Adresse e-mail invalide</Text>
            }
            <TextInput
                style={styles.input}
                placeholder="Mot de passe"
                onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry
            />
            {passwordError ?
                <Text style={styles.validText}>Mot de passe valide</Text> :
                <Text style={styles.errorText}>Mot de passe invalide</Text>
            }
            <TouchableOpacity onPress={handleRegister} style={canRegister ? styles.button : styles.disabledButton} disabled={!canRegister}>
                <Text style={styles.textButton}> Se connecter </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogin} style={styles.registerButton}>
                <Text style={styles.textButtonGreen}>Déjà un compte ? </Text>
                <Text style={styles.textButtonGreenBold}>S'inscrire</Text>
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
    },
    errorText: {
        color: 'red',
        fontSize: 10,
        alignSelf: 'flex-start',
        marginBottom: 10,
    },
    validText: {
        color: 'green',
        marginBottom: 10,
        fontSize: 10,
        alignSelf: 'flex-start'
    },
});

export default RegisterScreen;
