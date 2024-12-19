<template>
    <div class="content">
        <h1>Usuario de Google</h1>
        <p v-if="googleUser">Nombre: {{ googleUser.name }}</p>
        <p v-if="googleUser">Email: {{ googleUser.email }}</p>
        <p v-if="googleUser">Foto: <img :src="this.googleUser.photo" alt="Profile Picture"></p>
        <p v-else>Cargando datos del usuario...</p>
    </div>
</template>

<script>

export default {
    name: "UserPage",
    data() {
        return {
            googleUser: null,
        }
    },
    async mounted() {
        const user = localStorage.getItem('googleUser');
        if (user) {
            try {
                this.googleUser = JSON.parse(user);
            } catch (error) {
                console.error("Error al parsear googleUser de localStorage:", error);
            }
        }
    },
};
</script>


<style scoped>
/* Estilos generales */
.content {
    width: 90%;
    height: 860px;
    display: flex;
    flex-direction: column;
    margin-left: 3%;
}

.content > h1 {
    text-align: start;
    margin-left: 3%;
    margin-top: 2%;
}

/* Paginación */

.container {
    display: flex;
    justify-content: center;
    margin-top: 2%;
    margin-bottom: 2%;
}

.page-link {
    color: #454545;
}

.page-item.active .page-link {
    background-color: #a7a7a7;
    color: rgb(48, 48, 48);
    border-color: #a7a7a7;
}

.page-item.active {
    background-color: #a7a7a7;
}

.page-item .page-link:hover {
    background-color: #a7a7a7;
    color: rgb(48, 48, 48);
}
</style>