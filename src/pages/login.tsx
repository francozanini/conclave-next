import Image from 'next/image';

import Button from '../components/core/Button';

const LoginPage = () => {
  return (
    <main>
      <div className="mt-40 justify-items-center items-center flex flex-col ">
        <h1 className="text-8xl">Conclave</h1>
        <div className="mt-4">
          <Button className="flex" color="blue">
            <Image
              alt="Discord logo"
              className="mr-2"
              height="24"
              src="/assets/svg/discord-mark-white.svg"
              width="24"
            />
            Continue with Discord
          </Button>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
