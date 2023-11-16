import axios from 'axios';
import { useAuthStore } from "../stores/auth";

const authStore = useAuthStore();
const root = "http://localhost:8080"

const access = async ({ url, header, body, response, error}) => {
  
}