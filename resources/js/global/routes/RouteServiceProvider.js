class Group{
    constructor(prefix, plural, singular){
        this.prefix = prefix;
        this.singular = singular;
        this.list = `${this.prefix}/${plural}`;
        this.create = `${this.prefix}/create/${singular}`;
    }
    view = (leadId=':leadId') => `${this.prefix}/view/${this.singular}/${leadId}`;
    update = (leadId=':leadId') => `${this.prefix}/update/${this.singular}/${leadId}`;
    delete = (leadId=':leadId') => `${this.prefix}/delete/${this.singular}/${leadId}`;
}

/**
 * this will run automatically else hash method is also called then it extends the name and fire.
 */
class WithHash{
    __temp__ = '';
    __hash__ = '/#/';

    constructor(path){
        this.__run__(path);
    }

    __run__(path){
        setTimeout(() => {
            const route = `${location.origin}/${path}${this.__temp__}`;
            setTimeout(() => location.href = route, 0);
        }, 0);
    }

    withHashOnly = () => this.__temp__ = `${this.__hash__}`;
    withPath = (route) => this.__temp__ = `${this.__hash__}${route}`;
}

class Redirect{
    to = (path) => new WithHash(path);
    apps = () => this.to('apps');
    dashboard = () => this.to('dashboard');
    employee = () => this.to('employee');
    payroll = () => this.to('payroll');
    attendance = () => this.to('attendance');
    leave = () => this.to('leave');
    task = () => this.to('task');
    project = () => this.to('project');
    invoice = () => this.to('invoice');
    expense = () => this.to('expense');
    crm = () => this.to('crm');
    hr = () => this.to('hr');
    support = () => this.to('support');
    account = () => this.to('account');
    testing = () => this.to('testing');
}

const createScopedRoutes = ({ parent, paths, getCurrentPath }) =>{
    const normalize = (path) => {
        return (`/${path}`).replace(/\/+/g, '/').replace(/\/$/, '') || '/';
    }

    const base = normalize(parent.replace(/\*$/, ""));
    const getPath = getCurrentPath || (() => window.location.pathname);

    const isInBase = () => {
        const current = normalize(getPath());
        return current === base || current.startsWith(base + "/");
    };

    const resolve = (target) => {
        const cleanTarget = target.replace(/^\/+/, "");
        return isInBase() ? cleanTarget : `${base}/${cleanTarget}`;
    };

    const makeCallable = (fn) => {
        const callable = (...args) => fn(...args);
        callable.toString = () => fn();
        callable.valueOf = () => fn();
        return callable;
    };

    const routes = {};
    for (const [key, value] of Object.entries(paths)) {
        const fn = (...args) =>
        resolve(typeof value === "function" ? value(...args) : value);
        routes[key] = makeCallable(fn);
    }
    return routes;
}

class Requirment{
    __prefix__ = '';

    prefix(prfx){
        prfx = prfx.replace('/', '').replace('/', '');
        this.__prefix__ = `/${prfx || ''}`;
        return this;
    }

    group(plural, singular){
        return new Group(this.__prefix__, plural, singular);
    }

    path(route){
        if(!route.startsWith('/')) route = `/${route}`;
        return `${this.__prefix__}${route}`;
    }
}

export class RouteServiceProvider{
    default = '/';

    constructor(){
        this.navigate = {
            to: new Redirect(),
        };
    }

    requirment = () => new Requirment();
    logout = () => this.navigate.to.account().withPath('logout');
}

