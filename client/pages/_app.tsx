import { wrapper } from "@/store";
import { AppProps } from "next/app";
import { Provider } from "react-redux";

const WrappedApp = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <Component {...props.pageProps} />
    </Provider>
  );
};

export default wrapper.withRedux(WrappedApp);
