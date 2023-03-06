import { wrapper } from "../../store/store";
import { AppProps } from "next/app";

const WrappedApp = ({Component, pageProps}: AppProps) => (
    <Component {...pageProps} />
)

export default wrapper.withRedux(WrappedApp);