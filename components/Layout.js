import Head from "next/head";
import Header from './Header';
//import BootstrapClient from './Bootstrapclient';

export default function Layout({children}){
  return (
    <div>
      <Header></Header>
      {children}
    </div>  
  )
}
