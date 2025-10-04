<script setup>
import { ref } from 'vue'
import { toast } from 'vue3-toastify'
import { useRouter } from 'vue-router'
import { registerUser } from '@/services/auth'
import bgImage from './imagey/bg-ghibli.webp'

const router = useRouter()  
const isRegisterMode = ref(true)

// shared fields
const name = ref('')
const email = ref('')
const password = ref('')
const isLoading = ref(false)

const toggleToRegister = () => {
    // Remain on register route (no-op) but keep animation in sync
    isRegisterMode.value = true
}

const toggleToLogin = () => {
    // Play animation first, then navigate so URL updates
    isRegisterMode.value = false
    setTimeout(() => {
        router.push('/login')
    }, 1700)
}

const handleRegister = async () => {
    isLoading.value = true
    try {
        const response = await registerUser({
            name: name.value,
            email: email.value,
            password: password.value,
        })

        console.log(response.data)

        const statusCode = response.status
        if (statusCode === 201) {
            toast('Account created successfully', {
                autoClose: 1000,
            })
        }
    } catch (error) {
        if (error.response?.data) {
            toast(error.response?.data?.email, {
                autoClose: 1000,
            })
        } else {
            toast('There is a problem creating an account, please try again later', {
                autoClose: 1000,
            })
        }
    } finally {
        isLoading.value = false
    }
}
</script>
<template>
    <div class="bg-image" :style="{ backgroundImage: `url(${bgImage})` }"></div>
    <div class="content-wrapper">
    <div class="page-wrap">
        <div class="container" :class="{ active: isRegisterMode }">

            <!-- Register Form -->
            <div class="form-box register">
                <form @submit.prevent="handleRegister">
                    <h1>Registration</h1>
                    <div class="input-box">
                        <input type="text" placeholder="Name" v-model="name" required />
                        <i class="bx bxs-user"></i>
                    </div>
                    <div class="input-box">
                        <input type="email" placeholder="Email" v-model="email" required />
                        <i class="bx bxs-envelope"></i>
                    </div>
                    <div class="input-box">
                        <input type="password" placeholder="Password" v-model="password" required />
                        <i class="bx bxs-lock-alt"></i>
                    </div>
                    <button type="submit" class="btn" :disabled="isLoading">
                        {{ isLoading ? 'Loading...' : 'Register' }}
                    </button>
                    <p>or register with social platforms</p>
                    <div class="social-icons">
                        <a href="#" @click.prevent><i class="bx bxl-google"></i></a>
                        <a href="#" @click.prevent><i class="bx bxl-facebook"></i></a>
                        <a href="#" @click.prevent><i class="bx bxl-github"></i></a>
                        <a href="#" @click.prevent><i class="bx bxl-linkedin"></i></a>
                    </div>
                </form>
            </div>

            <!-- Toggle Box -->
            <div class="toggle-box">

                <div class="toggle-panel toggle-right">
                    <h1>Welcome Back!</h1>
                    <p>Already have an account?</p>
                    <button class="btn login-btn" @click="toggleToLogin">Login</button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<style scoped>
@import url('https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css');
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

.bg-image {
    position: fixed !important;
    inset: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    background-size: cover !important;
    background-position: center !important;
    background-repeat: no-repeat !important;
    filter: blur(5px) !important;
    z-index: 0 !important;
}
.content-wrapper {
    position: relative;
    z-index: 10;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
    text-decoration: none;
    list-style: none;
}

.page-wrap {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    padding: 10px;
}

.container {
    position: relative;
    width: 850px;
    height: 550px;
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(20px);
    margin: 20px auto;
    border-radius: 30px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.2);
    overflow: hidden;
}

.container h1 {
    font-size: 36px;
    margin: -10px 0;
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
}

.container p {
    font-size: 14.5px;
    margin: 15px 0;
    color: white;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
}

form {
    width: 100%;
}

.form-box {
    position: absolute;
    right: 0;
    width: 50%;
    height: 100%;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    color: white;
    text-align: center;
    padding: 40px;
    z-index: 1;
    transition:
        0.6s ease-in-out 1.2s,
        visibility 0s 1s;
    border-left: 1px solid rgba(255, 255, 255, 0.2);
}

.container.active .form-box {
    right: 50%;
}

.form-box.register {
    visibility: hidden;
}
.container.active .form-box.register {
    visibility: visible;
}

.input-box {
    position: relative;
    margin: 30px 0;
}

.input-box input {
    width: 100%;
    padding: 13px 50px 13px 20px;
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    outline: none;
    font-size: 16px;
    color: white;
    font-weight: 500;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
}

.input-box input::placeholder {
    color: rgba(255, 255, 255, 0.7);
    font-weight: 400;
}

.input-box i {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 20px;
    color: rgba(255, 255, 255, 0.8);
}

.forgot-link {
    margin: -15px 0 15px;
}
.forgot-link a {
    font-size: 14.5px;
    color: rgba(255, 255, 255, 0.9);
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
}

.btn {
    width: 100%;
    height: 48px;
    background: linear-gradient(135deg, rgba(135, 206, 235, 0.8), rgba(152, 251, 152, 0.6));
    backdrop-filter: blur(10px);
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(135, 206, 235, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.4);
    cursor: pointer;
    font-size: 16px;
    color: white;
    font-weight: 600;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
    transition: all 0.3s ease;
}

.btn:hover {
    background: linear-gradient(135deg, rgba(135, 206, 235, 0.9), rgba(152, 251, 152, 0.8));
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(135, 206, 235, 0.6);
}

.social-icons {
    display: flex;
    justify-content: center;
}
.social-icons a {
    display: inline-flex;
    padding: 10px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 8px;
    font-size: 24px;
    color: white;
    margin: 0 8px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
}

.social-icons a:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
}

.toggle-box {
    position: absolute;
    width: 100%;
    height: 100%;
}

.toggle-box::before {
    content: '';
    position: absolute;
    left: -250%;
    width: 300%;
    height: 100%;
    background: linear-gradient(135deg, rgba(135, 206, 235, 0.6), rgba(152, 251, 152, 0.4), rgba(240, 230, 140, 0.5));
    backdrop-filter: blur(20px);
    border-radius: 150px;
    z-index: 2;
    transition: 1.8s ease-in-out;
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 8px 32px rgba(135, 206, 235, 0.3);
}

.container.active .toggle-box::before {
    left: 50%;
}

.toggle-panel {
    position: absolute;
    width: 50%;
    height: 100%;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 2;
    transition: 0.6s ease-in-out;
}

.toggle-panel.toggle-left {
    left: 0;
    transition-delay: 1.2s;
}
.container.active .toggle-panel.toggle-left {
    left: -50%;
    transition-delay: 0.6s;
}

.toggle-panel.toggle-right {
    right: -50%;
    transition-delay: 0.6s;
}
.container.active .toggle-panel.toggle-right {
    right: 0;
    transition-delay: 1.2s;
}

.toggle-panel p {
    margin-bottom: 20px;
}
.toggle-panel .btn {
    width: 160px;
    height: 46px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(135, 206, 235, 0.3));
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255, 255, 255, 0.6);
    box-shadow: 0 4px 15px rgba(135, 206, 235, 0.4);
    color: white;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
    transition: all 0.3s ease;
}

.toggle-panel .btn:hover {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(135, 206, 235, 0.5));
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(135, 206, 235, 0.6);
}

@media screen and (max-width: 650px) {
    .container {
        height: calc(100vh - 40px);
    }

    .form-box {
        bottom: 0;
        width: 100%;
        height: 70%;
    }
    .container.active .form-box {
        right: 0;
        bottom: 30%;
    }

    .toggle-box::before {
        left: 0;
        top: -270%;
        width: 100%;
        height: 300%;
        border-radius: 20vw;
    }
    .container.active .toggle-box::before {
        left: 0;
        top: 70%;
    }

    .container.active .toggle-panel.toggle-left {
        left: 0;
        top: -30%;
    }

    .toggle-panel {
        width: 100%;
        height: 30%;
    }
    .toggle-panel.toggle-left {
        top: 0;
    }
    .toggle-panel.toggle-right {
        right: 0;
        bottom: -30%;
    }
    .container.active .toggle-panel.toggle-right {
        bottom: 0;
    }
}

@media screen and (max-width: 400px) {
    .form-box {
        padding: 20px;
    }
    .toggle-panel h1 {
        font-size: 30px;
    }
}
</style>
