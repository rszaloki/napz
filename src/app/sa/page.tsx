import { greeting } from "@/actions/example";

const ServerActions = () => {
  let result = {};

  async function action() {
    "use server";
    result = await greeting();
    return result;
  }

  return (
    <>
      <h1>Hello Server action </h1>
      <form action={action}>
        <button type="submit">Greeting</button>
      </form>
      <pre>{JSON.stringify(result)}</pre>
    </>
  );
};

export default ServerActions;
