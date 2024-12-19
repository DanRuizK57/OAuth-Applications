<template>
    <h1 id="text">Inicio de sesión con Google</h1>
    <div class="container">
        <div>
            <div class="google-button" @click="login">
                <img id="google-logo" src="../assets/Logo Google.png" alt="Logo de Google">
                <a class="google-link" href="#">Iniciar sesión con Google</a>
            </div>
            <GoogleLogin :callback="callback" />
        </div>
    </div>
</template>

<script>
import { googleSdkLoaded, decodeCredential } from "vue3-google-login";
import axios from "axios";

export default {
    name: "LandingPage",
    data() {
        return {
            googleUser: null,
        };
    },
    methods: {
        callback (response)  {
            const userData = decodeCredential(response.credential)
            const googleUser = {
                name: userData.name,
                email: userData.email,
                photo: userData.picture
            };
            this.sendCodeToBackend(googleUser);
        },
        login() {
            // Obtener el código de autorización del usuario de Google
            googleSdkLoaded(google => {
                google.accounts.oauth2
                    .initCodeClient({
                        client_id: process.env.VUE_APP_GOOGLE_CLIENT_ID,
                        scope: "email profile openid",
                        redirect_uri: process.env.VUE_APP_GOOGLE_CALLBACK,
                        callback: response => {
                            console.log(response);
                            const authorizationCode = response.code;
                            if (authorizationCode) {
                                this.sendCodeToBackend(authorizationCode);
                            }
                        }
                    })
                    .requestCode();
            });
        },
        // Enviar el código de autorización del usuario al backend
        async sendCodeToBackend(googleUserObject) {
            
            try {
                const response = await axios.post(process.env.VUE_APP_SERVER_IP + "/auth/google/callback", googleUserObject);
                
                const googleUser = response.data.user;
                console.log("Usuario autenticado:", googleUser);
                this.googleUser = googleUser;

                const token = response.data.token;
                console.log("token: ", token);

                // Almacenar usuario en localStorage
                localStorage.setItem('googleUser', JSON.stringify(googleUser));

                // Almacenar token en localStorage
                localStorage.setItem('token', JSON.stringify(token));

                // Redirigir al dashboard
                this.$router.push("/user");
            } catch (error) {
                console.error("Failed to send token:", error);
            }
        }
    }
};

</script>

<style scoped>
* {
    font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}

body {
    background-color: #C0C0C0;
}

#text {
    margin-top: 10%;
}

#google-logo {
    height: 40px;
    width: 40px;
    margin-right: 8%;
}

.container {
    display: flex;
    justify-content: center;
}

.google-button {
    display: flex;
    justify-content: center;
    border: 2px solid black;
    border-radius: 15px;
    padding: 3%;
    width: 300px;
    margin-top: 3%;
}

.google-button:hover {
    background-color: rgb(29, 29, 29);
}

.google-button:hover > .google-link {
    color: white;
}

.google-link {
    margin-top: 3%;
    color: black;
    text-decoration: none;
    font-weight: bold;
}

</style>