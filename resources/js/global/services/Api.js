import axios from "axios";
import { token } from "../utils/Token";
import { ApiSubscription } from "./ApiSubscription";
import { routes } from "../routes/Routes";
import { contentTypes } from "./ContentTypes";

export class Api {

    constructor(options={}) {
        this.api = axios.create({
            baseURL: `${import.meta.env.VITE_APP_URL}/api`,
            timeout: 10000,
            headers: {
                'Content-Type': contentTypes.json,
            },
            ...options,
            withCredentials: true, // important: send cookies
        });

        // Set CSRF token for this instance
        const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
        if (csrfTokenMeta) {
            this.api.defaults.headers['X-CSRF-TOKEN'] = csrfTokenMeta.content;
        }

        this.requestInterceptor();
        this.responseInterceptor();

        this.subscription = new ApiSubscription(this.api);
        this.subscription.provider.run(this);

        this.autoRedirect = new (class{
            constructor(){
                window.loginAutoRedirect = true;
            }
            is = () =>window.loginAutoRedirect;
            on = () =>window.loginAutoRedirect = true;
            off = () =>window.loginAutoRedirect = false;
        });
    }

    onOnetimeMultipartContentType(callback){
        this.onOnetimeContentType(callback, contentTypes.multipart);
    }

    onOnetimeContentType(callback, contentType){
        const interceptorId = this.api.interceptors.request.use((config)=>{
            config.headers['Content-Type'] = contentType;
            return config;
        }, (error) => Promise.reject(error));

        callback();

        setTimeout(() => {
            this.api.interceptors.request.eject(interceptorId);
        }, 0);
    }

    requestInterceptor() {
        this.api.interceptors.request.use((config) => {
            if (token.isset()) {
                config.headers.Authorization = `Bearer ${token.get()}`;
            }
            return config;
        }, (error) => Promise.reject(error));
    }

    responseInterceptor() {
        this.api.interceptors.response.use(
            response => response,
            (error) => {
                if (error.response) {
                    const { status } = error.response;
                    if (status === 401) {
                        token.unset();
                        console.error('Unauthorized! Redirecting to login...');
                        if(!this.autoRedirect.is()) return;
                        routes.navigate.to.account().withPath('login');
                    } else if (status === 403) {
                        console.error('Forbidden! Access denied.');
                    } else if (status >= 500) {
                        console.error('Server error! Please try again later.');
                    }
                } else if (error.request) {
                    console.error('No response from server. Check your network.');
                } else {
                    console.error('Error setting up request:', error.message);
                }
                return Promise.reject(error);
            }
        );
    }

    get = (url, params) => this.subscription.get(url, params);
    post = (url, data) => this.subscription.post(url, data);
    patch = (url, data) => this.subscription.patch(url, data);
    put = (url, data) => this.subscription.put(url, data);
    delete = (url, params) => this.subscription.delete(url, params);
}

export const api = new Api();