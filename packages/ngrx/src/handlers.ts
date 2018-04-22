export const query = {
    request: {
        path: '',
        method: 'GET',
    },
    handlers: {
        start: () => { },
        success: () => { },
        failure: () => { }
    }
};

export const get = {
    request: {
        path: ':/id',
        method: 'GET',
    },
    handlers: {
        start: () => { },
        success: () => { },
        failure: () => { }
    }
};

export const create = {
    request: {
        path: '',
        method: 'CREATE',
    },
    handlers: {
        start: () => { },
        success: () => { },
        failure: () => { }
    }
};

export const update = {
    request: {
        path: ':/id',
        method: 'PUT',
    },
    handlers: {
        start: () => { },
        success: () => { },
        failure: () => { }
    }
};

export const remove = {
    request: {
        path: ':/id',
        method: 'DELETE',
    },
    handlers: {
        start: () => { },
        success: () => { },
        failure: () => { }
    }
};
