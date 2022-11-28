import { signIn } from "next-auth/react";
import Image from "next/image";

const Login = ({providers}) => {
  return (
    <div className="flex flex-col items-center space-y-20 pt-48">
      <Image
         src='https://i.imgur.com/6jy6tPw.png'
         width={150}
         height={150}
         color='white'
      />
      <div>
        {Object.values(providers).map((provider) => {
          return (
            <div key={provider.name}>
              <button
                className="relative inline-flex items-center justify-start
                  px-6 py-3 overflow-hidden font-medium transition-all bg-white
                  rounded hover:bg-white group"
                onClick={() => signIn(provider.id, {callbackUrl: '/'})}
              >
                <span
                  className="w-48 h-48 rounded rotate-[-40deg] bg-[#1d9bf0]
                    absolute bottom-0 left-0 -translate-flex-full ease-out
                    duration-500 transition-all translate-y-full mb-9 ml-9
                    group-hover:ml-0 group-hover:mb-32"
                >
                </span>
                <span
                  className="relative w-full text-left text-black
                    transition-colors duration-300 ease-in-out
                    group-hover:text-white"
                >
                  Sign In with {provider.name}
                </span>
              </button>
            </div>
          )
        })}
      </div>
    </div>

  )
}

export default Login;