import Button from '../components/core/Button';

const LoginPage = () => {
  return (
    <main>
      <div className="mt-40 justify-items-center items-center flex flex-col ">
        <h1 className="text-8xl">Conclave</h1>
        <div className="mt-4">
          <Button color="blue">Continue with Discord</Button>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
