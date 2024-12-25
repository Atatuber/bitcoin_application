export default function LoginForm() {
  return (
    <form className="space-y-4 md:space-y-6" action="#">
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          E-mail
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="bg-gray-50 border text-gray-900 focus:outline focus:outline-indigo-300 rounded-lg block w-full p-2.5"
          placeholder="mijnemail@voorbeeld.nl"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Wachtwoord
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
          className="bg-gray-50 border text-gray-900 focus:outline focus:outline-indigo-300  rounded-lg block w-full p-2.5"
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="remember"
              aria-describedby="remember"
              type="checkbox"
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-indigo-300"
              required=""
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="remember" className="text-gray-500">
              Herriner mij
            </label>
          </div>
        </div>
        <a
          href="#"
          className="text-sm font-medium text-indigo-600 hover:underline"
        >
          Wachtwoord vergeten?
        </a>
      </div>
      <button
        type="submit"
        className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        Inloggen
      </button>
      <p className="text-sm font-light text-gray-500">
        Nog geen account?{" "}
        <a href="#" className="font-medium text-indigo-600 hover:underline">
          Account maken
        </a>
      </p>
    </form>
  );
}
