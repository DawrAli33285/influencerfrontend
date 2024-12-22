let links;

if (localStorage.getItem('token')) {
    links = [
        {
            'label': "Home",
            'url': "/",
        },
        {
            'label': "How it Works",
            'url': "/howitworks",
        },
        {
            'label': "Market",
            'url': "/market",
        },
        {
            'label': "Dashboard",
            'url': "/dashboard",
        },
        {
            'label': "About Us",
            'url': "/aboutus",
        },
        {
            'label': "Promise Bond",
            'url': "/promisebond",
        },
        {
            'label': "Terms",
            'url': "/terms",
        },
    ];
} else {
    links = [
        {
            'label': "Home",
            'url': "/",
        },
        {
            'label': "How it Works",
            'url': "/howitworks",
        },
        {
            'label': "Market",
            'url': "/market",
        },

        {
            'label': "About Us",
            'url': "/aboutus",
        },
        {
            'label': "Promise Bond",
            'url': "/promisebond",
        },
        {
            'label': "Terms",
            'url': "/terms",
        },
    ];
}

export { links };

export const become_a_seller = {};

export const login = {
    'label': "Sign In",
    'url': "/signin",
};

export const sign_up = {
    'label': "Sign Up",
    'url': "/signup",
};

export const categories = {
    'label': "",
    'url': "/",
};
