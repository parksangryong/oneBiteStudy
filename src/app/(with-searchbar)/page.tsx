import ServerComponent from "./server-component";
import ClientComponent from "./client-component";

export default function Home() {
  console.log("Home page");

  return (
    <>
      <h1>인덱스 페이지</h1>
      <ClientComponent>
        <ServerComponent />
      </ClientComponent>
    </>
  );
}
