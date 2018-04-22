export const query = {
    request: {
        path: '',
        method: 'GET',
    },
    handler: function() {
        return {
            start: () => { },
            success: () => { },
            failure: () => { }
        };
    }
};

export const get = {
    request: {
        path: ':/id',
        method: 'GET',
    },
    handler: function() {
        return {
            start: () => { },
            success: () => { },
            failure: () => { }
        };
    }
};

export const create = {
    request: {
        path: '',
        method: 'CREATE',
    },
    handler: function() {
        return {
            start: () => { },
            success: () => { },
            failure: () => { }
        };
    }
};

export const update = {
    request: {
        path: ':/id',
        method: 'PUT',
    },
    handler: function() {
        return {
            start: () => { },
            success: () => { },
            failure: () => { }
        };
    }
};

export const remove = {
    request: {
        path: ':/id',
        method: 'DELETE',
    },
    handler: function() {
        return {
            start: () => { },
            success: () => { },
            failure: () => { }
        };
    }
};
