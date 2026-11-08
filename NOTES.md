1. Why must the HOCs be applied at module level, and what breaks if they are created inside a component?

A HOC returns a new component every time you call it. If I call withAuth(Profile) inside another component, I get a new component type on every render. React sees a different type, so it unmounts the old one and mounts a new one. Any state inside is lost (like text typed in an input), and effects run again, so the API gets called again.

That's why I call all the HOCs once at the top of the file, for example in AppRoutes.tsx and ProjectListPage.tsx. They are created once when the file loads and the same component is reused.

2. How do your withLoading types keep isLoading from reaching the wrapped component?

withLoading takes a component with props WrappedProps and returns a component that takes WrappedProps plus isLoading: boolean. Inside, I destructure { isLoading, ...rest } and only pass rest to the wrapped component, so isLoading never gets to it. I also have a test for this.

TypeScript can't tell that "WrappedProps plus isLoading, minus isLoading" is the same as WrappedProps when it is generic, so I had to write rest as WrappedProps. It's safe because the only thing removed is the isLoading prop that the HOC added itself.

3. How does returning to the originally requested page after login work, step by step?

- The user is signed out and opens something like /dashboard/projects?status=active.
- withAuth wraps the dashboard layout, sees there is no user, and redirects to /login with Navigate. It saves the requested path in the location state as "from".
- The login page reads "from" from location.state. If it's missing or not a valid path, it uses /dashboard instead.
- The user signs in, and login() saves the user in the context and in localStorage.
- The login page re-renders, sees there is a user now, and navigates to "from" with replace.

The same check also covers a signed-in user opening /login. There is no "from", so they go to /dashboard. I use replace so /login doesn't stay in the history and the Back button doesn't take them back to it.

4. One thing you would change with more time?

Paths like /dashboard and /dashboard/projects are written as plain strings in a lot of places: the routes, the links, the redirects and the Back button. If one changes it's easy to miss a place. I would put them in one file as constants (or small helper functions for paths with params) and use them everywhere.
