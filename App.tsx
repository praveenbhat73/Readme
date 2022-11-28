import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
//stepzen api creates gaphql inorder to fetch from google books api and open book api mananges both 
// Apollo Client is a comprehensive state management library for JavaScript that enables you to manage
//  both local and remote data with GraphQL. Use it to fetch, cache, and modify application data, all while automatically updating your UI.
//setup apollo client 1st is to initialize the client
const API_KEY= "genhe::stepzen.net+1000::8f4838d2dc3f8815174788c87abe92a8f890217f9a6872a8bbc310036395ae2a";
const client = new ApolloClient({
  uri: "https://genhe.stepzen.net/api/exacerbated-wallaby/__graphql",
  headers:{
    Authorization:`Apikey ${API_KEY}`
  },
  cache: new InMemoryCache(),
 
});


export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ApolloProvider client={client}>
        <Navigation colorScheme={colorScheme} />
        </ApolloProvider>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
