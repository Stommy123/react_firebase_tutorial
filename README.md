### Firebase Example - Authentication / Realtime Database

#### What is Firebase

Firebase is a frontend focused datastore that exists out in the cloud and your client can access it directly, you don't need a server, you don't need an api. You get data directly in realtime as you request it. This paradigm is called "Backend as a service", i.e BAAS. With BAAS, you don't need to worry about hosting, google has already done that for you. This makes it stupid easy to share the same database across multiple clients / frontend with very minimal server code written.

#### Important Reading Material

- Data Structuring - https://firebase.google.com/docs/database/web/structure-data?authuser=0
- Reading / Writing - https://firebase.google.com/docs/database/web/read-and-write?authuser=0
- Working with Collections - https://firebase.google.com/docs/database/web/lists-of-data?authuser=0

#### Pros and Cons

- Pros

  - Simplified authentication
  - Realtime data
  - Ready made api
  - Built in security at the data level
  - File storage similar to S3
  - Static file hosting
  - Highly scalable data streaming

- Cons

  - Limited query abilities, no relations
  - Limited custimization

#### Sample Code

##### Config

```
const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'fir-tutorial-a8292.firebaseapp.com',
  databaseURL: 'https://fir-tutorial-a8292.firebaseio.com',
  projectId: 'fir-tutorial-a8292',
  storageBucket: '',
  messagingSenderId: '67469922153',
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const app = firebase.initializeApp(config);
export const database = app.database()
export const auth = app.auth();
```

##### Login

```
const handleLogin = async _ => {
  const { user } = await auth.signInWithEmailAndPassword(email, password)
  if (!user) return history.push('/error-page')
  return history.push('/my-profile')
}
```

##### Signup

```
const handleSignUp = async _ => {
  const { user } = await auth.createUserWithEmailAndPassword(email, password)
  if (!user) return history.push('/error-page')
  return history.push('/login')
}
```

##### Logout

```
const handleSignOut =  _ => auth.signOut();
```

##### Reading (and subscribing) Data

```
const fetchUsers = _ => {
  database.ref('/users').on('value', snapshot => {
    const usersData = snapshot.val() || {} // can be null if no users
    const parsedUsers = Object.values(usersData) // get the array of users
    setUsers(parsedUsers) // set in state
  })
}
```

##### Writing Data

```
const addUser = _ => {
  const userRef = database.ref('/users').push()
  const newUser = { id: userRef.key, email: 'tommy@tommy.com', displayName: 'tommy123', occupation: 'foo' }
  userRef.set(newUser)
}
```

#### React Hooks Cheatsheet

##### `useState`

```
// functional hooks
const [count, setCount] = useState(0) //count is the reader, setCount is the writer
const incrementCount = _ => setCount(count + 1)
const incrementCountV2 = _ => setCount(prevCount => prevCount + 1) //if you pass the writer a callback, the first argument is your prevState

// class componnet
state = { count: 0 }
incrementCount = _ => this.setState({ count: this.state.count + 1 })
incrementCountV2 = _ => this.setState(prevState => ({ count: prevState.count + 1 }))
```

##### `useContext`

```
// provider
export const ExampleContext = React.createContext({})
export const ExampleContextProvider = ({ children }) => {
  const exampleValue = { name: 'Foobar' }
  return (
    <ExampleContext.Provider value={exampleValue}>
      { children }
    </ExampleContext.Provider>
  )
}

// functional consumer hook
const { name } = useContext(ExampleContext)
console.log(name) // name === 'Foobar'

// class consumer (not bad, but you can only have one contextType so this won't work with multuiple context)
static contextType = ExampleContext.Consumer

console.log(this.context.name)

// render props (yuck)
<ExampleContext.Consumer>
  {({ context }) => <div>{context.name}</div>}
</ExampleContextConsumer>
```

##### `useEffect`

```
// functional hook
const [users, setUsers] = useState([])
const fetchUsers = async _ => {
  const { data } = await axios.get('/users')
  setUsers(data.users)
}
useEffect(_ => {
  fetchUsers()
}, []) // passing an empty array to useEffect's dependencies means it will only run on mount


// class component
state = { users = [] }
componentDidMount() {
  this.fetchUsers()
}
fetchUsers = async _ => {
  const { data } = await axios.get('/users')
  this.setState({ users: data.users })
}
```

(Something to note, that previous example is not actually the correct way to do a functional componentDidMount, but its the simplest way. If anyone wants to see the proper way, please feel free to reach out after the breakout and I'll show you)
