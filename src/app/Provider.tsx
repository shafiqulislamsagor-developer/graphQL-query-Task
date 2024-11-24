"use client";

import { ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

export default function Providers({ children }: { children: React.ReactNode }) {
  // const client = makeClient();

  return (
    <Provider store={store}>
      {/* <ApolloProvider client={client}></ApolloProvider> */}
      {children}
    </Provider>
  );
}
